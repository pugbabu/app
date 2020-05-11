<template>
	<view class="tuzhi-wrapper">
		<view class="cu-bar bg-white search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="请输入图纸名称" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="search">搜索</button>
			</view>
		</view>
		<!-- <nav-bar :navs="navs" @tabChange="tabChange"></nav-bar> -->
		<view class="tuzhi-list">
			<scroll-view style="height: calc(100vh - 200rpx);padding:40rpx 0;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			 @scroll="scroll">
				<view class="tuzhi-item" v-for="(item, index) in list" :key="index">
					<view class="tuzhi-title">{{item.title}}</view>
					<image :src="item.image" @tap="toDetail(item.image)"></image>
				</view>
			</scroll-view>
		</view>
		<image v-show="old.scrollTop > 300" @tap="goTop" class="link-top" src="../../static/knowledge/top.png"></image>
		<!-- <view class="tuzhi-list">
			<view class="tuzhi-item" v-for="(item, index) in list" :key="index">
				<view class="tuzhi-title">{{item.title}}</view>
				<image :src="item.image" @tap="toDetail(item.image)"></image>
			</view>
		</view> -->
	</view>
</template>
<script>
	import NavBar from '../nav/nav.vue'
	export default {
		data() {
			return {
				navs: [{
						id: '1',
						name: '信号专业'
					},
					{
						id: '2',
						name: 'AFC专业'
					},
					{
						id: '3',
						name: 'CCTV'
					},
					{
						id: '4',
						name: '门禁系统'
					},
					{
						id: '5',
						name: '综合监控'
					}
				],
				list: [{
						title: '电路平面布置图',
						image: '../../static/dianlu.png'
					},
					{
						title: '灯丝报警电路及配线',
						image: '../../static/dianlu.png'
					},
					{
						title: '电源屏配线图',
						image: '../../static/dianlu.png'
					},
					{
						title: '电源屏配线图',
						image: '../../static/dianlu.png'
					},
					{
						title: '电源屏配线图',
						image: '../../static/dianlu.png'
					}
				],
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		components: {
			NavBar
		},
		methods: {
			tabChange(index) {
				console.log(index)
			},
			toDetail(src) {
				uni.navigateTo({
					url: `/pages/basic/tuzhi-detail?data=${src}`
				})
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			search() {
				uni.showToast({
					icon: 'none',
					title: '暂无图纸'
				})
			}
		}
	}
</script>

<style>
	.tuzhi-wrapper {
		background: #fff;
	}

	.tuzhi-list {
		/* padding: 50rpx 0; */
	}

	.tuzhi-item {
		padding: 0 20rpx;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
	}

	.tuzhi-title {
		font-size: 16px;
		line-height: 30px;
		font-family: GBK Regular;
		font-weight: 500;
		margin-bottom: 20rpx;
	}

	.tuzhi-item image {
		width: 100%;
	}

	.link-top {
		position: fixed;
		right: 40rpx;
		bottom: 140rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		/* background: red; */
	}
</style>
