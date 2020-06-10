<template>
	<view class="trouble-detail-page">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">故障详情</block>
		</cu-custom>
		<view class="trouble-detail-content">
			<view class="flex justify-between  margin-top margin-bottom text-grey dashed-bottom padding-bottom">
				<text class="text-bold">故障名称</text>
				<view class="words">电风扇电机</view>
			</view>
			<view class="flex justify-between  margin-top margin-bottom text-grey dashed-bottom padding-bottom">
				<text class="text-bold">登记时间</text>
				<view class="words">2020-05-20</view>
			</view>
			<view class="flex justify-between  margin-top margin-bottom text-grey dashed-bottom padding-bottom">
				<text class="text-bold">故障等级</text>
				<view class="words">一级</view>
			</view>
			<view class="flex justify-between  margin-top margin-bottom text-grey dashed-bottom padding-bottom">
				<text class="text-bold">故障名称</text>
				<view class="words">电风扇电机</view>
			</view>
			<view class="flex justify-between  margin-top margin-bottom text-grey dashed-bottom padding-bottom">
				<text class="text-bold">线路车站</text>
				<view class="words">1号线江陵路地铁站</view>
			</view>
			<view class="flex justify-between  margin-top margin-bottom text-grey dashed-bottom padding-bottom">
				<text class="text-bold">故障设备</text>
				<view class="words">电风扇</view>
			</view>
			<view class="flex justify-between  margin-top margin-bottom text-grey dashed-bottom padding-bottom">
				<text class="text-bold">故障描述</text>
				<view class="words">大师傅打发士大夫士大夫见识到了副驾驶的的撒反对</view>
			</view>
			<view class="margin-top margin-bottom text-grey padding-bottom">
				<view class="text-bold">故障图片信息</view>
				<view class="flex flex-wrap justify-between margin-top">
					<image class="trouble-image margin-bottom" src="../../static/dianlu.png" @click="previewImg"></image>
					<image class="trouble-image " src="../../static/dianlu.png" @click="previewImg"></image>
					<image class="trouble-image " src="../../static/dianlu.png" @click="previewImg"></image>
					<image class="trouble-image" src="../../static/dianlu.png" @click="previewImg"></image>
				</view>
			</view>
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
			previewImg() {
				uni.previewImage({
					current: 0,
					urls: ['../../static/dianlu.png']
				})
			}
		}
	}
</script>

<style scoped>
	.trouble-detail-page{
		background: #fff;
		min-height: 100vh;
	}
	.trouble-detail-content{
		padding: 40upx;
	}
	.words{
		width: 70%;
		text-align: right;
	}
	.trouble-image{
		width: 48%;
		height: 300upx;
	}
</style>
