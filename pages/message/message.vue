<template>
	<view class="message-wrapper">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">消息公告</block>
		</cu-custom>
		<sun-tab style="height: '44px'" class="message-tab" :value.sync="index" :tabList="tabList" defaultColor="#333333" activeColor="#5886fc"></sun-tab>
		<template v-if="index == 0">
			<view class="message-content">
				<view class="notice-item" v-for="item in notices" :key="item.id">
					<view class="notice-icon-wrapper">
						<image class="notice-icon" v-if="item.type == 'repair'" src="../../static/message/repair.png"></image>
						<image class="notice-icon" v-else src="../../static/message/sheet.png"></image>
					</view>

					<view class="notice-item-info">
						<!-- <view class="notice-item-name">{{item.source}}({{item.jobNumber}})</view> -->
						<view class="notice-item-title" v-if="item.type == 'worksheet'">新工单提醒</view>
						<view class="notice-item-title" v-else>新的检修任务提醒</view>
						<view class="notice-item-text">
							工号{{item.jobNumber}}{{item.source}}给你新派了一个
							<template v-if="item.type == 'worksheet'">工单</template>
							<template v-else>检修任务</template>
							，处理期限{{item.endTime}}。
						</view>
						<view class="notice-item-check">点击查看通知详情
							<image src="../../static/message/more.png" style="width: 24rpx;height: 24rpx;"></image>
						</view>
						<view class="notice-item-time">{{item.createTime}}</view>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="message-content">
				<view class="announcement-item" v-for="item in announcement" :key="item.id">
					<view class="announcement-time">{{item.time}}</view>
					<view class="announcement-info">
						<view class="announcement-top">
							<view class="notice-icon-wrapper">
								<image src="../../static/message/lingsheng.png" class="notice-icon"></image>
							</view>
							<view class="announcement-title">{{item.title}}</view>
						</view>
						<view class="announcement-text">
							{{item.content}}
							<view class="notice-item-check">
								点击查看通知详情
								<image src="../../static/message/more.png" style="width: 24rpx;height: 24rpx;"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>

	</view>
</template>

<script>
	import sunTab from '../../components/sun-tab/sun-tab.vue'
	export default {
		data() {
			return {
				index: 0,
				tabList: ['通知', '公告'], //普通数据赋值
				notices: [{
						id: '1',
						type: 'worksheet',
						source: '章三',
						jobNumber: 100102001,
						createTime: '2020-05-21 19:00',
						endTime: '2020年5月26日'
					},
					{
						id: '2',
						type: 'repair',
						source: '李四',
						jobNumber: 100102004,
						createTime: '2020-05-20 09:00',
						endTime: '2020年5月25日'
					},
					{
						id: '3',
						type: 'worksheet',
						source: '王五',
						jobNumber: 100102005,
						createTime: '2020-05-22 10:00',
						endTime: '2020年5月29日'
					},
					{
						id: '4',
						type: 'worksheet',
						source: '赵四',
						jobNumber: 100102006,
						createTime: '2020-05-28 11:00',
						endTime: '2020年10月2日'
					},
				],
				announcement: [
					{
						id: '1',
						time: '07月23日 09:00',
						title: '关于中秋节放假安排',
						content: '根据国务院办公厅通知精神，现将2020年端午节放假安排通知如下：6月18日（星期一）放假调休，与周末连休。'
					},
					{
						id: '2',
						time: '07月20日 09:00',
						title: '关于进一步加强和规范值班工作的通知',
						content: '为进一步加强和规范值班工作，切实改进工作作风，提高工作效率，结合城市管理工作世纪，现将有关事项通知。'
					},
					{
						id: '3',
						time: '05月23日 09:00',
						title: '关于端午节放假安排',
						content: '根据国务院办公厅通知精神，现将2020年端午节放假安排通知如下：2020年仲秋节、国庆节放假安排如下：10月1日（星期日）至10月8日（星期日）放假调休，共8天。9月30日（星期六）上班。'
					},
				]
				
			}
		},
		components: {
			sunTab
		},
		created() {
			console.log(this.CustomBar)
		},
		methods: {
			onChange() {

			}
		}
	}
</script>

<style>
	.message-tab{
		position: fixed;
		left: 0;
		right: 0;
		z-index: 99;
		
	}
	.message-content{
		padding: 64px 30rpx;
		overflow: hidden;
	}
	.notice-item {
		display: flex;
		width: 100%;
		font-family: GBK Regular;
		margin-bottom: 30rpx;
	}

	.notice-icon-wrapper {
		width: 80rpx;
		height: 80rpx;
		/* border: 1px solid #DBDCDD; */
		border-radius: 50%;
		box-shadow: 0 0 2px 0 #999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.notice-icon {
		width: 48rpx;
		height: 48rpx;
	}
	.notice-item-info{
		flex: 1;
		padding-left: 20rpx;
		border-bottom: 1px solid #eee;
		padding-bottom: 20rpx;
	}
	.notice-item-name {
		color: #333;
		font-size: 16px;
	}
	.notice-item-title{
		color: rgba(0,0,0,.8);
		font-size: 16px;
		font-weight: bold;
		margin-top: 20rpx;
	}
	.notice-item-text{
		font-size: 14px;
		color: #666;
		line-height: 20px;
		margin-top: 10rpx;
	}
	.notice-item-check{
		font-size: 14px;
		color: #333;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
	}
	.notice-item-time{
		font-size: 14px;
		color: #666;
		line-height: 20px;
		margin-top: 20rpx;
		text-align: right;
	}
	.announcement-time{
		width: 260rpx;
		margin: 0 auto;
		background: rgb(0,0,0,.3);
		border-radius: 8rpx;
		color: #fff;
		font-size: 14px;
		line-height: 50rpx;
		height: 50rpx;
		font-family: GBK Regular;
		text-align: center;
		margin-bottom: 80rpx;
	}
	.announcement-info{
		box-shadow: 0 0 12px #c2c2c2;
		padding: 20rpx;
		margin-bottom: 80rpx;
	}
	.announcement-top{
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
		padding-bottom: 20rpx;
	}
	.announcement-title{
		color: rgba(0,0,0,.8);
		font-size: 16px;
		font-weight: bold;
		flex: 1;
		padding-left: 30rpx;
	}
	.announcement-text{
		font-size: 14px;
		color: #666;
		line-height: 20px;
		padding-top: 40rpx;
	}
</style>
