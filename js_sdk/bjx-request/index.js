import BjxHttp from './bjxHttp.js'

export default function(data) {
	let bjxHttp  = new BjxHttp(data)
	return bjxHttp.run()
}

//文档 https://ext.dcloud.net.cn/plugin?id=928