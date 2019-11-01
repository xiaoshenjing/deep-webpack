const path = require('path')

module.exports = {
    // 入口配置
    entry: './app/entry', // 单入口,单文件
    entry: ['./app/entry1', './app/entry2'], // 单入口,多文件
    entry: { // 多入口,多文件
        a: './app/entry1',
        b: ['./app/entry1', './app/entry2']
    },

    // 出口配置
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出文件存放位置,必须为绝对路径
        // 输出文件名称
        filename: 'bundle.js', // 完整名称
        filename: '[name].js', // 在配置了多个 entry 时,通过名称模板为不同的 entry 生成不同的文件名称
        filename: '[chunkhash].js', // 根据文件内容的 Hash 值生成文件的名称,用于浏览器长时间缓存文件
        // 发布到线上的所有资源的 URL 前缀
        publicPath: '/assets/',  // 放到指定目录下
        publicPath: '', // 放到根目录下
        publicPath: 'https://cdn.example.com', // 放到 CDN 上
        // 导出库的名称,默认输出格式是匿名立即执行函数
        library: 'MyLibrary',
        // 导出库的类型,为枚举类型,默认是 var
        // 可以是 umd/umd2/commonjs2/commonjs/amd/this/var/assign/window/global/jsonp
        libraryTarget: 'umd',
        // 是否包含有用的文件路径信息到生成的代码里,boolean 类型
        pathinfo: true,
        // 附加 chunk 的文件名称
        chunkFilename: '[id].js',
        chunkFilename: '[chunkhash].js',
        // JSONP 异步加载资源时的回调函数名称,需要和服务端搭配使用
        jsonpFunction: 'myWebpackJsonp',
        // 生成的 Source Map 文件的名称
        sourceMapFilename: '[file].map',
        // 浏览器开发者工具里显示的源码模块名称
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',
        // 异步加载跨越的资源时使用的方式
        crossOriginLoading: 'use-credentials',
        crossOriginLoading: 'anonymous',
        crossOriginLoading: false
    },

    // 模块配置
    module: {
        rules: [ // 配置 Loader
            {
                test: /\.jsx?$/, // 正则匹配命中要使用 Loader 的文件
                include: [ // 只会命中这里面的文件
                    path.resolve(__dirname, 'app')
                ],
                exclude: [ // 忽略这里面的文件
                    path.resolve(__dirname, 'app/demo-files')
                ],
                use: [ // 使用哪些 Loader,有先后次序,从后向前执行
                    'style-loader', // 直接使用 Loader 的名称
                    {
                        loader: 'css-loader',
                        options: {} // 向 loader 传一些参数
                    }
                ]
            }
        ],
        noParse: [ // 不用解析和处理的模块
            /special-library\.js$/ // 用正则匹配
        ],
    },

    // 配置插件
    plugins: [],

    // 配置寻找模块的规则
    resolve: {
        modules: [ // 寻找模块的根目录,默认以 node_modules 为目录
            'node_modules',
            path.resolve(__dirname, 'app')
        ],
        extensions: ['.js', '.json', '.jsx', '.css'], // 模块的后缀名
        alias: { // 模块别名配置,用于映射模块
            '@': 'src', // @ 映射为 src,同样 @/... 也会被映射为 src/...
            'only$': 'src', // only 映射为 src,但是 only/... 不会被映射为 src/...
        },
        alias: [ // alias 还支持使用数组来更详细地进行配置
            {
                name: '@',
                alias: 'src',
                // 是否只映射模块,true 则只有 src 会被映射;false 则 src/... 也会被映射
                onlyModule: true
            }
        ],
        symlinks: true, // 是否跟随文件的软链接去搜寻模块的路径
        descriptionFiles: ['package.json'], // 模块的描述文件
        mainFields: ['main'], // 模块的描述文件里描述入口的文件的字段名
        enforceExtension: false, // 是否强制导入语句写明文件后缀
    },

    // 输出文件的性能检查配置
    performance: {
        hints: 'warning', // 有性能问题时输出警告
        hints: 'error', // 有性能问题时输出错误
        hints: false, // 关闭性能问题
        maxAssetSize: 200000, // 最大文件的大小(单位为 bytes)
        maxEntrypointSize: 400000, // 最大入口文件的大小(单位为 bytes)
        assetFilter: function (assetFilename) { // 过滤要检查的文件
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
        }
    },

    // DevServer 相关配置
    devServer: {
        proxy: { // 代理到后端服务接口

        }
    },

    devtool: 'sorce-map', // 配置 source-map 类型
    context: __dirname, // Webpack 使用的根目录,string 类型必须是绝对路径
    // 配置输出代码的运行环境
    target: 'web', // 浏览器,默认
    target: 'webworker', // WebWorker
    target: 'node', // Node.js,使用 require 语句加载 Chunk 代码
    target: 'async-node', // Node.js,异步加载 Chunk 代码
    target: 'node-webkit', // nw.js
    target: 'electron-main', // electron,主线程
    target: 'electron-renderer', // electron,渲染线程
    // 来自 Javascript 运行环境提供的全局变量
    externals: {
        jquery: 'jQuery'
    },
    // 控制台输出日志控制
    stats: {
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true
    }

}