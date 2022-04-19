const path = require("path");
const HtmlWebPackPlugin = require('html-webpack-plugin');


module.exports = {

// Entry point that indicates where
//  webpack should start the bundling
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
        {
            test: /\.(js|ts)x?$/, // checks for .js, .jsx, .ts, .tsx files
            exclude: /node_modules/,
            use: [
                {
                   loader: "babel-loader", 
                }
            ],
            // options: { presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"] },
        },
        {
            test: /\.(css|scss|sass)$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader'
            ]
        },
        ],
    },
 
    // Options for resolving module requests
    // extensions that are used
    resolve: { extensions: [".js", ".jsx", ".json", ".ts", ".tsx"] },

    // Output point is where webpack should
    // output the bundles and assets
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: './src/index.html',
        }),
      ],
};
