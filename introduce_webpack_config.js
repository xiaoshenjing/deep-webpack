const path = require('path')

module.exports = {
    // 入口配置
    entry: './app/entry', // 单入口,单文件
    entry: ['./app/entry1', './app/entry2'], // 单入口,多文件
    entry: { // 多入口,多文件（每个入口生成一个 Chunk）
        a: './app/entry1',
        b: ['./app/entry1', './app/entry2']
    },

    // 出口配置
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出文件存放位置,必须为绝对路径
        // 输出文件名称
        // [id]：Chunk 从 0 开始的唯一标识
        // [name]：Chunk 的名称
        // [hash]：Chunk 的唯一标识 Hash 值
        // [chunkhash]：Chunk 内容的 Hash 值
        // 其中 hash 和 chunkhash 长度可以指定,例如 [hash:8]
        filename: 'bundle.js', // 完整名称
        filename: '[name].js', // 在配置了多个 entry 时,通过名称模板为不同的 entry 生成不同的文件名称
        filename: '[chunkhash].js', // 根据文件内容的 Hash 值生成文件的名称,用于浏览器长时间缓存文件
        // 发布到线上的所有资源的 URL 前缀
        publicPath: '/assets/',  // 放到指定目录下
        publicPath: '', // 放到根目录下
        publicPath: 'https://cdn.example.com', // 放到 CDN 上
        // 附加 chunk 的文件名称,配置无入口的 Chunk 在输出时的文件名称,和 filename 一样的内置变量
        // 常见场景有使用 CommonChunkPlugin、使用 import('path/to/module') 动态加载等
        chunkFilename: '[id].js',
        chunkFilename: '[chunkhash].js',
        // 导出库的名称,默认输出格式是匿名立即执行函数
        library: 'MyLibrary',
        // 导出库的类型,为枚举类型,默认是 var
        // 可以是 umd/umd2/commonjs2/commonjs/amd/this/var/assign/window/global/jsonp
        libraryTarget: 'umd',
        // 是否包含有用的文件路径信息到生成的代码里,boolean 类型
        pathinfo: true,
        // 生成的 Source Map 文件的名称
        sourceMapFilename: '[file].map',
        // 浏览器开发者工具里显示的源码模块名称
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',
        // 异步加载跨越的资源时使用的方式,用于 JSONP 异步插入标签的 crossorigin 值
        crossOriginLoading: 'use-credentials',
        crossOriginLoading: 'anonymous',
        crossOriginLoading: false,
        // JSONP 异步加载资源时的回调函数名称,需要和服务端搭配使用
        jsonpFunction: 'myWebpackJsonp',
    },

    // 模块配置
    module: {
        rules: [ // 配置 Loader
            {
                test: /\.jsx?$/, // 正则匹配命中要使用 Loader 的文件
                test: [/\.jsx?$/, /\.tsx?$/], // 也可以使用数组命中多个
                include: [ // 只会命中这里面的文件
                    path.resolve(__dirname, 'app')
                ],
                exclude: [ // 忽略这里面的文件
                    path.resolve(__dirname, 'app/demo-files')
                ],
                use: [ // 使用哪些 Loader,有先后次序,默认从后向前执行
                    'style-loader', // 直接使用 Loader 的名称
                    {
                        loader: 'babel-loader',
                        options: { // 向 babel-loader 传一些参数
                            // cacheDirectory 用来缓存编译结果,加快重编译速度
                            cacheDirectory: true
                        },
                        // post 指将该 loader 的执行顺序放在最后面,pre 则是放在最前面
                        enforce: 'post'
                    },
                    'css-loader?minimize', // 启用 css-loader 压缩
                ],
                parser: { // 精确到语法层面控制是否解析
                    amd: false, // 禁用 amd
                    commonjs: false, // 禁用 commonjs
                    system: false, // 禁用 systemjs
                    harmony: false, // 禁用 ES6 import/export
                    requireInclude: false, // 禁用 require.include
                    requireEnsure: false, // 禁用 require.ensure
                    requireContext: false, // 禁用 require.context
                    browserify: false, // 禁用 browserify
                    requireJs: false // 禁用 requireJs
                }
            }
        ],
        noParse: [ // 不用解析和处理的模块
            /special-library\.js$/, /jquery|chartjs/ // 用正则匹配
        ],
    },

    // 配置寻找模块的规则
    resolve: {
        modules: [ // 寻找模块的根目录,默认以 node_modules 为目录
            'node_modules',
            // 配置以下,可以简单通过 import 'button' 导入模块
            path.resolve(__dirname, 'src/components')
        ],
        extensions: ['.js', '.json', '.jsx', '.css'], // 模块的后缀名
        alias: { // 模块别名配置,用于映射模块
            '@': 'src', // @ 映射为 src,同样 @/... 也会被映射为 src/.../...
            'only$': 'src', // only 映射为 src,但是 only/... 不会被映射为 src/.../...
            // 即只会将 import 'only' 替换为 import 'src',而 import 'only/fun' 无能为力
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
        mainFields: ['jsnext:main', 'browser', 'main'], // 假如想优先采用 ES6
        enforceExtension: false, // 是否强制导入语句写明文件后缀
    },

    // 配置插件
    plugins: [],

    // DevServer 相关配置（）
    devServer: {
        hot: true, // 热更新,将在不刷新页面的情况下替换新老模块做到实时预览
        host: 'example.com', // 配置访问域名
        port: 3000, // 配置访问端口号
        open: true, // 启动打开浏览器
        historyApiFallback: true, // 是否开发 HTML5 History Api 的单页应用,在命中路由后都会返回 index.html
        historyApiFallback: { // 多页应用配置
            rewrites: [
                { from: /^\/user/, to: '/user.html' }, // /user 开头的都返回 user.html
                { from: /^\/game/, to: '/game.html' },
                { from: /./, to: '/index.html' } // 其他的都返回 index.html
            ]
        },
        // 配置 DevServer HTTP 服务器的文件根目录,默认为当前根目录,一般没必要设置它,或者可以设置 false 关闭暴露本地文件
        // 除非有其他文件需要被 DevServer 服务,例如将 根目录下的 public 目录设置为 DevServer 服务器的文件根目录
        contentBase: path.join(__dirname, 'public'),
        headers: { // 注入 http 的响应头
            'X-foo': 'bar'
        },
        disableHostCheck: true, // 是否检查域名
        https: false, // 是否开启 HTTPS 模式
        proxy: { // 代理到后端服务接口
            '/api': {
                target: 'http://example.com',
                secure: false, // 是否仅用 https
                changeOrigin: true, // 改变源
                pathRewrite: { '^/api': '' }, // 路径重写
            },
        }
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

    devtool: 'sorce-map', // 配置 source-map 类型
    context: path.resolve(__dirname), // Webpack 使用的根目录,string 类型必须是绝对路径（默认当前路径）
    profile: true, // 是否捕捉 Webpack 构建的性能信息,用于分析是什么原因导致的构建性能不佳
    cache: false, // 是否启用缓存来提升构建速度

    // 监听文件变化
    watch: true, // 是否开启
    watchOptions: { // 监听模式选项,watch 要求为 true
        ignored: /node_modules/, // 不监听的文件或文件夹,支持正则匹配,默认为空
        aggregateTimeout: 300, // 监听到变化,300ms后再变化,防止文件更新太快（防抖）
        poll: 1000 // 每秒询问 1000 次
    },

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