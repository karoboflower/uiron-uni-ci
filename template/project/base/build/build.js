const ci = require('miniprogram-ci');
const path = require('node:path');
const fs = require('node:fs');
const args = process.argv.slice(2);
const version = args[0];
const env = args[1];
const appDirectory = process.cwd();
console.log('args', args);
(async () => {
  try {
    const projectConfigPath = path.resolve(appDirectory, 'dist/build/mp-weixin/project.config.json');
    // 检查文件是否存在
    if (!fs.existsSync(projectConfigPath)) {
      console.error(`File not found: ${projectConfigPath}`);
      process.exit(1); // 退出进程并返回错误码
    }
    const ProjectConfig = require(projectConfigPath);
    const APP_ID = {
      'test': 'todo', // 测试appId
      'pro': 'todo',
      'release': 'todo',
    };
    // 仅上传对应环境的小程序，以防mainfest.json中的appid不一致
    console.log('ProjectConfig', ProjectConfig.appid, env, APP_ID[env]);
    if (ProjectConfig.appid !== APP_ID[env]) {
      return;
    }
    const privateKeyPath = path.resolve(appDirectory, `build/${ProjectConfig.appid}.key`);
    const project = new ci.Project({
      appid: ProjectConfig.appid,
      type: 'miniProgram',
      projectPath: path.resolve(appDirectory, 'dist/build/mp-weixin'),
      privateKeyPath,
      ignores: ['node_modules/**/*'],
    });
    await ci.upload({
      project,
      version,
      desc: version,
      setting: {
        ...ProjectConfig.setting,
      },
      onProgressUpdate: console.log,
    });
    await ci.preview({
      project,
      version,
      desc: version,

      qrcodeFormat: 'image',
      qrcodeOutputDest: '/qrcode.jpg',
      setting: {
        ...ProjectConfig.setting,
      },
      onProgressUpdate: console.log,
    });
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
