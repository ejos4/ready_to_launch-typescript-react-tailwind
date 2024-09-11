const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: {
        main: {
            import: "./src/index.tsx",
            dependOn: "shared"
        },
        shared: ["react", "react-dom"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all"
        }
    },
    module: {
        rules: [
            {
                test: /.*tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /.css$/,
                include: path.resolve(__dirname, './src'),
                use: ["style-loader", "css-loader", "postcss-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    }
}