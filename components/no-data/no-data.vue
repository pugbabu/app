<template>
	<view class="no-data">
		<image class="nodata-image" src="/static/nocontent.png"></image>
		<view class="nodata-text padding text-grey text-center">{{text}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: '暂无数据'
			}
		}
	}
</script>

<style>
	.no-data{
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%, -50%, 0);
		z-index: 100;
	}
	.nodata-image{
		width: 260upx;
		height: 260upx;
		display: block;
		margin: 0 auto;
	}
	.nodata-text{
	}
</style>
