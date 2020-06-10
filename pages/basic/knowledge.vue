<template>
	<view class="knowledge-page">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">资料库</block>
		</cu-custom>
		<view class="knowledge">
			<tu-zhi v-if="pageUrl == 'tuzhi'" :type="type"></tu-zhi>
			<document-comp v-else :type="type"></document-comp>
			<!-- <video-comp v-else-if="pageUrl == 'shipin'"></video-comp> -->
			<!-- <tabbar-upload v-else></tabbar-upload> -->
			<view class="cu-bar tabbar bg-white shadow foot">
				<view class="action" @click="NavChange" data-cur="tuzhi" data-type="1">
					<view class='cuIcon-cu-image'>
						<view class="cuIcon-pic" :class="[pageUrl == 'tuzhi' ? 'text-green' : 'text-gray']" style="font-size: 46upx;"></view>
					</view>
					<view>
						<text :class="[pageUrl == 'tuzhi' ? 'text-green' : 'text-gray']">图纸</text>
					</view>
				</view>
				<!-- <view class="action text-gray add-action" @click="NavChange" data-cur="upload">
					<button class="cu-btn cuIcon-add bg-green shadow"></button>
					上传
				</view> -->
				<view class="action" @click="NavChange" data-cur="document" data-type="2">
					<view class='cuIcon-cu-image'>
						<view class="cuIcon-text" :class="[pageUrl == 'document' ? 'text-green' : 'text-gray']" style="font-size: 46upx;"></view>
					</view>
					<view>
						<text :class="[pageUrl == 'document' ? 'text-green' : 'text-gray']">文档</text>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	// import TabBar from '../../components/tabbar/tabbar.vue'
	import TuZhi from '@/components/tuzhi/tuzhi.vue'
	import VideoComp from '@/components/video/video.vue'
	import TabbarUpload from '@/components/tabbar-upload/tabbar-upload.vue'
	import DocumentComp from '@/components/document/document'
	export default {
	    data() {
	        return {
	            src: '',
				pageUrl: 'tuzhi',
				documentList: [],
				drawList: [],
				type: '1'
	        }
	    },
		components: {
			// TabBar,
			TuZhi,
			VideoComp,
			TabbarUpload,
			DocumentComp
		},
		created() {
			// this.$store.dispatch('getFiles', {
			// 	url: '/file/list',
			// 	data: {
			// 		type: '1'
			// 	}
			// }).then(res => {
			// 	console.log(res, 'getFiles')
			// })
			// this.getFiles(this.type)
		},
		onUnload() {
			console.log('onUnload')
			uni.hideLoading()
		},
	    methods: {
	      NavChange(e) {
			this.pageUrl = e.currentTarget.dataset.cur
			this.type = e.currentTarget.dataset.type.toString()
			// this.getFiles(this.type)
	      },
		  documentSearch(title) {
			  if (!title) {
				  uni.showToast({
				  	icon: 'none',
					title: '请输入文档名称'
				  })
				  return;
			  } else if (title == 'none') {
				  this.getFiles(this.type)
				  return
			  }
			  this.getFiles(this.type, title)
		  },
		  getFiles(type, title) {
			  console.log('get files ')
			  let data
			  if (title) {
				  data = {
					  type,
					  title
				  }
			  } else {
				  data= {
					  type
				  }
			  }
		  	let _this = this
		  	uni.request({
		  		url: 'http://192.168.196.254:3000/file/list',
		  		data : data,
		  		success: (result) => {
		  			console.log(result, 'fileresult')
		  			if (result.data.code == 200) {
						if (type == 1) {
							_this.drawList = result.data.data.files || []
						} else {
							_this.documentList = result.data.data.files || []
						}
		  			}
		  		},
				fail() {
					console.log('faile get file')
				}
		  	})
		  },
	    }
	}
</script>

<style>
	.knowledge-page{
		height: 100vh;
		background: #fff;
	}
</style>
