// 导出一个 Function
const UglifyJsPlugin = require('webpack/lib/optimize/UgligyJsPlugin')
// env：当前运行时 Webpack 专属环境变量，例如启动命令为 webpack --env.production --env.bar=foo
// 则 env 的值为 { "production": "true", "bar": "foo" }
// argv：代表在启动 Webpack 时通过命令行传入的所有参数
// 例如 --config、--env、--devtool，可通过 webpack -h 列出所有 webpack 支持的命令参数
module.exports = function (env = {}, argv) {
    const plugins = []
    const isProduction = env['production']

    if (isProduction) {
        plugins.push(
            // 压缩输出的 Javascript 代码
            new UglifyJsPlugin()
        )
    }

    return {
        plugins,
        // 在生成环境中不输出 Source Map
        devtool: isProduction ? undefined : 'source-map'
    }
}

// 导出一个 Promise
module.exports = function (env = {}, argv) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                // ...
            })
        }, 2000)
    })
}

// 导出一个数组，数组中可以包含每份配置，并且每份配置都会执行一遍构建
// 这种方式比较适合用 Webpack 构建一个要上传到 NPM 仓库的库，因为库中可能需要包含多种模块化的代码，如 CommonJS、UMD
module.exports = [
    // 采用 Object 描述的一份配置
    {
        // ...
    },
    // 采用函数描述的一份配置
    function () {
        return {
            // ...
        }
    },
    // 采用异步函数描述的一份配置
    function () {
        return Promise()
    }
]