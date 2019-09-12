module.exports = {
    entry: "./src/main/line.js",
    output: {
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devServer: {
        contentBase: __dirname,
        hot: true,
        filename: "main.js",
        port: 9991
    }
};
