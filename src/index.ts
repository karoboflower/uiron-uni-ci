#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import process from "node:process";
import ejs from "ejs";
import { bold, green } from "kolorist";
import minimist from "minimist";
import prompts from "prompts";
import { TemplateTypeEnum } from "./const/enum";
import { question, templateTypeQuestion } from "./questions";
import filePrompt from "./questions/file";
import { cancelMesssage, onCancel } from "./questions/onCancel";
import {
  canSkipEmptying,
  getTemplateBase,
  getTemplateMajor,
  getTemplateProject,
  ora,
  preOrderDirectoryTraverse,
  printBanner,
  printFinish,
  render,
  replaceProjectName,
} from "./utils";

import { postOrderDirectoryTraverse } from "./utils/directoryTraverse";
import { validatePlugins, validateUIName } from "./utils/validateArgv";
import type { Ora } from "./utils";

let loading: Ora;
async function init() {
  const argv = minimist(process.argv.slice(2), {
    alias: {
      templateType: ["t"],
      pluginList: ["p"],
      UIName: ["ui", "u"],
      needsEslint: ["eslint", "e"],
      needsI18n: ["i18n", "en"],
      atomicCss: ["css", "c"],
      themes: ["theme", "th"],
    },
    string: ["_"],
  });

  printBanner();
  const projectName = argv._[0];
  let result: {
    projectName?: string;
    shouldOverwrite?: boolean;
    templateType?: string;
    pluginList?: string[];
    UIName?: string | null;
    needsEslint?: boolean;
    needsI18n?: boolean;
    atomicCss?: string;
    themes?: string;
  } = {};
  if (!projectName) {
    try {
      result = await question();
      const templateType = result.templateType || 'base';
      const templateResult = await templateTypeQuestion(templateType);
      result = { ...result, ...templateResult };
    } catch (cancelled) {
      console.log((<{ message: string }>cancelled).message);
      process.exit(1);
    }
  } else {
    const UIName = validateUIName(argv.UIName);
    const pluginList = validatePlugins(argv.pluginList);
    const shouldOverwrite = canSkipEmptying(projectName)
      ? true
      : (await prompts(filePrompt(projectName), { onCancel })).shouldOverwrite;
    result = {
      projectName,
      shouldOverwrite,
      pluginList,
      UIName,
      templateType: argv.templateType,
      needsEslint: argv["needsEslint"!],
      needsI18n: argv["needsI18n"!],
      atomicCss: argv.atomicCss,
      themes: argv.themes,
    };
  }
  loading = ora(`${bold("正在创建模板...")}`).start();
  const cwd = process.cwd();
  const root = join(process.cwd(), `${result.projectName!}`);
  const userAgent = process.env.npm_config_user_agent ?? "pnpm";
  const packageManager = /pnpm/.test(userAgent)
    ? "pnpm"
    : /yarn/.test(userAgent)
    ? "yarn"
    : "npm";

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
  const dataStore: Record<string, any> = {};
  // render base template
  if (result.templateType === TemplateTypeEnum.base) {
    const templates = getTemplateBase(result);
    await render(templates, result, dataStore, root);
  }
  // render major template
  if (result.templateType === TemplateTypeEnum.major) {
    const majorTemplates = getTemplateMajor(result);
    await render(majorTemplates, result, dataStore, root);
  }
  // render project template
  if (result.templateType === TemplateTypeEnum.project) {
    const majorTemplates = getTemplateMajor(result);
    await render(majorTemplates, result, dataStore, root);
    const projectTemplates = getTemplateProject();
    await render(projectTemplates, result, dataStore, root);
  }
  preOrderDirectoryTraverse(
    root,
    () => {},
    (filepath) => {
      if (filepath.endsWith(".ejs")) {
        const template = readFileSync(filepath, "utf-8");
        const dest = filepath.replace(/\.ejs$/, "");
        // if (dest.includes('vite.config') || dest.includes('vite-plugins')) {
        //   dataStore[dest] = dataStore[dest]?.map((item: any) => {
        //     if (item.extraConfig) {
        //       item.extraConfig = JSON5.stringify(item.extraConfig, null, 2).slice(1, -1).trim();
        //     }
        //     return item;
        //   });
        // }
        let content = "";
        if (dest.includes("vite.config") && result.pluginList?.length) {
          content = ejs.render(template, {
            entries: dataStore[dest] || [],
            isPlugin: true,
          });
        } else {
          content = ejs.render(template, { entries: dataStore[dest] || [] });
        }
        const tsDest = dest.replace(/\.js$/, ".ts");
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
  console.log(error.message.includes("操作已取消") ? "" : error);
  console.log(
    `🚀 遇到问题? 快速反馈：${green(
      "https://github.com/karoboflower/xiaoiron-uni-ci/issues/new",
    )}`,
  );
  process.exit(0);
});
