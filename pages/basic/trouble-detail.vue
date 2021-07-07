<template>
	<view class="trouble-detail-page">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">故障详情</block>
		</cu-custom>
		<view class="trouble-detail-content">
			<view class="flex justify-between  margin-top margin-bottom text-grey dashed-bottom padding-bottom">
				<text class="text-bold">故障名称</text>
				<view class="words">{{troubleDetail.troubleName}}</view>
			</view>
			<view class="flex justify-between  margin-top margin-bottom text-grey dashed-bottom padding-bottom">
				<text class="text-bold">登记时间</text>
				<view class="words">{{troubleDetail.createTime}}</view>
			</view>
			<view class="flex justify-between  margin-top margin-bottom text-grey dashed-bottom padding-bottom">
				<text class="text-bold">故障等级</text>
				<view class="words">{{troubleDetail.troubleLevel | troubleFilter}}</view>
			</view>
			<view class="flex justify-between  margin-top margin-bottom text-grey dashed-bottom padding-bottom">
				<text class="text-bold">线路车站</text>
				<view class="words">{{troubleDetail.lineStation}}</view>
			</view>
			<view class="flex justify-between  margin-top margin-bottom text-grey dashed-bottom padding-bottom">
				<text class="text-bold">故障设备</text>
				<view class="words">{{troubleDetail.deviceName}}</view>
			</view>
			<view class="flex justify-between  margin-top margin-bottom text-grey dashed-bottom padding-bottom">
				<text class="text-bold">故障描述</text>
				<view class="words">{{troubleDetail.troubleText}}</view>
			</view>
			<view class="margin-top margin-bottom text-grey padding-bottom">
				<view class="text-bold">故障图片信息</view>
				<view class="flex flex-wrap justify-between margin-top" >
					<block v-for="(path, index) in troubleDetail.paths" :key="index" >
						<image
							
							class="trouble-image margin-bottom" 
							:src="$config.requestURL + path.split('8080')[1]" 
							@click="previewImg(path)">
						</image>
						<!-- {{$config.requestURL + path.split('8080')[1]}} -->
					</block>
					
				<!-- 	<image class="trouble-image " src="../../static/dianlu.png" @click="previewImg"></image>
					<image class="trouble-image " src="../../static/dianlu.png" @click="previewImg"></image>
					<image class="trouble-image" src="../../static/dianlu.png" @click="previewImg"></image> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				troubleDetail: {}
			}
		},
		onLoad(options) {
			let id = options.id
			console.log(id)
			this.getTroubleDetail(id)
		},
		methods: {
			getTroubleDetail(id) {
				this.$store.dispatch('getTtroubleDetail', {
					url: '/portal/biRepairDetail2App.action',
					data: {
						fileId: id,
						sessionId: this.$storage.getStorage('sessionId')
					}
				}).then(res => {
					console.log(res, 'detail')
					this.troubleDetail = res.data || {}
				})
			},
			previewImg(path) {
				let url = this.$config.requestURL + path.split('8080')[1]
				uni.previewImage({
					current: 0,
					urls: [url]
				})
			}
		},
		filters: {
			troubleFilter(value) {
				if (value == 'level1') {
					return '一级'
				} else if (value == 'level2') {
					return '二级'
				} else if (value == 'level3') {
					return '三级'
				} else {
					return ''
				}
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
