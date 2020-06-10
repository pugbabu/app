<template>
	<view class="tuzhi-wrapper">
		<!-- <easy-skeleton SkelttionType="prouct" v-show="hasSkelettion"></easy-skeleton> -->
		<view>
			<view class="cu-bar bg-white search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @input="handleInput" v-model="searchText" type="text" placeholder="请输入图纸名称" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-gradual-green shadow-blur round" @tap="search">搜索</button>
				</view>
			</view>
			<directory :directories="directories" @selectDir="selectDir" v-if="!isSearch"></directory>
			<!-- <nav-bar :navs="navs" @tabChange="tabChange"></nav-bar> -->
			<view v-if="!list.length && hasLoaded">
				<no-data text="暂无图纸"></no-data>
			</view>
			<view class="tuzhi-list" v-else>
				<scroll-view style="height: calc(100vh - 200rpx);padding:40rpx 0;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"
				 @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
					<view class="tuzhi-item padding-sm margin-bottom-sm" v-for="(item, index) in list" :key="index" @click="preImg(item)">
						<view class="cuIcon-file text-green margin-right-sm" style="font-size: 44upx;" v-if="item.fileType == 'folder'"></view>
						<view class="cuIcon-pic text-gray margin-right-sm" style="font-size: 44upx;" v-else></view>
						<view class="text-grey" style="display: flex;align-items: center;">{{item.name.split('.')[0]}}</view>
						<!-- <image :lazy-load="true" :src="'http://' + item.filePath" @click="preImg(item.filePath)"></image> -->
					</view>
				</scroll-view>
			</view>
			<image v-show="old.scrollTop > 300" @tap="goTop" class="link-top" src="../../static/knowledge/top.png"></image>
		</view>

	</view>
</template>
<script>
	import NavBar from '../nav/nav.vue'
	import NoData from '@/components/no-data/no-data.vue';
	import Directory from '../directory/directory.vue'
	import {
		mapState
	} from 'vuex'
	export default {
		props: {
			type: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isSearch: false,
				navs: [{
						id: '1',
						name: '信号专业'
					},
					{
						id: '2',
						name: 'AFC专业'
					},
					{
						id: '3',
						name: 'CCTV'
					},
					{
						id: '4',
						name: '门禁系统'
					},
					{
						id: '5',
						name: '综合监控'
					}
				],
				list: [],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				imgShow: false,
				searchText: '',
				hasLoaded: false,
				directories: [
					{
						fileId: '0',
						name: '根目录'
					}
				],
				currentDirId: ''
			}
		},
		components: {
			NavBar,
			NoData,
			Directory
		},
		computed: {
			...mapState(['hasSkelettion'])
		},
		watch: {
			hasSkelettion(val) {
				console.log(val, 'hasSkelettion')
			}
		},
		created() {
			console.log('crated')
			// this.getFiles()
			this.getFileByDir('0')
		},
		methods: {
			tabChange(index) {
				console.log(index)
			},
			toDetail(src) {
				uni.navigateTo({
					url: `/pages/basic/tuzhi-detail?data=${src}`
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
			search() {
				if (!this.searchText) return
				this.isSearch = true
				this.getFiles(this.searchText)
			},
			handleInput() {
				setTimeout(() => {
					if (!this.searchText) {
						this.isSearch = false
						this.getFileByDir('0')
					}
				})

			},
			getFiles(name) {
				let data = {
					searchType: 'image',
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
			getFileByDir(parentId) {
				uni.showLoading({
				    title: '加载中'
				});
				this.$store.dispatch('getFileByDir', {
					url: this.$config.requestURL + '/portal/biFileList2App.action',
					data: {
						searchType: 'image',
						parentId: parentId,
						sessionId: this.$storage.getStorage('sessionId')
					},
					withCredentials: true,
					header:{
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					}
				}).then(res => {
					console.log(res)
					uni.hideLoading()
					this.list = res.data || []
					this.hasLoaded = true
				}).catch(err => {
					uni.hideLoading()
				})
			},
			preImg(item) {
				if (item.fileType == 'folder') {
					this.getFileByDir(item.fileId)
					this.directories.push({
						name: item.name,
						fileId: item.fileId
					})
				} else {
					console.log(item.filePath)
					item.filePath = item.filePath.split('8080')[1]
					let image = this.$config.requestURL + item.filePath
					console.log(image)
					if (this.imgShow) { //防止点击过快导致重复调用
						return;
					}
					this.imgShow = true;
					setTimeout(() => {
						this.imgShow = false;
					}, 1000)
					setTimeout(() => {
						uni.previewImage({
							current: 0,
							urls: [image]
						})
					}, 150)
				}
				
			},
			selectDir(obj) {
				let i = obj.index
				this.directories = this.directories.slice(0, i+1)
				this.getFileByDir(obj.fileId)
			}
		}
	}
</script>

<style>
	.tuzhi-wrapper {
		background: #fff;
	}

	.tuzhi-list {
		/* padding: 50rpx 0; */
	}

	.tuzhi-item {
		/* padding: 0 20rpx;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx; */
		display: flex;
		align-items: center;
	}

	.tuzhi-title {
		font-size: 16px;
		line-height: 30px;
		font-family: GBK Regular;
		font-weight: 500;
		margin-bottom: 20rpx;
	}

	.tuzhi-item image {
		width: 100%;
	}

	.link-top {
		position: fixed;
		right: 40rpx;
		bottom: 140rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		/* background: red; */
	}
</style>
