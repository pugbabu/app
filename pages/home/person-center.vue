<template>
	<view>
		<!-- <cu-custom bgColor="bg-white" >
			<block slot="content">个人中心</block>
		</cu-custom> -->
		<cu-custom bgColor="bg-gradual-blue" >
			<block slot="content">个人中心</block>
		</cu-custom>
		<view class="mine">
			<view class="mine-head">
				<image class="avatar"  src="https://shopnc-oss.oss-cn-hangzhou.aliyuncs.com/platform/87e1b00d-69d7-47e4-89d9-8130dd238e9f.jpeg"></image>
				<view class="mine-nickname">小众</view>
				<view class="mine-number">101234</view>
			</view>
			<view class="mine-content">
				<view class="mine-item">
					<image src="../../static/my/banci.png"></image>
					<view class="mine-text">我的班表</view>
				</view>
				<view class="mine-item">
					<image src="../../static/my/zhongxin.png"></image>
					<view class="mine-text">我的检修任务</view>
				</view>
			<!-- 	<view class="mine-item">
					<image src="../../static/my/xinxi.png"></image>
					<view class="mine-text">个人信息</view>
				</view> -->
				<view class="mine-item">
					<image src="../../static/my/guanzhu.png"></image>
					<view class="mine-text">我的关注</view>
				</view>
				<view class="mine-item">
					<image src="../../static/my/mima.png"></image>
					<view class="mine-text">修改密码</view>
				</view>
				<view class="mine-item" @tap="showVersion">
					<image src="../../static/my/banben.png"></image>
					<view class="mine-text">版本信息</view>
				</view>
			</view>
			<!-- <view class="quit-btn" @tap="toLogin">注销</view> -->
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toLogin() {
				uni.showModal({
					// title: 'sdf',
					content: '确定要注销登录吗？',
					cancelColor: '#666666',
					confirmColor: '#5886fc',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '../login/login'
							})
						}
					}
				})
			},
			showVersion() {
				let version = ''
				uni.getStorage({
					key: 'widgetInfo',
					success: function(res) {
						console.log(res)
						version = res.data.version
						uni.showModal({
						    title: '',
						    content: `当前版本是${version}`,
							showCancel: false,
						    success: function (res) {
						        if (res.confirm) {
						            console.log('用户点击确定');
						        }
						    }
						});
						
					}
				})
		
			}
		}
	}
</script>

<style>
	.mine{
		padding-top: 40upx;
	}
	.mine-head{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: GBK Regular;
	}
	.avatar{
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
	}
		
	.mine-nickname{
		font-size: 16px;
		line-height: 30px;
		font-weight: 500;
		margin-top: 10px;
		
	}
	.mine-number{
		font-size: 14px;
		line-height: 20px;
	}
	.mine-content{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding-top: 50px;
	}
	.mine-item{
		width: 70%;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
		padding-bottom: 10px;
		margin-bottom: 20px;
	}
	.mine-item image{
		width: 14px;
		height: 14px;
	}
	.mine-text{
		font-size: 14px;
		font-family: GBK Regular;
		line-height: 20px;
		margin-left: 15px;
	}
	.quit-btn{
		position: fixed;
		bottom: 50px;
		width: 600rpx;
		line-height: 40px;
		height: 40px;
		text-align: center;
		font-size: 16px;
		border: 1px solid #5886fc;
		color: #5886fc;
		border-radius: 20px;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
