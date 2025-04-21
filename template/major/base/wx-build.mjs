import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
const APP_ID = {
  development: 'testappid', // todo 替换为自己的appid
  production: 'appid', // todo 替换为自己的appid
  release: 'appid', // todo 替换为自己的appid
};
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(__dirname, 'src/manifest.json');
main();
function main() {
  const { argv } = process;
  const MODE_ENV = argv[argv.length - 2] || 'development'; // 打包/运行
  const DEV_ENV = argv[argv.length - 1] || 'mp-weixin'; //运行环境 阿里/微信
  const ENV = argv[2] || 'development'; // 运行环境
  const data = fs.readFileSync(filePath);
  const link = `uni  ${ENV} -p ${DEV_ENV} --mode ${MODE_ENV}`;
  if (ENV === 'build') {
    let res = data.toString().replaceAll('testappid', APP_ID[MODE_ENV]);
    fs.writeFileSync(filePath, res);
  }
  execSync(link, { stdio: 'inherit', encoding: 'utf-8' });
  if (ENV === 'build') {
    let res = data.toString().replaceAll(APP_ID[MODE_ENV], 'testappid');
    fs.writeFileSync(filePath, res);
  }
}
