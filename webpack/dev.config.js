const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { watch } = require('vue');
global.port = '8080'
module.exports = {

    entry: './src/main.js',

    devServer: {
        host: '0.0.0.0',
        onListening: function (server) {
            const port = server.listeningApp.address().port
            global.port = port
        },
        before(app) {
            app.get("/debug", function (req, res) {
                try {
                    let argv = JSON.parse(req.query.argv)
                    console.log(...argv)
                } catch (e) { }
                res.send("[OK]")
            })
        },
        proxy: {
            '/api': {
                target: 'https://api.binance.com', // Your backend server URL
                changeOrigin: true,
                pathRewrite:{ '^/api': '/api' },
                secure: true,
                onProxyReq: (proxyReq, req, res) => {
                    console.log(`Proxying request ${req.method} ${req.url} -> ${proxyReq.path}`);
                },
                onError: (err, req, res) => {
                    console.error(`Error occurred while trying to proxy to: ${req.url}`);
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Something went wrong. And we are reporting a custom error message.');
                },
            },
        },
    },
    // // Enables hot reloading
    // hot: true,
    // // Opens the browser after the server had been started
    // open: true

    
module: {
    rules: [{
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
    },
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    },
    {
        test: /\.css$/,
        use: [
            'vue-style-loader',
            'css-loader'
        ]
    },
    ]
},
plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    
    
],

     
     

devtool: 'source-map'
    
}
