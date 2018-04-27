var path = require("path");

module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    devServer: {
        stats: {
            assets: false,
            hash: false,
            chunks: false,
            errors: true,
            errorDetails: true,
        },
        overlay: true
    }
};
