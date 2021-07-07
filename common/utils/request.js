import  config from '../config/index.js'
import store from '../../store/index.js'
import Vue from 'vue'
let vm = new Vue()
function Request(options) {
	store.commit('setSkelettion', true)
	options.url = options.url.search(/(http|https)/) > -1 ? options.url : config.requestURL + options.url;
	options.data = options.data || {}
	options.header = options.header || {}
	if (options.method) {
		options.method = options.method.toUpperCase()
	} else {
		options.method = 'GET'
	}
	options.timeout = options.timeout || 30000
	options.dataType = options.dataType || 'json'
	// const token = uni.getStorageSync('token');
	// console.log(token)
	// if (token) {
	// 	options.header.Authorization = 'Bearer ' + token
	// } else {
	// 	uni.navigateTo({
	// 		url: '/pages/login/login'
	// 	})
	// 	return
	// }
	return new Promise((resolve, reject) => {
		uni.request({
			...options,
			success: res => {
				if (res.data.code == 500) {
					uni.showToast({
						icon: 'none',
						title: res.data.msg || '服务器错误'
					})
					setTimeout(() => {
						vm.$storage.removeStorage('sessionId');
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}, 500)
				} else {
					setTimeout(() => {
						store.commit('setSkelettion', false)
						resolve(res.data)
					}, 300)
				}
		

			},
			fail: (error) => {
				console.log(error)
				store.commit('setSkelettion', false)
				reject(error)
			}
		})
	})
}
export default function(options) {
	return Request(options)
}
