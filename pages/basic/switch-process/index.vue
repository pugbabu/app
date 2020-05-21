<template>
	<view>
		<view  class="page">
			<view style="flex: auto;">
				<cu-custom bgColor="bg-gradual-blue" :isManual="true" :isBack="true" @back="handleBack">
					<block slot="backText">返回</block>
					<block slot="content">转辙机维修过程</block>
				</cu-custom>
				<scroll-view scroll-x class="bg-white padding response cu-steps steps-bottom" :scroll-into-view="'scroll-' + scroll"
				 scroll-with-animation>
					<view class="cu-item padding-lr-xl" :class="index>scroll?'':'text-green'" v-for="(item,index) in stepList" :key="index"
					 :id="'scroll-' + index">
						{{item.stepName}} <text class="num" :data-index="index + 1"></text>
					</view>
				</scroll-view>
				<view class="cu-bar bg-white solid-bottom" style="margin-top: 20upx;">
					<view class="action">
						<text class="cuIcon-titles text-green"></text><text class="text-green">{{stepTitle}}</text> 
					</view>
				</view>
				
				<!-- 检测步骤 -->
				<block v-for="(item, index) in currentList" :key="index">
					<view class="cu-bar bg-white solid-bottom margin-top">
						<view class="action">
							<text class="cuIcon-title text-orange "></text> {{item.name}}
							<text class="lg text-gray cuIcon-question" @tap="showDesc(item.desc)"></text>
						</view>
						<view class="action" v-if="item.display == 'switch'">
							<switch :class="item.value?'checked':''" :checked="item.value" @change="switchChange($event, index)"></switch>
						</view>
					</view>
					<view class="cu-form-group" v-if="item.display == 'input'">
						<input placeholder="请填写检修后状态" name="input" v-model="item.value"></input>
					</view>
					
				</block>
			</view>
			



			<!-- 底部操作 -->
			<view class="action action-bottom">
				<button style="margin-right: 30upx;" v-if="scroll != 0" class="cu-btn bg-grey shadow" @tap="ScrollSteps('prev')">上一步</button>
				<button class="cu-btn bg-green shadow" @tap="ScrollSteps('next')">{{nextBtnText}}</button>
				<button style="margin-left: 30upx;" class="cu-btn bg-red shadow" @tap="saveSteps">保存</button>
			</view>

			
		</view>
		<!-- 详情弹窗 -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">详细描述</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{desc}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { switchConfig } from '../../../common/config/index.js'
	export default {
		data() {
			return {
				modalName: null,
				desc: '',
				scroll: 0,
				stepList: switchConfig,
				step: null,
				id: null,
				storageList: []
			}
		},
		computed: {
			stepTitle() {
				console.log(this.scroll)
				return this.stepList[this.scroll].stepName
			},
			currentList() {
				return this.stepList[this.scroll].list
			},
			nextBtnText() {
				if (this.scroll == this.stepList.length - 1) {
					return '提交'
				}
				return '下一步'
			}

		},
		onLoad(option) {
			this.step = option.step
			this.id = option.id
			this.scroll = parseInt(this.step) - 1
			let storageSetting = this._getStorage('switch-task-' + this.id)
			if (storageSetting) {
				this.stepList = storageSetting.storageList
				this.scroll = this.step == 1 ? 0 : storageSetting.curStep
			}
			console.log(storageSetting)
		},
		methods: {
			ScrollSteps(type) {
				if (type == 'prev') {
					this.scroll--
					
				} else {
					this._setStorage()
					this._validateInput().then(flag => {
						if (!flag) {
							uni.showToast({
								title:'填写内容不能为空',
								icon: 'none',
								duration: 1000
							})
							return
						}
						if (this.scroll == this.stepList.length - 1) {
							uni.navigateTo({
								url:'./result?id=' + this.id
							})
						} else {
							this.scroll++
						}
					})
				
				}
			},
			saveSteps() {
				this._setStorage()
				uni.showToast({
					title: '保存成功'
				})
			},
			_setStorage() {
				let key = 'switch-task-' + this.id
				this.stepList.forEach((item, index) => {
					if (this.scroll == index) {
						this.storageList[this.scroll] = {stepName: this.stepTitle, list: this.currentList}
					} else {
						this.storageList[index] = item
					}
				})
				let data = {
					curStep: this.scroll,
					id: this.id,
					storageList: this.storageList
					
				}
				console.log(data)
				this.$storage.setStorage(key, data)
			},
			_getStorage(key) {
				let data = this.$storage.getStorage(key)
				if (!data) {
					return null
				} else {
					return data
				}
			},
			switchChange(e, index) {
				console.log(e, index)
				let value = e.detail.value
				this.currentList[index].value = value;
			},
			showDesc(desc) {
				this.desc = desc
				this.modalName = 'Modal'
			},
			hideModal() {
				this.modalName = null
			},
			_validateInput() {
				return new Promise(resolve => {
					let flag = true
					this.currentList.forEach(item => {
						if (item.display == 'input' && !item.value) {
							flag = false
						}
					})	
					resolve(flag)
				})
		
			},
			handleBack() {
				uni.navigateTo({
					url: '/pages/basic/switch-machine'
				})
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		/* box-sizing: border-box;
		padding-bottom: 150upx; */
	}
	.action-bottom {
		flex-shrink: 0;
		padding: 30upx 0;
		display: flex;
		justify-content: center;
		/* position: fixed;
		bottom: 40upx;
		left: 0;
		right: 0;
		text-align: center;
		z-index: 99; */
	}
	.uni-input-placeholder{
		color: grey;
	}
</style>
