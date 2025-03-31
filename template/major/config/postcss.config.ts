// import { uniPostcssPlugin } from '@dcloudio/uni-cli-shared';
import postcssImport from 'postcss-import';
import postcssClassRename from 'postcss-class-rename';
import tailwindcss from 'tailwindcss';
import cssByebye from 'css-byebye';
import autoprefixer from 'autoprefixer';
import path from 'path';

const uniInputDir: string = process.env.UNI_INPUT_DIR as string;

export default {
  plugins: [
    tailwindcss(),
    postcssImport({
      resolve(id) {
        if (id.startsWith('~@/')) {
          return path.resolve(uniInputDir, id.substr(3));
        } else if (id.startsWith('@/')) {
          return path.resolve(uniInputDir, id.substr(2));
        } else if (id.startsWith('/') && !id.startsWith('//')) {
          return path.resolve(uniInputDir, id.substr(1));
        }
        return id;
      }
    }),
    // 根据平台差异进行不同的样式处理
    ...(process.env.VITE_UNI_PLATFORM !== 'h5'
      ? [
          cssByebye({
            rulesToRemove: [/\*/],
            map: false
          }),
          // 使用postcss-class-name 包将小程序不支持的类名转换为支持的类名
          postcssClassRename({
            '\\\\:': '--',
            '\\\\/': '--',
            '\\\\.': '--',
            // '.:': '--',
            '\\*': '--'
          })
        ]
      : []),
    // 此插件引入会导致rpx样式生成失败
    // uniPostcssPlugin(),
    autoprefixer({
      remove: true
    })
  ]
};
