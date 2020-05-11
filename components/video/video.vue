<template>
	<view>
		
		<view class="video-container">
			<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
			 indicator-active-color="#0081ff">
				<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''" @tap="toVideoDetail">
					<view class="swiper-item">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</view>
				</swiper-item>
			</swiper>
			<view class="video-list">
				<view class="video-item" v-for="(item, index) in videoList" :key="index">
					<view class="video-title">{{item.name}}</view>
					<view class="path-list">
						<view class="path-item" v-for="prop in item.children" :key="prop.id" @tap="toVideoDetail(prop)">
							<image class="path-image" :src="prop.image"></image>
							<view class="path-info">
								<view class="path-top">
									<view class="path-name">{{prop.name}}</view>
									<view class="path-desc">{{prop.desc}}</view>
								</view>
								<view class="path-num">
									<view class="collect-num">{{prop.collectNum}}集课</view>
									<view class="view-num">{{prop.viewNum}}人已观看</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				cardCur: 0,
				swiperList: [
					{
						id: 0,
						type: 'image',
						url: '../../static/knowledge/banner1.jpg'
					},
					{
						id: 2,
						type: 'image',
						url: '../../static/knowledge/banner2.jpg'
					},
					{
						id: 3,
						type: 'image',
						url: '../../static/knowledge/banner3.png'
					}
				],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				videoList: [
					{
						id: '1',
						name: 'CBTC系统',
						children: [
							{
								id: '11',
								name: '联锁CBI专项培训',
								desc: '这是一个课程的描述大煞风景大煞风景的索科洛夫绝对是雷锋精神的快乐减肥的苏里科夫街道上看风景的实力',
								collectNum: 3,
								viewNum: 200,
								image: 'https://img.mukewang.com/szimg/5d8cae9608ff3c5f01400140.jpg'
							},
							{
								id: '12',
								name: '车载控制器CC专项培训',
								desc: '这是一个课程的描述',
								collectNum: 3,
								viewNum: 200,
								image: 'https://img.mukewang.com/szimg/5d8cae9608ff3c5f01400140.jpg'
							},
							{
								id: '13',
								name: '区域控制器ZC专项培训',
								desc: '这是一个课程的描述',
								collectNum: 3,
								viewNum: 200,
								image: 'https://img.mukewang.com/szimg/5d8cae9608ff3c5f01400140.jpg'
							},
							{
								id: '14',
								name: 'ATS培训',
								desc: '这是一个课程的描述',
								collectNum: 3,
								viewNum: 200,
								image: 'https://img.mukewang.com/szimg/5d8cae9608ff3c5f01400140.jpg'
							}
						]
					}
				]
			}
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			toVideoDetail(prop) {
				uni.navigateTo({
					url: '../../components/video-detail/video-detail'
				})
			}
		}
	}
</script>

<style>
	page{
		/* background: #fff; */
	}
	.video-container{
		padding-bottom: 100rpx;
	}
	.video-item{
		
	}
	.video-title{
		width: 100%;
		box-sizing: border-box;
		height: 110rpx;
		background: #fff url(https://m.imooc.com/static/wap/static/img/index/title-bg-3.png) no-repeat left top 20rpx;
		background-size: auto 70%;
		font-size: 18px;
		color: #2B333B;
		font-weight: 500;
		line-height: 110rpx;
		padding-left: 40rpx;
	}
	.path-list{
		background: #fff;
		padding-bottom: 40rpx;
	}
	.path-item{
		display: flex;
		padding: 0 40rpx;
		/* align-items: center; */
		margin-bottom: 40rpx;
	}
		
	.path-image{
		width: 160rpx;
		height: 160rpx;
		border-radius: 8rpx;
	}
	.path-info{
		flex: 1;
		box-sizing: border-box;
		padding-left:20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		
	}
	.path-name{
		font-size: 14px;
		line-height: 40rpx;
		color: #2B333B;
		font-weight: 500;
	}
	.path-desc{
		color: #71777D;
		font-size: 14px;
		line-height:44rpx;
		margin-top: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		word-wrap: break-word;
	}
	.path-num{
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: #71777D;
		margin-top: 16rpx;
	}
</style>
