<template>
	<view class="login-wrapper">
		<view class="login-head">
			<!-- <image src="http://www.unittec.com/images/logo.png"></image> -->
			<image class="logo" src="../../static/login/hz-ditie.png"></image>
			<!-- <view>众合智相伴，运维无难事</view> -->
		</view>
		<form class="login-form">
		                
			<view class="form-item">
				<image src="../../static/login/user.png" class="icon"></image>
				<input v-if="!errorFlag" @blur="handleBlur" v-model="username" class="form-item-input" type="text" placeholderClass="input-placeholder" maxlength="20" placeholder="请输入用户名" name="username" />
				<input v-else @blur="handleBlur" v-model="username" class="form-item-input" type="text" placeholderClass="error-placeholder" maxlength="20" placeholder="请输入用户名" name="username" />
			</view>
			<view class="form-item">
				<image src="../../static/login/password.png" class="icon"></image>
				<input v-if="!pwdErrorFlag" @blur="handlePwdBlur"  v-model="password" type="password" class="form-item-input" name="password" placeholder-class="input-placeholder" placeholder="请输入密码" />
				<input v-else="pwdErrorFlag" @blur="handlePwdBlur"  v-model="password" type="password" class="form-item-input" name="password" placeholder-class="error-placeholder" placeholder="请输入密码" />
			</view>
		<!-- 	<view class="form-item">
				<text class="tip">登录即同意《众合科技协议》《隐私保护指引》</text>
			</view> -->
			<view class="login-item">
				<button @tap="login" class="login-button">登录</button>
				<!-- <button @tap="register" class="login-button" type="default">注册</button> -->
			</view>
			<view class="connot-tip">无法登录？联系我们 0571-8888888</view>
		</form>
		<image class="logo-bottom" src="../../static/login/logo.png"></image>
		<!-- <view class="statement">众合科技股份有限公司、浙江大学及宁波市轨道交通集团有限公司联合研制</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				errorFlag: false,
				pwdErrorFlag: false
			}
		},
		methods: {
			login() {
				let that = this
				if (!this.username) {
					uni.showToast({
					    title: '用户名不能为空',
					    duration: 1000,
						icon: 'none'
					});
					return
				}
				if (!this.password) {
					uni.showToast({
					    title: '密码不能为空',
					    duration: 1000,
						icon: 'none'
					});
					return
				}
				uni.request({
					url: 'http://192.168.196.254:3000/user/login',
					method: 'POST',
					data: {
						username: this.username,
						password: this.password
					},
					success(res) {
						console.log(res.data.message)
						let message = res.data.message
						if (!res.data.data) {
							uni.showToast({
								icon: 'none',
								title: message
							})
							return
						} else {
							uni.navigateTo({
								url: '/pages/home/index'
							})
						}
					},
					fail() {
						
					}
				})
				// uni.switchTab({
				// 	url: '/pages/home/home'
				// })
			},
			register() {
				
			},
			handleBlur() {
				console.log((this.username))
				if (!this.username) {
					this.errorFlag = true
				}
			},
			handlePwdBlur() {
				if (!this.password) {
					this.pwdErrorFlag = true
				}
			}
		}
	}
</script>

<style>
.login-wrapper{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	position: relative;
	font-family: GBK Regular;
}
.login-head{
	background: #5886fc;
	width: 100%;
	color: #fff;
	font-size: 16px;
	height: 250px;
	align-items: center;
	border-radius: 0 0 15% 15%;
	text-align: center;
	padding-top: 60upx;
}
.login-wrapper .logo{
	width: 50px;
	height: 50px;
	margin-top: 40rpx;
	/* display: inline-block; */
	/* width: 280rpx;
	height: 56rpx;
	margin-bottom: 20px; */
	
}

.form-item{
	display: flex;
	margin-bottom: 48rpx;
	position: relative;
}
.form-item .title{
	text-align: right;
	width: 180rpx;
	color: #17233d;
}
.form-item-input{
	background: #fff;
	padding-left: 60rpx;
	width: 100%;
	height: 48px;
	border-bottom: 1rpx solid #dbdcdd;
	color: #333;
	caret-color: #5886fc;
	/* line-height: 24px; */
	font-size: 14px;
	font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
}
.login-form{
	width: 660rpx;
	padding: 25px;
	padding-bottom: 60px;
	box-sizing: border-box;
	position: absolute;
	top: 120px;
	left: 50%;
	transform: translateX(-50%);
	background: #fff;
	box-shadow: 0 0 20rpx #999;
	border-radius: 10px;
	
}
.input-placeholder{
	color: #999;
}
.error-placeholder{
	color: #feb831;
}
.login-item{
	position: absolute;
	left: 50%;
	bottom: -20px;
	transform: translateX(-50%);
	width: 500rpx;
	height: 40px;
	border-radius: 40rpx;
}
.login-button{
	width: 100%;
	/* margin: 0 10rpx; */
	color: #fff;
	background: #5886fc;
	height: 40px;
	border-radius: 20px;
	font-size: 16px;
	font-family: GBK Regular;
	line-height: 40px;
	/* font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif; */
}
.tip{
	line-height: 1.5;
	margin: 0 auto;
	margin-top: 20px;
	text-align: center;
	color: #8590a6;
	font-size: 12px;
}
.statement{
	position: fixed;
	line-height: 2;
	color: #333;
	font-size: 12px;
	bottom: 30px;
	width: 80%;
	text-align: center;
	font-family: GBK Regular;
}
.icon{
	height: 32rpx;
	position: absolute;
	width: 32rpx;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
}
.connot-tip{
	font-size: 12px;
	position: absolute;
	bottom: -60px;
	line-height: 20px;
	left: 0;
	right: 0;
	text-align: center;
	color: #333;
	
}
.logo-bottom{
	position: fixed;
	bottom: 30px;
	width: 216px;
	height: 26px;
	
}
</style>
