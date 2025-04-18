import { relative } from 'node:path';
import { bold, green } from 'kolorist';
import type { Ora } from '@/utils';
import { getCommand } from './getCommand';

export function printFinish(root: string, cwd: string, packageManager: 'pnpm' | 'npm' | 'yarn', loading: Ora) {
  loading.succeed(`${bold('模板创建完成！')}`);
  console.log();
  if (root !== cwd) {
    const cdProjectName = relative(cwd, root);
    console.log(`  ${bold(green(`cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`))}`);
  }
  console.log(`  ${bold(green(getCommand(packageManager, 'install')))}`);
  console.log(`  ${bold(green(getCommand(packageManager, 'dev')))}`);
  console.log();
}
