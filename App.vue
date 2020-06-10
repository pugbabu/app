<script>
	import Vue from 'vue'
	import {
		mapMutations
	} from 'vuex'
	export default {
		methods: {
			...mapMutations['login']
		},
		onLaunch: function() {
			console.log(this.$storage.getStorage('sessionId'), 'sessionId')
			if (!this.$storage.getStorage('sessionId')) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return
			}
			/**
			 * @description APP更新，热更新和整包更新
			 */
			// #ifdef APP-PLUS  
			console.log(plus.runtime.appid, 'plus.runtime.appid')
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
				console.log(widgetInfo, 'widgetInfo')
				uni.setStorage({
					key: 'widgetInfo',
					data: widgetInfo
				})
				console.log(uni)
				uni.request({
					url: 'http://124.160.91.203:4400/pkg/update',
					data: {
						version: widgetInfo.version,
						name: widgetInfo.name
					},
					success: (result) => {
						console.log(result, 'result')
						var data = result.data.data;
						if (data.update && data.wgtUrl) {
							uni.showModal({
								title: '更新提示',
								content: 'app内容有更新，是否立即更新',
								success: function(res) {
									if (res.confirm) {
										console.log(data.wgtUrl)
										plus.nativeUI.showWaiting("下载wgt文件...");
										plus.downloader.createDownload(data.wgtUrl, {
											filename: "_doc/update/"
										}, function(d, status) {
											if (status == 200) {
												console.log("下载wgt成功：" + d.filename);
												plus.nativeUI.showWaiting("安装wgt文件...");
												plus.runtime.install(d.filename, {}, function() {
													plus.nativeUI.closeWaiting();
													console.log("安装wgt文件成功！");
													plus.nativeUI.alert("应用资源更新完成！", function() {
														plus.runtime.restart();
													});
												}, function(e) {
													plus.nativeUI.closeWaiting();
													console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
													plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
												});
											} else {
												console.log("下载wgt失败！");
												plus.nativeUI.alert("下载wgt失败！");
											}
											plus.nativeUI.closeWaiting();
										}).start();
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});

						} else if (data.update && data.pkgUrl) {
							uni.showModal({
								title: '更新提示',
								content: 'app版本有更新，是否更新',
								success: function(res) {
									if (res.confirm) {
										plus.nativeUI.showWaiting("下载app更新包");
										var dtask = plus.downloader.createDownload(data.pkgUrl, {}, function(d, status) {
											if (status == 200) { // 下载成功  
												var path = d.filename;
												console.log(d.filename);
												plus.runtime.install(path, {}, function() {
													plus.nativeUI.closeWaiting();
													console.log("安装pkg文件成功！");
												}, function(e) {
													plus.nativeUI.closeWaiting();
													console.log("安装pkg文件失败[" + e.code + "]：" + e.message);
													plus.nativeUI.alert("安装app失败[" + e.code + "]：" + e.message);
												});
											} else { //下载失败  
												alert("Download failed: " + status);
											}
										});
										dtask.start()
										// plus.nativeUI.showWaiting("下载app更新包");
										// plus.runtime.openURL(data.pkgUrl);
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						}
					}
				});
			});
			// #endif

			// // #ifdef APP-PLUS  
			// // 页面加载时触发  
			// var pinf = plus.push.getClientInfo();
			// var cid = pinf.clientid; //客户端标识  
			// console.log(cid, 'cid')
			// const _self = this;
			// const _handlePush = function(message) {
			// 	// TODO  
			// 	console.log(message, 'push message')
			// 	let pagePath = JSON.parse(message.payload).pagePath
			// 	uni.navigateTo({
			// 		url: pagePath
			// 	});
			// };
			// plus.push.addEventListener('click', _handlePush);
			// plus.push.addEventListener('receive', _handlePush);
			// // #endif  
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})

			Vue.prototype.ColorList = [{
					title: '嫣红',
					name: 'red',
					color: '#e54d42'
				},
				{
					title: '桔橙',
					name: 'orange',
					color: '#f37b1d'
				},
				{
					title: '明黄',
					name: 'yellow',
					color: '#fbbd08'
				},
				{
					title: '橄榄',
					name: 'olive',
					color: '#8dc63f'
				},
				{
					title: '森绿',
					name: 'green',
					color: '#39b54a'
				},
				{
					title: '天青',
					name: 'cyan',
					color: '#1cbbb4'
				},
				{
					title: '海蓝',
					name: 'blue',
					color: '#0081ff'
				},
				{
					title: '姹紫',
					name: 'purple',
					color: '#6739b6'
				},
				{
					title: '木槿',
					name: 'mauve',
					color: '#9c26b0'
				},
				{
					title: '桃粉',
					name: 'pink',
					color: '#e03997'
				},
				{
					title: '棕褐',
					name: 'brown',
					color: '#a5673f'
				},
				{
					title: '玄灰',
					name: 'grey',
					color: '#8799a3'
				},
				{
					title: '草灰',
					name: 'gray',
					color: '#aaaaaa'
				},
				{
					title: '墨黑',
					name: 'black',
					color: '#333333'
				},
				{
					title: '雅白',
					name: 'white',
					color: '#ffffff'
				},
			]

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}

	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	.text-light {
		font-weight: 300;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}
</style>
