// http://eslint.org/docs/user-guide/configuring

module.exports = {
    // 以当前目录为根目录，不再向上查找 .eslintrc.js
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: false,
        node: true,
        es6: true
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
    ],
    "settings": {
        "html/indent": "+4",  // indentation is the <script> indentation plus 4 spaces.
    },
    // add your custom rules here
    'rules': {
        // 缩进为4个空格
        "indent": ["error", 4],
        // 换行用unix格式
        "linebreak-style": ["error", "unix"],
        // 数组对象等的最后一个, 多行时可以包含最后一个","
        "comma-dangle": ["error", "only-multiline"],
        // 重复的变量声明
        "no-redeclare": "off",
        // 关闭语句强制不用分号结尾
        "semi": ["error", "never"],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // 允许使用new Function
        'no-new-func': 0
    },
    globals: {
        describe: true,
        it: true,
    }
}
