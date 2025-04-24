import postcssClassRename from 'postcss-class-rename';
import tailwindcss from 'tailwindcss';
import cssByebye from 'css-byebye';
import autoprefixer from 'autoprefixer';
export default {
  plugins: [
    tailwindcss(),
    // 根据平台差异进行不同的样式处理
    ...(process.env.VITE_UNI_PLATFORM !== 'h5'
      ? [
          cssByebye({
            rulesToRemove: [/\*/],
            map: false,
          }),
          // 使用postcss-class-name 包将小程序不支持的类名转换为支持的类名
          postcssClassRename({
            '\\\\:': '--',
            '\\\\/': '--',
            '\\\\.': '--',
            // '.:': '--',
            '\\*': '--',
          }),
        ]
      : []),
    // 此插件引入会导致rpx样式生成失败
    // uniPostcssPlugin(),
    autoprefixer({
      remove: true,
    }),
  ],
};
