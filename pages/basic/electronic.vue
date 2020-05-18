<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">电子报班</block>
		</cu-custom>
		<easy-skeleton SkelttionType="prouct" v-show="hasSkelettion"></easy-skeleton>
		<view class="electronic"  v-show="!hasSkelettion">
			<view class="electronic-head"></view>
			<view class="electronic-content">
				<form>
					<view class="electronic-item">
						<view class="electronic-item-label">
							<image src="../../static/center-active.png"></image>
							<text>值班员</text>
						</view>
						<view class="electronic-item-text">张三12334578</view>
					</view>
					<view class="electronic-item">
						<view class="electronic-item-label">
							<image src="../../static/baoban/leixing.png"></image>
							<text>值班类型</text>
						</view>
						<view class="electronic-item-text">白班</view>
					</view>
					<view class="electronic-item">
						<view class="electronic-item-label">
							<image src="../../static/baoban/shijian.png"></image>
							<text>值班时间</text>
						</view>
						<view class="electronic-item-text">2019-09-20 09:00-17:30</view>
					</view>
					<view class="electronic-item">
						<view class="electronic-item-label">
							<image src="../../static/shift/chezhan.png"></image>
							<text>值班车站</text>
						</view>
						<view class="electronic-item-text">1号线 滨康路地铁站</view>
					</view>
					<view class="electronic-item">
						<view class="electronic-item-label">
							<image src="../../static/baoban/lianxi.png"></image>
							<text>联系方式</text>
						</view>
						<view class="electronic-item-text">13346538734</view>
					</view>
				</form>
				<view class="submit-btn" @tap="submit">提交</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				hasSkelettion: true
			}
		},
		onReady() {
			setTimeout(() => {
				this.hasSkelettion = false
			}, 500)
		},
		methods: {
			submit() {
				uni.showLoading({
					title: '报班中'
				});
				setTimeout(function() {
					uni.hideLoading();
					uni.navigateTo({
						url: '/pages/home/index',
						animationType: 'pop-in',
						animationDuration: 300
					});
				}, 2000);
			}
		}
	}
</script>

<style>
	.electronic {
		position: relative;
	}

	.electronic-head {
		background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
		height: 200rpx;
		width: 100%;
	}

	.electronic-content {
		width: 660rpx;
		position: absolute;
		top: 30px;
		left: 50%;
		transform: translateX(-50%);
		height: 500px;
		border-radius: 10px;
		background: #fff;
		border: 4px solid rgba(200, 208, 200, 0.4);
		box-sizing: border-box;
		padding: 20px 10px;
	}

	.electronic-item {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #eee;
		padding-bottom: 15px;
		margin-bottom: 20px;
	}

	.electronic-item-label {
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #999;
		font-family: GBK Regular;
	}

	.electronic-item-label image {
		width: 16px;
		height: 16px;
		margin-right: 10px;
	}

	.electronic-item-text {
		font-size: 14px;
		color: #333;
		font-family: GBK Regular;
	}

	.submit-btn {
		position: absolute;
		left: 50%;
		bottom: -20px;
		transform: translateX(-50%);
		width: 500rpx;
		height: 40px;
		border-radius: 40rpx;
		color: #fff;
		background: #5886fc;
		border-radius: 20px;
		font-size: 16px;
		font-family: GBK Regular;
		line-height: 40px;
		text-align: center;
	}
</style>
