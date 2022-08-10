webpack
npx指令为将模块文件变更成环境变量 用以更改入口路径
注意!!webpack并未配置时,可在npx后直接配置,就会忽略配置文件,已配置后就可直接运行
五个核心:entry,output,loader,plugins,node
开发模式:development,production
图片转base64,体积会增加,但是可以有效减少请求次数
path输出为全部   细分出口为各个配置项
output:   clean:ture将path目录清空,再进行打包
Eslint rules比extend优先级更高
cacheDirectory:true,
    cacheCompression:false,只能放在options下

总结
我们从 4 个角度对 webpack 和代码进行了优化：

提升开发体验
使用 Source Map 让开发或上线时代码报错能有更加准确的错误提示。
提升 webpack 提升打包构建速度
使用 HotModuleReplacement 让开发时只重新编译打包更新变化了的代码，不变的代码使用缓存，从而使更新速度更快。
使用 OneOf 让资源文件一旦被某个 loader 处理了，就不会继续遍历了，打包速度更快。
使用 Include/Exclude 排除或只检测某些文件，处理的文件更少，速度更快。
使用 Cache 对 eslint 和 babel 处理的结果进行缓存，让第二次打包速度更快。
使用 Thead 多进程处理 eslint 和 babel 任务，速度更快。（需要注意的是，进程启动通信都有开销的，要在比较多代码处理时使用才有效果）
减少代码体积
使用 Tree Shaking 剔除了没有使用的多余代码，让代码体积更小。
使用 @babel/plugin-transform-runtime 插件对 babel 进行处理，让辅助代码从中引入，而不是每个文件都生成辅助代码，从而体积更小。
使用 Image Minimizer 对项目中图片进行压缩，体积更小，请求速度更快。（需要注意的是，如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。）
优化代码运行性能
使用 Code Split 对代码进行分割成多个 js 文件，从而使单个文件体积更小，并行加载 js 速度更快。并通过 import 动态导入语法进行按需加载，从而达到需要使用时才加载该资源，不用时不加载资源。
使用 Preload / Prefetch 对代码进行提前加载，等未来需要使用时就能直接使用，从而用户体验更好。
使用 Network Cache 能对输出资源文件进行更好的命名，将来好做缓存，从而用户体验更好。
使用 Core-js 对 js 进行兼容性处理，让我们代码能运行在低版本浏览器。
使用 PWA 能让代码离线也能访问，从而提升用户体验。