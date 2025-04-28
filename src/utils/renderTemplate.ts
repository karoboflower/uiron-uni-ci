import * as fs from 'node:fs';
import * as path from 'node:path';
import { pathToFileURL } from 'node:url';
import { deepMerge } from './deepMerge';
import { sortDependencies } from './sortDependencies';
type Callback = (dataStore: Record<string, any>) => void;
type RecordType = Record<string, any>;
/**
 * Renders a template folder/file to the file system,
 * by recursively copying all files under the `src` directory,
 * @param {string} src source filename to copy
 * @param {string} dest destination filename of the copy operation
 */
export function renderTemplate(src: string, dest: string, callbacks: Callback[]) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    // skip node_module
    if (path.basename(src) === 'node_modules') return;

    // if it's a directory, render its subdirectories and files recursively
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      renderTemplate(path.resolve(src, file), path.resolve(dest, file), callbacks);
    }

    return;
  }

  const filename = path.basename(src);

  if (filename === 'package.json' && fs.existsSync(dest)) {
    // merge instead of overwriting
    const existing = JSON.parse(fs.readFileSync(dest, 'utf8'));
    const newPackage = JSON.parse(fs.readFileSync(src, 'utf8'));
    const pkg = sortDependencies(deepMerge(existing, newPackage));
    fs.writeFileSync(dest, `${JSON.stringify(pkg, null, 2)}\n`);
    return;
  }
  if (
    (filename === 'extensions.json' || filename === 'settings.json' || filename === 'tsconfig.json') &&
    fs.existsSync(dest)
  ) {
    // merge instead of overwriting
    const existing = JSON.parse(fs.readFileSync(dest, 'utf8'));
    const newExtensions = JSON.parse(fs.readFileSync(src, 'utf8'));
    const extensions = deepMerge(existing, newExtensions);
    fs.writeFileSync(dest, `${JSON.stringify(extensions, null, 2)}\n`);
    return;
  }

  if (filename.startsWith('_')) {
    // rename `_file` to `.file`
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'));
  }

  if ((filename === '_gitignore' || filename === '_npmrc') && fs.existsSync(dest)) {
    // append to existing .gitignore
    const existing = fs.readFileSync(dest, 'utf8');
    const newGitignore = fs.readFileSync(src, 'utf8');
    fs.writeFileSync(dest, `${existing}\n${newGitignore}`);
    return;
  }

  // data file for EJS templates
  if (filename.endsWith('.data.mjs')) {
    // use dest path as key for the data store
    dest = dest.replace(/\.data\.mjs$/, '');
    // Add a callback to the array for late usage when template files are being processed
    callbacks.push(async (dataStore: Record<string, any>) => {
      const getData = (await import(pathToFileURL(src).toString())).default;
      // Though current `getData` are all sync, we still retain the possibility of async
      dataStore[dest] = await getData({
        oldData: dataStore[dest] || [],
      });
      // if the data is an array, sort it
    });

    return; // skip copying the data file
  }

  fs.copyFileSync(src, dest);
}
export async function render(templates: RecordType, argv: RecordType, dataStore: RecordType = {}, root: string) {
  const templateRoot = path.resolve(__dirname, './../template');
  const callbacks: Callback[] = [];
  function renderItem(templateName: string) {
    const templateDir = path.resolve(templateRoot, templateName);
    renderTemplate(templateDir, root, callbacks);
  }
  for (const [key, needs] of Object.entries(templates)) {
    if (needs) renderItem(`${key}`);
  }
  // Process callbacks
  for (const cb of callbacks) await cb(dataStore);
}
export const getTemplateBase = (argv: RecordType) => {
  const baseTemplate: RecordType = {
    base: true, // base template
    'config/eslint': argv.needsEslint!, // eslint config
    'config/en': argv.needsI18n!, // i18n config
  };
   // Add plugins to the template
  for (let i = 0; i < argv.pluginList.length; i++) {
    const plugin = argv.pluginList[i];
    baseTemplate[`plugin/${plugin}`] = true;
  }
  if (argv.UIName) {
    baseTemplate[`ui/${argv.UIName}`] = true; // vite plugins config
  }
  // layouts config
  if (argv.pluginList.includes('layouts') && argv.UIName) {
    baseTemplate[`merge/layout-ui-${argv.UIName}`] = true;
  }
  return baseTemplate;
};
export const getTemplateMajor = (argv: RecordType) => {
  const majorTemplate: RecordType = {
  };
  majorTemplate['major/base'] = true;
  if (argv.atomicCss) {
    majorTemplate[`major/config/${argv.atomicCss}`] = true;
  }
  if (argv.themes && argv.themes !== 'null') {
    majorTemplate[`major/config/${argv.themes}`] = true;
  }
  return majorTemplate;
};
export const getTemplateProject = () => {
  const majorTemplate: RecordType = {
    'project/base': true,
  };
  return majorTemplate;
};
