const os = require("os");
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

// cpu核数
const threads = os.cpus().length;
module.exports = {
    entry: './src/main.js',
    output: {
        path: undefined,
        filename: "static/js/main.js",
        clean: true

    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        // 用来匹配 .css 结尾的文件
                        test: /\.css$/,
                        // use 数组里面 Loader 执行顺序是从右到左
                        use: [MiniCssExtractPlugin.loader, "css-loader",
                            {
                                loader: "postcss-loader",
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            "postcss-preset-env", // 能解决大多数样式兼容性问题
                                        ],
                                    },
                                },
                            },],
                    },
                    {
                        test: /\.less$/,
                        use: [MiniCssExtractPlugin.loader, "css-loader",
                            {
                                loader: "postcss-loader",
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            "postcss-preset-env", // 能解决大多数样式兼容性问题
                                        ],
                                    },
                                },
                            },"less-loader"],
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: [MiniCssExtractPlugin.loader, "css-loader",
                            {
                                loader: "postcss-loader",
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            "postcss-preset-env", // 能解决大多数样式兼容性问题
                                        ],
                                    },
                                },
                            },"sass-loader"],
                    },
                    {
                        test: /\.styl$/,
                        use: [MiniCssExtractPlugin.loader, "css-loader",
                            {
                                loader: "postcss-loader",
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            "postcss-preset-env", // 能解决大多数样式兼容性问题
                                        ],
                                    },
                                },
                            },"stylus-loader"],
                    },
                    {
                        test: /\.(ttf|woff2?|map4|map3|avi)$/,
                        type: "asset/resource",

                        generator: {
                            filename: 'static/media/[hash:10][ext][query]'
                        }
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/,
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
                            }
                        },
                        generator: {
                            filename: 'static/images/[hash:10][ext][query]'
                        }
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/, // 排除node_modules代码不编译
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false,
                            plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new ESLintPlugin({
            context: path.resolve((__dirname, '../src')),
            exclude:'node_modules',
            cache: true, // 开启缓存
            // 缓存目录
            cacheLocation: path.resolve(
                __dirname,
                "../node_modules/.cache/.eslintcache"
            ),
            threads,
        }),
        new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "static/css/main.css",
        }),

    ],
    optimization: {
        minimize: true,
        minimizer: [
            // css压缩也可以写到optimization.minimizer里面，效果一样的
            new CssMinimizerPlugin(),
            // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
            new TerserPlugin({
                parallel: threads // 开启多进程
            }),
            // 压缩图片
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminGenerate,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            [
                                "svgo",
                                {
                                    plugins: [
                                        "preset-default",
                                        "prefixIds",
                                        {
                                            name: "sortAttrs",
                                            params: {
                                                xmlnsOrder: "alphabetical",
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
    },
    // 开发服务器
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 是否自动打开浏览器
        hot:true,
    },
    mode: "development",
    devtool: "cheap-module-source-map",
}