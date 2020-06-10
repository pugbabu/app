<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" :isManual="true" @back="handleBack">
			<block slot="backText">返回</block>
			<block slot="content">转辙机检修</block>
			<block slot="right">
				<view class="action" @tap="scanCode">
					<text style="font-size: 40upx;" class="lg text-white cuIcon-scan"></text>
				</view>
			</block>
		</cu-custom>
		<easy-skeleton SkelttionType="prouct" v-show="hasSkelettion"></easy-skeleton>
		<view v-show="!hasSkelettion">
			<!-- 轮播图 -->
			<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500" :indicator-color="bannerDotColor" :indicator-active-color="bannerDotActiveColor">
				<swiper-item v-for="(item,index) in colorList" :key="index"  @tap="handleTap(item.title)" >
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
					<text class="cuIcon-titles text-orange"></text> 设备列表
				</view>
			</view>
			<view class="cu-card case">
				<view class="cu-item shadow" v-for="item in machineList" :key="item.id" @tap="toRepairResult" :data-id="item.id" :data-step="item.step" :data-status="item.status">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<!-- <view class="cu-tag bg-red continue-tag" v-if="item.step != 4">继续</view> -->
							<view class="cu-tag bg-green continue-tag" v-if="item.step == 4">完成</view>
							<view class="cu-tag bg-gray continue-tag" v-if="item.step == 0">未开始</view>
							<view class="cu-avatar round lg" style="background-image:url(../../static/logo.png);"></view>
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
						<button class="cu-btn line-green text-green" @tap="start('init')">重新开始</button>
						<button class="cu-btn bg-green margin-left" @tap="start">继续</button>
		
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">检修前注意事项</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
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
					<view class="content">转辙机检修</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					是否开始该设备的检修？
				</view>
				<view class="cu-bar bg-white justify-end" >
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">否</button>
						<button class="cu-btn bg-green margin-left" @tap="startRepair">是，开始检修</button>
		
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
						step: 0,
						repairType: 'month'
					},
					{
						id: 2,
						name: '江陵路2号转辙机',
						// rate: 100,
						status: 'finished',
						step: 0,
						repairType: 'week'
					},
					{
						id: 3,
						name: '江陵路3号转辙机',
						// rate: 20,
						status: 'unfinished',
						step: 0,
						repairType: 'doubleWeek'
					},
					{
						id: 4,
						name: '江陵路4号转辙机',
						// rate: 60,
						step: 0,
						status: 'unfinished',
						repairType: 'year'
					},
					{
						id: 5,
						name: '江陵路4号转辙机',
						// rate: 60,
						step: 0,
						status: 'unfinished',
						repairType: 'halfYear'
					}
				],
				modalName: '',
				hasSkelettion: true,
				scanMachineId: '',
				isInRepairList: false,
				scanResult: null
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
				that.hasSkelettion = false
			}, 500)
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			toRepairResult(e) {
				let step = e.currentTarget.dataset.step
				let id = e.currentTarget.dataset.id
				if (step == 0) {
					uni.showModal({
						title: '',
						content: '检修未开始，暂无记录',
						showCancel: false
					})
					return
				}
				uni.navigateTo({
					url:'/pages/basic/switch-process/result?id=' + id
				})
			},
			start(value) {
				let step
				if (value == 'init') {
					step = 1;
				} else {
					step = this.scanResult.step
				}
				uni.navigateTo({
					url:`./switch-process/index?step=${step}&id=${this.scanResult.id}&repairType=${this.scanResult.repairType}`
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
				
				let that = this
				uni.scanCode({
				    success: function (res) {
						that.scanMachineId = '1'
						that.scanResult = that.machineList.find(val => {
							return  val.id == that.scanMachineId
						})
						console.log(that.scanResult)
						if (that.scanResult) {
							// 扫码设备的id存在于工单设备列表
							if (that.scanResult.step != 0) {
								// 有维修记录的，则弹出继续维修弹窗
								that.modalName = 'dialogModal'
							} else {
								that.modalName = 'scanCode'
							}
							
						} else {
							uni.showModal({
								title: '',
								content: '该设备不在您的维修工单中，请重新检查确认',
								showCancel: false
							})
						}
				    }
				});
				

			},
			handleTap(title) {
				if (title == '检修前注意事项') {
					this.modalName = 'Image'
				} else {
					this.modalName = ''
					setTimeout(() => {
						uni.previewImage({
							current: 0,
							urls: ['../../static/dianlu.png']
						})
					}, 150)
				}
			},
			handleBack() {
				uni.navigateTo({
					url:'/pages/home/index',
					animationType: 'slide-in-left',
				})
			},
			startRepair() {
				let step = this.scanResult.step == 0 ? 1 : this.scanResult.step
				uni.navigateTo({
					url: `/pages/basic/switch-process/index?step=${step}&id=${this.scanResult.id}&repairType=${this.scanResult.repairType}`
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
