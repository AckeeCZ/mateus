const path = require('path');

module.exports = {
    presets: [
        '@babel/typescript',
        [
            '@babel/env',
            {
                modules: process.env.BABEL_ENV === 'es' ? false : 'auto',
            },
        ],
        ,
        '@babel/react',
    ],
    plugins: [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        [
            'babel-plugin-transform-imports',
            {
                lodash: {
                    transform: 'lodash/${member}',
                    preventFullImport: true,
                },
                antd: {
                    transform: 'antd/es/${member}',
                    preventFullImport: true,
                },
            },
        ],
        [
            'babel-plugin-custom-import-path-transform',
            {
                transformImportPath: path.resolve(__dirname, 'scripts/transformImportPath.js'),
            },
        ],
    ],
    ignore: ['**/__tests__/', 'src/**/*.d.ts'],
};
