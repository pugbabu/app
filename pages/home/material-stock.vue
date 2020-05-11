<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-gradual-blue">
				<block slot="backText"></block>
				<block slot="content">我的库房</block>
			</cu-custom>
			<view class="material-head">
				<!-- <view class="material-head-title">我的库房</view> -->
				<view class="head-action">
					<view class="search">
						<image src="/static/wuliao/sousuo.png"></image>
						<input class="search-input" type="text" placeholder="搜索物料名称" placeholder-class="input-placeholder" />
					</view>
					<image class="saoma" src="/static/wuliao/saoma.png"></image>
				</view>
			</view>
			<view class="material-content">
				<view class="material-tabs">
					<view @tap="tabChange(tab)" class="material-tab" :class="{'material-tab-active': currentTab == tab}" v-for="tab in tabs"
					 :key="tab">{{tab}}</view>
				</view>
				<view class="material-main">
					<view class="material-item" v-for="item in materials" :key="item.id">
						<view class="material-name">
							<text>{{item.name}}</text>
							<view v-if="item.currentNum < item.warnNum" style="display: flex;align-items: center;">
								<text style="color: #fe4c4f;margin-right: 5px;">{{item.currentNum}}</text>
								<image src="/static/wuliao/yujing.png" style="width: 14px;height: 14px;"></image>
							</view>
							<text v-else>{{item.currentNum}}</text>
						</view>
						<view class="material-num">
							<text style="color: #999;">预警数量</text>
							<text>{{item.warnNum}}</text>
						</view>
						<view class="material-dir">
							<text style="color: #999;">物料目录</text>
							<text>{{item.dir}}</text>
						</view>
						<view class="price">
							<text style="margin-right: 10rpx;">单价</text>
							<text>{{item.price}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowSearch: true,
				tabs: ['默认排序', '库存', '单价', '级别', '筛选'],
				currentTab: '默认排序',
				materials: [{
						id: '1',
						name: '消防箱',
						currentNum: 145,
						warnNum: 200,
						dir: 'RN-7772',
						price: '40.00 / 单位 个'
					},
					{
						id: '2',
						name: '不锈钢快速接头',
						currentNum: 750,
						warnNum: 200,
						dir: 'RN-7772',
						price: '40.00 / 单位 个'
					},
					{
						id: '3',
						name: '刹车片',
						currentNum: 78,
						warnNum: 200,
						dir: 'RN-7772',
						price: '40.00 / 单位 个'
					},
					{
						id: '4',
						name: 'CA-N门把手',
						currentNum: 740,
						warnNum: 200,
						dir: 'RN-7772',
						price: '40.00 / 单位 个'
					}
				]
			}
		},
		methods: {
			tabChange(tab) {
				this.currentTab = tab
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	.material-head {
		width: 100%;
		height: 300upx;

		background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
		box-sizing: border-box;
		padding: 0 50upx;
		/* padding-top: 90upx; */
		font-family: GBK Regular;
		padding-top: 60upx;
	}

	.material-head-title {
		font-size: 18px;
		color: #fff;
		line-height: 30px;

	}

	.head-action {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 40rpx;
	}

	.search {
		position: relative;
		width: 80%;
		background: #fff;
		height: 30px;
		border-radius: 40rpx;
	}

	.search image {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		left: 20rpx;
		top: 50%;
		transform: translateY(-50%);
		z-index: 99;
	}

	.input-placeholder {
		color: #999;
		font-size: 14px;
	}

	.search-input {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		line-height: 30px;
		border: none;
		padding-left: 70rpx;
		font-size: 14px;
		color: #333;
		font-family: GBK Regular;
	}

	.saoma {
		width: 50rpx;
		height: 50rpx;
		margin-right: 10rpx;
	}

	.material-content {
		background: #F7F8FA;
		padding-bottom: 100upx;
	}

	.material-tabs {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 40rpx;
		font-size: 14px;
		color: #666;
		font-family: GBK Regular;
		line-height: 30px;
		border-bottom: 1px solid #EEEEEE;
	}

	.material-tab-active {
		color: #5886fc;
	}

	.material-main {
		padding: 0 60rpx;
	}

	.material-item {
		background: #fff;
		border-radius: 10rpx;
		box-shadow: 0 0 3px #C2C2C2;
		margin: 30rpx 0;
		font-family: GBK Regular;
		padding: 20rpx;
	}

	.material-name {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #5886fc;
		font-size: 14px;
		line-height: 30px;
	}

	.material-name:first-child {
		font-size: 18px;
		font-weight: 500;
	}

	.material-num,
	.material-dir {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		line-height: 30px;
		color: #333;
	}

	.price {
		color: #999;
		line-height: 30px;
		font-size: 14px;
	}
</style>
