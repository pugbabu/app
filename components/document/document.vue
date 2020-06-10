<template>
	<view class="document-wrapper">
		<!-- <easy-skeleton SkelttionType="prouct" v-if="hasSkelettion"></easy-skeleton> -->
		<view>
			<view class="cu-bar bg-white search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @input="handleInput" v-model="searchText" type="text" placeholder="请输入文档名称" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-gradual-green shadow-blur round" @tap="search">搜索</button>
				</view>
			</view>
			<directory :directories="directories" @selectDir="selectDir"></directory>
			<view v-if="!list.length && hasLoaded">
				<no-data text="暂无文档"></no-data>
			</view>
			<view v-else>
				<view class="tuzhi-list">
					<scroll-view style="height: calc(100vh - 200rpx);padding:40rpx 0;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"
					 @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
						<view class="cu-item  padding-sm margin-bottom-sm" v-for="(item, index) in list" :key="index" @tap="previewDoc(item)">
							<view class="content" style="display: flex;">
								<!-- <text class="cuIcon-file text-green margin-right-sm" style="font-size: 44upx;"></text> -->
								<view class="cuIcon-file text-green margin-right-sm" style="font-size: 44upx;" v-if="item.fileType == 'folder'"></view>
								<view class="cuIcon-text text-gray margin-right-sm" style="font-size: 44upx;" v-else></view>
								<text class="text-grey" style="display: flex;align-items: center;">{{item.name}}</text>
							</view>
						</view>
						<!-- <view class="tuzhi-item" v-for="(item, index) in documentList" :key="index">
							<view class="tuzhi-title" @tap="previewDoc(item.filePath)">{{item.title}}</view>
						</view> -->
					</scroll-view>
				</view>
				<image v-show="old.scrollTop > 300" @tap="goTop" class="link-top" src="../../static/knowledge/top.png"></image>
			</view>
		</view>


	</view>
</template>

<script>
	import NoData from '@/components/no-data/no-data.vue';
	const office = uni.requireNativePlugin('Jiang-OfficeView');
	// console.log(office, 'office')
	 // const fileviewer = uni.requireNativePlugin('chuck_fileviewer');
	import {
		mapState
	} from 'vuex'
	// #ifdef APP-PLUS  

	// #endif
	export default {
		props: {
			type: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				documentList: [{
					title: '文档第三方的',
					filePath: 'http://192.168.196.254:3000/assets/docs/resume.pdf'
				}],
				searchText: '',
				list: [],
				hasLoaded: false,
				directories: [{
					fileId: '0',
					name: '根目录'
				}],
				isShowDoc: false,
				docUrl: ''
			}
		},
		components: {
			NoData,
		},
		computed: {
			...mapState(['hasSkelettion'])
		},
		created() {
			// this.getFiles()
			this.getFileByDir('0')
		},
		methods: {
			search() {
				if (!this.searchText) return
				this.getFiles(this.searchText)
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
			getFiles(name) {
				let data = {
					searchType: 'file',
					sessionId: this.$storage.getStorage('sessionId')
				}
				if (name) {
					data.name = name
				}
				this.$store.dispatch('getFiles', {
					url: this.$config.requestURL + '/portal/showlist2App.action',
					data: data
				}).then(res => {
					console.log(res, 'getFiles')
					this.list = res.data || []
					this.hasLoaded = true
				})
			},
			previewDoc(item) {
				console.log('previewDoc')
				console.log(uni)
				if (item.fileType == 'folder') {
					this.getFileByDir(item.fileId)
					this.directories.push({
						name: item.name,
						fileId: item.fileId
					})
				} else {
					let fileType = item.extension.split('.')[1]
					let url = this.$config.requestURL + item.filePath.split('8080')[1]
					console.log(url)
					// #ifdef APP-PLUS 
		
					// uni.downloadFile({
					//   url: url,
					//   success: function (res) {
					// 	var filePath = res.tempFilePath;
					// 	uni.openDocument({
					// 	  filePath: url,
					// 	  success: function (res) {
					// 		console.log('打开文档成功');
					// 	  }
					// 	});
					//   }
					// });
					office.open({
						url: url,
						topBarColor: '#3394EC',
						title: item.name,
						fileType: fileType
					},
					result => {
						console.log(result)
						if (result.code == 1) {
					
						}
					});
				
					// #endif
				}

				// uni.downloadFile({
				//     url: filePath,  
				//     success: (downloadResult) => {  
				// 		console.log(downloadResult, 'downloadResult')
				// 		var file = downloadResult.tempFilePath;
				//         if (downloadResult.statusCode === 200) {  
				// 			 uni.openDocument({
				// 				filePath: file,
				// 				success: function (res) {
				// 				  console.log('打开文档成功');
				// 				}
				// 			  });

				//         }  
				//     },
				// 	fail() {
				// 		console.log('preview fail')
				// 	}
				// });
			},
			handleInput() {
				setTimeout(() => {
					if (!this.searchText) {
						this.getFileByDir('0')
					}
				})

			},
			selectDir(obj) {
				let i = obj.index
				this.directories = this.directories.slice(0, i + 1)
				this.getFileByDir(obj.fileId)
			},
			getFileByDir(parentId) {
				this.$store.dispatch('getFileByDir', {
					url: this.$config.requestURL + '/portal/biFileList2App.action',
					data: {
						searchType: 'file',
						parentId: parentId,
						sessionId: this.$storage.getStorage('sessionId')
					},
					withCredentials: true,
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					}
				}).then(res => {
					console.log(res)
					this.list = res.data || []
					this.hasLoaded = true
				})
			},
		}
	}
</script>

<style>
	.document-wrapper {
		background: #fff;
	}
</style>
