<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">视频详情</block>
		</cu-custom>
		<view class="class-detail">
			<view>
				<view class="uni-padding-wrap uni-common-mt">
					<view>
						<video id="myVideo" style="width: 100%;" src="https://uvd.yupoo.com/1080p/pugbabu/21654469.mp4"
							@error="videoErrorCallback"  controls></video>
					</view>
				</view>
			</view>
			<view class="class-desc">
				<view class="class-title">课程简介</view>
				<view class="class-text">
					{{desc}}
				</view>
			</view>
			<view class="class-collect">
				<view class="class-title">选集</view>
				<view>
					<scroll-view class="scroll-view_H" scroll-x="true" >
						<view class="scroll-view-item_H" v-for="(item, index) in videos" :key="index">
							<image :src="item.image"></image>
							<view>{{item.name}}</view>
						</view>
					</scroll-view>
				</view>
				
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				desc: `转辙机是道岔控制系统的执行机构，用于转换锁闭道岔尖轨或心轨，表示监督联锁区内道岔,
				尖轨或心轨的位置和状态。外锁闭转辙机依靠转辙机之外的锁闭装置直接锁闭密贴尖轨和基本轨，不仅锁
				闭可靠程度较高，而且列车过岔时对转辙机冲击小，有利于减少转辙机故障`,
				videos: [
					{
						image: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
						name: '第一课：转辙机简介'
					},
					{
						image: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
						name: '第二课：转辙机工作原理'
					},
					{
						image: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
						name: '第三课：转辙机的安装'
					}
				],
				
			}
		}
	}
</script>

<style>
	page{
		background: #fff;
		
	}
	.class-detail{
		padding-bottom: 40rpx;
	}
	.class-desc{
		padding: 40rpx;
	}
	.class-title{
		font-size: 18px;
		font-weight: 500;
		font-family: GBK Regular;
		line-height: 30px;
	}
	.class-text{
		font-size: 14px;
		font-family: GBK Regular;
		line-height: 26px;
		color: #666;
	}
	.class-collect{
		padding: 0 40rpx;
	}
	.scroll-view_H {
		width: 100%;
		white-space: nowrap;
		margin-top: 16rpx;
	}
	.scroll-view-item_H{
		width: 300rpx;
		display: inline-block;
		margin-right: 40rpx;
	}
	.scroll-view-item_H image{
		width: 100%;
		height: 200rpx;
		border-radius: 6rpx;
	}
</style>
