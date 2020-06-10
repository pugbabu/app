<template>
	<view>
		<page-home v-if="PageCur == 'index'"></page-home>
		<person-center v-if="PageCur == 'center'"></person-center>
		<material-stock v-if="PageCur == 'wuliao'"></material-stock>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="index">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='index'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">首页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="wuliao">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/component' + [PageCur == 'wuliao'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">物料库存</view>
			</view>
			<view class="action" @click="NavChange" data-cur="center">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/plugin' + [PageCur == 'center'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">个人中心</view>
			</view>
		</view>
	</view>
</template>

<script>
	import pageHome from './page-home.vue'
	import personCenter from './person-center.vue'
	import materialStock from './material-stock.vue'
	export default {
		data() {
		return {
				PageCur: 'index'
			}
		},
		components:{
			pageHome,
			personCenter,
			materialStock
		},
		onShow() {
			if (!this.$storage.getStorage('sessionId')) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
