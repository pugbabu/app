<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isManual="true" :isBack="true" @back="handleBack">
			<block slot="backText">返回</block>
			<block slot="content">转辙机维修</block>
			<block slot="right">
				<view class="action" @tap="scanCode">
					<text style="font-size: 40upx;" class="lg text-white cuIcon-scan"></text>
					<!-- <view class="cu-load load-cuIcon"></view> -->
				</view>
			</block>
		</cu-custom>
		<!-- 轮播图 -->
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" :indicator-color="bannerDotColor" :indicator-active-color="bannerDotActiveColor">
			<swiper-item v-for="(item,index) in colorList" :key="index"@tap="handleTap(item.title)" >
				<!-- <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image> -->
				 <view  class="padding radius text-center shadow-blur banner-bg" :class="'bg-' + item.name">
					<view class="text-lg">{{item.title}}</view>
					<!-- <view class="margin-top-sm text-Abc">{{item.name}}</view> -->
				 </view>
			</swiper-item>
		</swiper>
		<!-- 列表 -->
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 任务清单
			</view>
		</view>
		<view class="cu-card case">
			<view class="cu-item shadow" v-for="item in machineList" :key="item.id" @tap="showModal" :data-id="item.id" :data-step="item.step" :data-status="item.status">
				<!-- <view class="image">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="widthFix"></image>
					<view class="cu-tag bg-red" v-if="item.step != 4">继续</view>
				</view> -->
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-tag bg-red continue-tag" v-if="item.step != 4">继续</view>
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view class="text-grey">{{item.name}}</view>
							<view class="text-gray text-sm flex justify-between">
								<view class="flex margin-top" style="flex: 1;">
									<view class="cu-progress round xs">
										<view class="bg-green" :style="[{ width:loading?calcRate(item.step)+'%':''}]"></view>
									</view>
									<text class="cuIcon-roundcheckfill text-green margin-left-sm" v-if="item.step == 4"></text>
									<text class="margin-left" v-else>{{calcRate(item.step)}}%</text>
								</view>
								<!-- <view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
									<text class="cuIcon-messagefill margin-lr-xs"></text> 30
								</view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='dialogModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">继续维修</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					选择重新开始后，将会从第一步开始，是否还要重新开始？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="start(1)">重新开始</button>
						<button class="cu-btn bg-green margin-left" @tap="start(step)">继续</button>
		
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog">
				<view class="bg-img" style="height:200px;overflow: auto;">
					<view class="text-lg text-left text-content padding-sm">1、检查联络工具良好，维修工具齐全</view>
					<view class="text-lg text-left text-content padding-sm">2、安全防护用品穿戴齐全</view>
					<view class="text-lg text-left text-content padding-sm">3、带上安全型手电筒</view>
					<view class="text-lg text-left text-content padding-sm">4、联系DCC调度长获得同意后进入轨道</view>
					<view class="text-lg text-left text-content padding-sm">5、召开工前安全会议</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='scanCode'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">转辙机确认</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					是否是xx号转辙机？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">否</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal">是，开始检修</button>
		
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		computed: { 
			...mapState({
				bannerDotColor: 'bannerDotColor',
				bannerDotActiveColor: "bannerDotActiveColor",
			})
		},
		data() {
			return {
				colorList: [
					{
						title: '检修前注意事项',
						name: 'cyan'
					},
					{
						title: '站场图',
						name: 'orange'
					}
				],
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/051400059efaba079ad2141ae8453601.jpg?thumb=1&w=720&h=360'
				}, {
					id: 1,
					type: 'image',
					url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/241dcd985a1c3f29902d092c7e7b91ea.jpg?thumb=1&w=720&h=360',
				}, {
					id: 2,
					type: 'image',
					url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e5a0c56428bde232ffcff3e53a13eb47.jpg?thumb=1&w=720&h=360'
				}],
				dotStyle: false,
				loading: false,
				machineList: [
					{
						id: 1,
						name: '江陵路1号转辙机',
						// rate: 80,
						status: 'unfinished',
						step: 1
					},
					{
						id: 2,
						name: '江陵路2号转辙机',
						// rate: 100,
						status: 'finished',
						step: 2,
					},
					{
						id: 3,
						name: '江陵路3号转辙机',
						// rate: 20,
						status: 'unfinished',
						step: 3,
					},
					{
						id: 4,
						name: '江陵路4号转辙机',
						// rate: 60,
						step: 3,
						status: 'unfinished',
					}
				],
				modalName: ''
			}
		},
		onShow() {
			this.modalName = null
			this._modifyData()
		},
		onLoad: function() {
			let that = this;
			setTimeout(function() {
				that.loading = true
			}, 500)
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			showModal(e) {
				let status = e.currentTarget.dataset.status
				let step = e.currentTarget.dataset.step
				let id = e.currentTarget.dataset.id
				if (step != 4) {
					this.modalName = 'dialogModal'
					this.step = step
					this.id = id
				} else {
					uni.navigateTo({
						url:'/pages/basic/switch-process/result?id=' + id
					})
				}
			},
			start(val) {
				uni.navigateTo({
					url:`./switch-process/index?step=${val}&id=${this.id}`
				})
			},
			calcRate(step) {
				let rate = 0
				if (step == 4) {
					rate = 100
				} else {
					rate = parseInt(step*100 / 4)
				}
				return rate
			},
			_modifyData() {
				this.machineList.forEach(item => {
					let curTask = this._getStorage('switch-task-' + item.id)
					console.log(curTask)
					if (curTask) {
						item.step = curTask.curStep+1
					}
				})
				console.log((this.machineList))
			},
			_getStorage(key) {
				let data = this.$storage.getStorage(key)
				if (!data) {
					return null
				} else {
					return data
				}
			},
			scanCode() {
				uni.scanCode({
				    success: function (res) {
						uni.showToast({
							title: res.result,
							icon: 'none',
							duration: 1000
						})
						this.modalName = 'scanCode'
				        // console.log('条码类型：' + res.scanType);
				        // console.log('条码内容：' + res.result);
				    }
				});
			},
			handleTap(title) {
				if (title == '检修前注意事项') {
					this.modalName = 'Image'
				} else {
					this.modalName = ''
				}
			},
			handleBack() {
				uni.navigateTo({
					url:'/pages/home/index'
				})
			}
		}
	}
</script>

<style>
	.banner-bg{
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.continue-tag{
		position: absolute;
		top: 10upx;
	}
</style>
