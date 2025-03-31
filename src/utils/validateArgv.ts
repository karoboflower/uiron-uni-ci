import process from 'node:process';
import { bold, gray, red } from 'kolorist';
import figures from 'prompts/lib/util/figures.js';
import PLUGINS from './../questions/plugin/choices';
import { UIList } from './../questions/UI/choices';

type ArgvBase = string | null;
type ArgvList = ArgvBase | string[];
function validateUIName(argvUIName: ArgvBase) {
  if (!argvUIName) return null;
  const UIName = UIList.find((item) => item.value === argvUIName)?.value;
  if (!UIName) {
    console.error(`${red(figures.cross)} ${bold(`暂不支持 ${gray(argvUIName)} UI库`)}`);
    process.exit(1);
  }
  return UIName;
}

function validatePlugins(argvPlugins: ArgvList): [] {
  if (!argvPlugins) return [];
  const pluginList = [argvPlugins].flat();
  const missedPluginList = pluginList.filter((item) => !PLUGINS.some((plugin) => plugin.value === item));
  if (missedPluginList.length) {
    console.error(`${red(figures.cross)} ${bold(`暂不支持 ${gray(missedPluginList.join(', '))} 插件`)}`);
    process.exit(1);
  }
  return pluginList as [];
}
export { validatePlugins, validateUIName };
