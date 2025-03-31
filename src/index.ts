#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import process from 'node:process';
import ejs from 'ejs';
import JSON5 from 'json5';
import { bold, green } from 'kolorist';
import minimist from 'minimist';
import prompts from 'prompts';

import { question } from './questions';
import filePrompt from './questions/file';
import { cancelMesssage, onCancel } from './questions/onCancel';
import {
  canSkipEmptying,
  ora,
  preOrderDirectoryTraverse,
  printFinish,
  renderTemplate,
  replaceProjectName,
} from './utils';

import { postOrderDirectoryTraverse } from './utils/directoryTraverse';
import { validatePlugins, validateUIName } from './utils/validateArgv';
import type { Ora } from './utils';

let loading: Ora;
async function init() {
  const argv = minimist(process.argv.slice(2), {
    alias: {
      templateType: ['t'],
      pluginList: ['p'],
      UIName: ['ui', 'u'],
      needsEslint: ['eslint', 'e'],
    },
    string: ['_'],
  });
  // printBanner()

  const projectName = argv._[0];

  let result: {
    projectName?: string;
    shouldOverwrite?: boolean;
    pluginList?: string[];
    UIName?: string | null;
    needsEslint?: boolean;
    needsI18n?: boolean;
  } = {};

  if (!projectName) {
    try {
      result = await question();
    } catch (cancelled) {
      console.log((<{ message: string }>cancelled).message);
      process.exit(1);
    }
  } else {
    const UIName = validateUIName(argv.UIName);
    console.log('getData pluginList', argv.pluginList);
    const pluginList = validatePlugins(argv.pluginList);
    console.log('getData pluginLists', pluginList);
    const shouldOverwrite = canSkipEmptying(projectName)
      ? true
      : (await prompts(filePrompt(projectName), { onCancel })).shouldOverwrite;

    result = {
      projectName,
      shouldOverwrite,
      pluginList,
      UIName,
      needsEslint: argv['needsEslint'!],
      needsI18n: argv['needsI18n'!],
    };
  }

  loading = ora(`${bold('正在创建模板...')}`).start();
  const cwd = process.cwd();
  const root = join(cwd, result.projectName!);
  const userAgent = process.env.npm_config_user_agent ?? 'pnpm';
  console.log('process.env.npm_config_user_agent', process.env);
  const packageManager = /pnpm/.test(userAgent) ? 'pnpm' : /yarn/.test(userAgent) ? 'yarn' : 'npm';

  function emptyDir(dir: string) {
    if (!existsSync(dir)) return;

    postOrderDirectoryTraverse(
      dir,
      (dir) => rmdirSync(dir),
      (file) => unlinkSync(file),
    );
  }

  if (existsSync(root) && result.shouldOverwrite) emptyDir(root);
  else if (!existsSync(root)) mkdirSync(root);
  const templateRoot = resolve(__dirname, './../template');

  type Callback = (dataStore: Record<string, any>) => void;
  const callbacks: Callback[] = [];
  function render(templateName: string) {
    const templateDir = resolve(templateRoot, templateName);
    renderTemplate(templateDir, root, callbacks);
  }
  render('base');
  const needUI = Boolean(result.UIName);

  // Render Config
  const config = {
    eslint: result.needsEslint,
    en: result.needsI18n,
  };

  for (const [key, needs] of Object.entries(config)) {
    if (needs) render(`config/${key}`);
  }

  // Render Plugins
  result.pluginList?.forEach((plugin) => render(`plugin/${plugin}`));
  // Render ui
  const ui = {
    [result.UIName!]: needUI,
  };

  for (const [key, needs] of Object.entries(ui)) {
    if (needs) render(`ui/${key}`);
  }

  const dataStore: Record<string, any> = {};
  // Process callbacks
  for (const cb of callbacks) await cb(dataStore);
  preOrderDirectoryTraverse(
    root,
    () => {},
    (filepath) => {
      if (filepath.endsWith('.ejs')) {
        const template = readFileSync(filepath, 'utf-8');
        const dest = filepath.replace(/\.ejs$/, '');
        if (dest.includes('vite.config') || dest.includes('vite-plugins')) {
          dataStore[dest] = dataStore[dest]?.map((item: any) => {
            if (item.extraConfig) {
              item.extraConfig = JSON5.stringify(item.extraConfig, null, 2).slice(1, -1).trim();
            }
            return item;
          });
        }
        console.log('getData dataStore[dest]', dest, filepath, dataStore, dataStore[dest]);
        const content = ejs.render(template, { entries: dataStore[dest] });
        const tsDest = dest.replace(/\.js$/, '.ts');
        writeFileSync(tsDest, content);
        unlinkSync(filepath);
      }
    },
  );
  replaceProjectName(root, result.projectName!);

  printFinish(root, cwd, packageManager, loading);
}

init().catch((error) => {
  console.log(cancelMesssage);
  console.log(error.message.includes('操作已取消') ? '' : error);
  console.log(`🚀 遇到问题? 快速反馈：${green('https://github.com/karoboflower/xiaoiron-uni-ci/issues/new')}`);
  process.exit(0);
});
