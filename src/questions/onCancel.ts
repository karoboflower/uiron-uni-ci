import { bold, red } from 'kolorist';
export const cancelMesssage = `${red('✖︎')} ${bold('操作已取消')}`;

export function onCancel() {
  throw new Error(cancelMesssage);
}
