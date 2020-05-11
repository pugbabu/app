<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">资料库</block>
		</cu-custom>
		<view class="knowledge">
			<tu-zhi v-if="pageUrl == 'tuzhi'"></tu-zhi>
			<video-comp v-else-if="pageUrl == 'shipin'"></video-comp>
			<tabbar-upload v-else></tabbar-upload>
			<view class="cu-bar tabbar bg-white shadow foot">
				<view class="action" @click="NavChange" data-cur="tuzhi">
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
				<view class="action" @click="NavChange" data-cur="shipin">
					<view class='cuIcon-cu-image'>
						<image v-if="pageUrl == 'shipin'" src="../../static/knowledge/shipin-active.png"></image>
						<image v-else src="/static/knowledge/shipin.png"></image>
					</view>
					<view>视频</view>
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
	export default {
	    data() {
	        return {
	            src: '',
				pageUrl: 'tuzhi',
	        }
	    },
		components: {
			// TabBar,
			TuZhi,
			VideoComp,
			TabbarUpload
		},
	    methods: {
	      NavChange(e) {
	      				this.pageUrl = e.currentTarget.dataset.cur
	      }
	    }
	}
</script>

<style>
</style>
