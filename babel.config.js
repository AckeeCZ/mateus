module.exports = {
    presets: ['@babel/typescript', '@babel/env', '@babel/react'],
    plugins: [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        [
            'babel-plugin-transform-imports',
            {
                lodash: {
                    // eslint-disable-next-line
                    transform: 'lodash/${member}',
                    preventFullImport: true,
                },
                antd: {
                    transform: 'antd/lib/${member}',
                    preventFullImport: true,
                },
            },
        ],
    ],
    ignore: ['**/__tests__/', 'src/**/*.d.ts'],
};
