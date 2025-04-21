import pkg from 'minidev';
import fs from 'node:fs';
import path from 'node:path';
const { minidev } = pkg;
const args = process.argv.slice(2);
// 支付宝去掉v
const version = /[a-z]/i.test(args[0]) ? args[0].substring(1) : args[0];
// 环境
const dev = args[1];
const appDirectory = process.cwd();
const projectPath = path.resolve(appDirectory, `dist/build/mp-alipay`);
const identityKeyPath = path.resolve(appDirectory, `build/config.json`);
// 检查文件是否存在
if (!fs.existsSync(projectPath)) {
  console.error(`File not found: ${projectPath}`);
  process.exit(1); // 退出进程并返回错误码
}
let appId = dev === 'test' ? 'todo' : 'todo';
const list = await minidev.app.getList({
  identityKeyPath: path.resolve(appDirectory, `build/config.json`),
});
console.log('list', list);
// 取消当前版本会体验版
await minidev.app.cancelExperience({
  appId,
  version,
  identityKeyPath,
});
// 删除当前版本
await minidev.app.deleteVersion({
  appId,
  version,
});
// 上传版本
await minidev.upload(
  {
    appId,
    identityKeyPath,
    version,
    project: projectPath,
    experience: true,
    // experience: true 添加 experience 选项的话可以一并把刚上传的版本设置为体验版
  },
  {
    onLog: (data) => {
      // 输出日志
      console.log(data);
    },
  },
);
