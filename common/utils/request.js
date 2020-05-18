import { requestURL } from '../config/index.js'

function Request(options) {
	options.url = requestURL + options.url;
	options.data = options.data || {}
	options.header = options.header || {}
	if (options.method) {
		options.method = options.method.toUpperCase()
	} else {
		options.method = 'GET'
	}
	options.timeout = options.timeout || 30000
	options.dataType = options.dataType || 'json'
	const token = uni.getStorageSync('token');
	console.log(token)
	if (token) {
		options.header.Authorization = 'Bearer ' + token
	} else {
		uni.navigateTo({
			url: '/pages/login/login'
		})
		return
	}
	return new Promise((resolve, reject) => {
		uni.request({
			...options,
			success: res => {
				resolve(res)
			},
			fail: (error) => {
				console.log(error)
				reject(error)
			}
		})
	})
}
export default function(options) {
	return Request(options)
}