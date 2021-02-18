module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'airbnb/base',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
 
    rules: {
        'no-unused-vars': 'off',
        indent: ['error', 4],
        'linebreak-style': 0,        
        'no-plusplus': 'off',
        'no-shadow': 'off',
        'semi': 1,
        'no-use-before-define': 'off',
        'no-console': 'off',
        'no-loop-func': 'off',
        'no-undef': 'off'        
    },
};
