//文档 https://ext.dcloud.net.cn/plugin?id=928
export default {
	// 请求地址，可以多个
	baseUrl: {
		default: 'http://62.234.106.5:7080/',
		// wx: '' // 定义其他地址
	},
	// 标识为成功的状态码，其他则作失败处理
	successCode: [200],
	 // 缓存有效时间
	cacheTime: 10,
	// 错误统一处理
	errorHandle: true, 
	// 是否显示 loading
	loading: true,
	// 请求前，设置请求头等
	requestBefore(options){
		// console.log('请求前',options)
		options.header = {
			token: 'token'
		}
		return options
	},
	// 请求后 数据处理 或 统一异常处理
	// 返回三个参数 第一是 后台返回的数据，第二个是请求参数，第三个是图片上传时的下标（非图片上传可以忽略）
	requestAfter(data, options, index){
		// console.log('请求后')
		// 可以在options中自定义参数，然后在此使用
		// 如：想根据条件判断是否执行后续代码，可以在发送请求时，设置参数如 options.notAfter = false
		// if(!options.notAfter) return
		//
		// 一般请求 使用统一的异常处理 成功返回时可根据后台自定义的状态码判断是否弹出提示
		if(options.type == 'request' && data.error_code != 0) {
			uni.showModal({
				title:'提示',
				content: data.msg || '请求失败'
			})
		}
		// 如果对数据进行了统一处理，则需要返回处理后的数据
		// return data
	}
}
