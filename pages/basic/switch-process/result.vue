<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom class="switch-result-custom" bgColor="bg-gradual-blue">
				<block slot="backText"></block>
				<block slot="content">转辙机维修结果记录</block>
				<block slot="right">
					<view class="action" @tap="toHome">
						<text style="font-size: 40upx;" class="lg text-white cuIcon-homefill"></text>
					</view>
				</block>
			</cu-custom>
			
			<block v-for="(item, index) in resultData.storageList" :key="index">
				<view class="result-item">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-titles text-blue"></text> {{item.stepName}}
						</view>
					</view>
					<view v-for="(prop, i) in item.list" :key="i">
						<view class="cu-bar bg-white solid-bottom margin-top">
							<view class="action">
								<text class="cuIcon-title text-orange "></text> {{prop.name}}
							</view>
							<view class="action" v-if="prop.display == 'switch'">
								<text class="text-orange" v-if="prop.value">是</text>
								<text class="text-orange" v-else>否</text>
							</view>
						</view>
						<view class="cu-form-group" v-if="prop.display == 'input'">
							<text class="text-green">{{prop.value}}</text>
						</view>
					</view>
				</view>
				
			</block>
			
			
			
			<view class="action foot-button">
				<button class="cu-btn bg-grey shadow" @tap="prev">返回上一步</button>
				<button style="margin-left: 40upx;" class="cu-btn bg-green shadow" @tap="uploadData">上传数据</button>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resultData: {},
				id: ''
			}
		},
		computed: {
			

		},
		onLoad(option) {
			this.id = option.id
			let key = 'switch-task-' + this.id
			this.resultData = this.$storage.getStorage(key)
			console.log(this.resultData, 'result')
		},
		methods: {
			toList() {
				uni.navigateTo({
					url:'../switch-machine'
				})
			},
			uploadData() {
				uni.showToast({
					title:'上传数据中',
					icon: 'none'
				})
			},
			toHome() {
				uni.navigateTo({
					url: '/pages/home/index'
				})
			},
			prev() {
				uni.navigateTo({
					url:'/pages/basic/switch-process/index?step=4&id=' + this.id
				})
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
	.foot-button{
		position: fixed;
		z-index: 1025;
		bottom: 40upx;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
	}
	.result-item{
		margin-bottom: 40upx;
	}
	.switch-result-custom /deep/.cu-bar{
		justify-content: flex-end !important;
	}
</style>
