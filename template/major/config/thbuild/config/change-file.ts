import fs from 'node:fs';
import path from 'node:path';
export function changeFile(theme: string, dev: string, system) {
  return {
    name: 'vite-plugin-changeFile',
    writeBundle() {
      // 设置定时器，uni-app里面也有定时器，必须在dist生成之后才执行
      setTimeout(async () => {
        const toPath = `${path.resolve(__dirname, `../dist/${dev}/${system}/static/images`)}`;
        const directPath = `${path.resolve(__dirname, `../src/styles/images-${theme}`)}`;
        if (theme) {
          await fs.cpSync(directPath, toPath, { recursive: true });
        }
      }, 1000);
    },
  };
}
