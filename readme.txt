webpack
npx指令为将模块文件变更成环境变量 用以更改入口路径
注意!!webpack并未配置时,可在npx后直接配置,就会忽略配置文件,已配置后就可直接运行
五个核心:entry,output,loader,plugins,node
开发模式:development,production
图片转base64,体积会增加,但是可以有效减少请求次数
path输出为全部   细分出口为各个配置项
output:   clean:ture将path目录清空,再进行打包
Eslint rules比extend优先级更高