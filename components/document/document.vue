<template>
	<view class="document-wrapper">
		<view v-if="documentList.length">
			<view class="cu-bar bg-white search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="请输入文档名称" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-gradual-green shadow-blur round" @tap="search">搜索</button>
				</view>
			</view>
			<view class="tuzhi-list">
				<image src="/static/nocontent.png"  style="width: 400upx;height: 400upx;"></image>
				<scroll-view style="height: calc(100vh - 200rpx);padding:40rpx 0;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				 @scroll="scroll">
					<view class="tuzhi-item" v-for="(item, index) in documentList" :key="index">
						<view class="tuzhi-title" @tap="previewDoc(item.filePath)">{{item.title}}</view>
					</view>
				</scroll-view>
			</view>
			<image v-show="old.scrollTop > 300" @tap="goTop" class="link-top" src="../../static/knowledge/top.png"></image>
		</view>
		<view v-else>
			<no-data text="暂无文档"></no-data>
		</view>
		
	</view>
</template>

<script>
	import NoData from '@/components/no-data/no-data.vue'
	export default {
		props: {
			list: {
				type: Array
			}
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				documentList: [
					{
						title: '文档第三方的',
						filePath: 'http://192.168.196.254:3000/assets/docs/resume.pdf'
					}
				],
			}
		},
		components: {
			NoData
		},
		methods: {
			search() {
				uni.showToast({
					icon: 'none',
					title: '暂无文档'
				})
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			getFiles() {
				let _this = this
				uni.request({
					url: 'http://192.168.196.254:3000/file/list',
					data : {
						type: '2'
					},
					success: (result) => {
						console.log(result, 'fileresult')
						if (result.data.code == 200) {
							_this.documentList = result.data.data.files || []
							console.log(_this.documentList)
						}
					}
				})
			},
			previewDoc(filePath) {
				console.log('previewDoc')
				console.log(uni)
				uni.downloadFile({
				    url: filePath,  
				    success: (downloadResult) => {  
						console.log(downloadResult, 'downloadResult')
						var file = downloadResult.tempFilePath;
				        if (downloadResult.statusCode === 200) {  
							 uni.openDocument({
								filePath: file,
								success: function (res) {
								  console.log('打开文档成功');
								}
							  });
				          
				        }  
				    },
					fail() {
						console.log('preview fail')
					}
				});
			}
		}
	}
</script>

<style>
	.document-wrapper{
		background: #fff;
	}
</style>
