var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'index.tpl.html',
        title: 'my kk',
        filename: 'index.html'
    })]
}
