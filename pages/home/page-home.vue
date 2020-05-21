<template name="basics">
	<view>
		<scroll-view scroll-y class="page">
			<view class="image-wrapper">
				<image src="../../static/ditie.png" class="header-image"></image>
				<view class="message" @tap="toMessage">
					<image src="../../static/message.png"></image>
					<view class="message-num">7</view>
				</view>
			</view>
			<!-- <view class="header"></view> -->
			<view class="nav-list">
				<navigator hover-class="none" animation-type="pop-in" animationDuration="200" :url="'/pages/basic/' + item.url" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
				</navigator>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "basics",
		data() {
			return {
				elements: [{
						title: '综合监测',
						url: 'zonghejiance',
						name: 'multiple monitor',
						color: 'cyan',
						cuIcon: 'newsfill'
					},
					{
						title: '工班检修任务',
						url: 'shift-repair',
						name: 'shift repair',
						color: 'blue',
						cuIcon: 'colorlens'
					},
					{
						title: '电子报班',
						url: 'electronic',
						name: 'electronic',
						color: 'purple',
						cuIcon: 'font'
					},
					{
						title: '故障登记 ',
						url: 'trouble-register',
						name: 'trouble register',
						color: 'mauve',
						cuIcon: 'cuIcon'
					},
					{
						title: '资料库',
						url: 'knowledge',
						name: 'knowledge',
						color: 'brown',
						cuIcon: 'tagfill'
					},
					{
						title: '转辙机',
						url: 'switch-machine',
						name: 'switch machine',
						color: 'pink',
						cuIcon: 'btn'
					},

				],
			};
		},
		onShow() {
			console.log("success")
		},
		methods: {
			toMessage() {
				uni.navigateTo({
					url: '/pages/message/message'
				})
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	.header-image {
		width: 100%;
	}

	.header {
		height: 488upx;
		box-shadow: 0px 0px 0px;
		background: url(../../static/ditie.png) no-repeat center;
		background-size: 100% 100%;

	}
	.image-wrapper{
		position: relative;
	}
	.message{
		position: absolute;
		right: 50upx;
		top: 60upx;
	}
	 .message image{
		width: 48rpx;
		height: 48rpx;
	}
	 .message-num{
		position: absolute;
		right: -14rpx;
		top: -10rpx;
		width: 34rpx;
		height: 34rpx;
		line-height: 34rpx;
		border-radius: 50%;
		background: red;
		color: #fff;
		text-align: center;
	}
</style>
