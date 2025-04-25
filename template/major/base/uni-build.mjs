import { execSync } from 'node:child_process';
import process from 'node:process';
main();
function main() {
  const { argv } = process;
  const MODE_ENV = argv[argv.length - 2] || 'development'; // 打包/运行
  const DEV_ENV = argv[argv.length - 1] || 'mp-weixin'; // 运行环境 阿里/微信
  const ENV = argv[2] || 'development'; // 运行环境
  const link = `uni  ${ENV} -p ${DEV_ENV} --mode ${MODE_ENV}`;
  execSync(link, { stdio: 'inherit', encoding: 'utf-8' });
}
