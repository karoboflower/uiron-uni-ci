import process from 'node:process';
import antfu from '@antfu/eslint-config';

const dev = process.env?.NODE_ENV;
export default antfu({
  ignores: ['dist', 'node_modules', 'uni_modules'],
  vue: false,
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
    semi: true,
  },
  // formatters 配置要和根目录的.prettierrc.js 保持一致
  formatters: {
    prettierOptions: {
      printWidth: 120, // 一行的字符数，如果超过会进行换行，默认为120
      tabWidth: 2, // 一个 tab 代表几个空格数，默认为 2 个
      useTabs: false, // 是否使用 tab 进行缩进，默认为false，表示用空格进行缩减
      singleQuote: true, // 字符串是否使用单引号，默认为 false，使用双引号
      semi: true, // 行尾是否使用分号，默认为true
      trailingComma: 'all', // 是否使用尾逗号
      bracketSpacing: true, // 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }
      endOfLine: 'auto', // 设置换行符  \n
      arrowParens: 'always', // 箭头函数参数只有一个时是否要有小括号
    },
    markdown: true,
  },
  rules: {
    // https://eslint.style/rules/js/brace-style
    'style/brace-style': 'off',
    // https://eslint.style/rules/js/indent
    'style/indent': 'off',
    // https://github.com/antfu/eslint-plugin-antfu/blob/main/src/rules/if-newline.md
    'antfu/if-newline': 'off',
    // 顶级函数是否必须是命名函数
    // https://github.com/antfu/eslint-plugin-antfu/blob/main/src/rules/top-level-function.ts
    'antfu/top-level-function': 'off',
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v57.0.0/docs/rules/prefer-includes.md
    'unicorn/prefer-includes': 'off',
    // https://eslint.style/rules/js/arrow-parens
    'style/arrow-parens': ['error', 'always'], // 保持和prettier一致
    // https://eslint.style/rules/js/operator-linebreak
    'style/operator-linebreak': 'off', // eslint冲突
    // https://eslint.style/rules/js/quotes
    'style/quotes': 'off', // stylistic.quote保持一致 prettier去解决
    // https://eslint.org/docs/latest/rules/prefer-template
    'prefer-template': 'off', // singleQuote prettier冲突 //通过写法去解决
    // https://eslint.style/rules/js/quote-props
    'style/quote-props': 'off', // 暂时不开启 和prettier单引号冲突
    // https://eslint.vuejs.org/rules/quote-props.html
    'vue/quote-props': 'off', // 暂时不开启 和prettier单引号冲突
    // https://eslint.vuejs.org/rules/html-indent.html
    'vue/html-indent': 'off', // 和prettier冲突
    // https://typescript-eslint.io/rules/no-use-before-define/
    'no-use-before-define': 'off', // 校验减少
    'ts/no-use-before-define': 'off', // 校验减少
    'no-console': dev === 'production' ? 'warn' : 'off',
    'no-debugger': dev === 'production' ? 'warn' : 'off',
    // https://perfectionist.dev/rules/sort-imports
    'perfectionist/sort-imports': 'off', // 代码写法控制
    // https://perfectionist.dev/rules/sort-exports
    'perfectionist/sort-exports': 'off', // 代码写法控制
    // https://github.com/un-ts/eslint-plugin-import-x/blob/v4.8.0/docs/rules/no-duplicates.md
    'import-x/no-duplicates': 'off', // 代码写法控制
    // https://github.com/un-ts/eslint-plugin-import-x/blob/v4.8.0/docs/rules/newline-after-import.md
    'import-x/newline-after-import': 'off', // 代码写法控制
    // https://github.com/un-ts/eslint-plugin-import-x/blob/v4.8.0/docs/rules/imports-first.md
    'import-x/first': 'off', // 代码写法控制
    // https://eslint.org/docs/latest/rules/prefer-promise-reject-errors
    'prefer-promise-reject-errors': 'off', // 代码写法控制
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v57.0.0/docs/rules/number-literal-case.md
    'unicorn/number-literal-case': 'off', // prettier默认配置 十六进制数字小写化

    // trailingComma  style/comma-dangle 要保持一直
    // 'style/comma-dangle': 'off',
  },
});
