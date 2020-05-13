<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">资料库</block>
		</cu-custom>
		<view class="knowledge">
			<tu-zhi v-if="pageUrl == 'tuzhi'" :list="drawList"></tu-zhi>
			<document-comp v-else :list="documentList"></document-comp>
			<!-- <video-comp v-else-if="pageUrl == 'shipin'"></video-comp> -->
			<!-- <tabbar-upload v-else></tabbar-upload> -->
			<view class="cu-bar tabbar bg-white shadow foot">
				<view class="action" @click="NavChange" data-cur="tuzhi" data-type="1">
					<view class='cuIcon-cu-image'>
						<image v-if="pageUrl == 'tuzhi'" src="/static/knowledge/tuzhi-active.png"></image>
						<image v-else src="/static/knowledge/tuzhi.png"></image>
					</view>
					<view>图纸</view>
				</view>
				<!-- <view class="action text-gray add-action" @click="NavChange" data-cur="upload">
					<button class="cu-btn cuIcon-add bg-green shadow"></button>
					上传
				</view> -->
				<view class="action" @click="NavChange" data-cur="document" data-type="2">
					<view class='cuIcon-cu-image'>
						<image v-if="pageUrl == 'document'" src="../../static/knowledge/shipin-active.png"></image>
						<image v-else src="/static/knowledge/shipin.png"></image>
					</view>
					<view>文档</view>
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
				drawList: []
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
			this.getFiles('2')
		},
	    methods: {
	      NavChange(e) {
			this.pageUrl = e.currentTarget.dataset.cur
			let type = e.currentTarget.dataset.type
			console.log(type)
			this.getFiles(type)
	      },
		  getFiles(type) {
			  console.log('get files ')
		  	let _this = this
		  	uni.request({
		  		url: 'http://192.168.196.254:3000/file/list',
		  		data : {
		  			type: type
		  		},
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
</style>
