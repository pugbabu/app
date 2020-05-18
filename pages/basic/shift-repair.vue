<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">工班检修任务</block>
		</cu-custom>
		<easy-skeleton SkelttionType="prouct" v-if="hasSkelettion"></easy-skeleton>
		<view class="shift-wrapper" v-else>
			<view class="shift-content">
				<view class="shift-item" v-for="item in shifts" :key="item.id">
					<view class="shit-item-name">{{item.name}}</view>
					<view style="border-bottom: 1px solid #eee;">
						<view class="shift-item-info">
							<view class="shift-item-left">
								<image src="/static/shift/xianlu.png" style="width: 40rpx;height: 40rpx;"></image>
								<view class="shift-item-left-label">所属线路</view>
							</view>
							<view class="shift-item-right">{{item.line}}</view>
						</view>
						<view class="shift-item-info">
							<view class="shift-item-left">
								<image src="/static/shift/chezhan.png" style="width: 40rpx;height: 40rpx;"></image>
								<view class="shift-item-left-label">所属车站</view>
							</view>
							<view class="shift-item-right">{{item.station}}</view>
						</view>
						<view class="shift-item-info">
							<view class="shift-item-left">
								<image src="/static/shift/zhuanye.png" style="width: 40rpx;height: 40rpx;"></image>
								<view class="shift-item-left-label">所属专业</view>
							</view>
							<view class="shift-item-right">{{item.major}}</view>
						</view>
						<view class="shift-item-info">
							<view class="shift-item-left">
								<image src="/static/shift/zhouqi.png" style="width: 40rpx;height: 40rpx;"></image>
								<view class="shift-item-left-label">检修周期</view>
							</view>
							<view class="shift-item-right">{{item.cycle}}</view>
						</view>
						<view class="shift-item-info">
							<view class="shift-item-left">
								<image src="/static/shift/riqi.png" style="width: 40rpx;height: 40rpx;"></image>
								<view class="shift-item-left-label">检修日期</view>
							</view>
							<view class="shift-item-right">{{item.date}}</view>
						</view>
					</view>
					<view class="shift-item-button">
						<button type="primary" @tap="getTask">领取</button>
					</view>
				</view>
			</view>
			<!-- <uni-popup ref="popup" type="center">底部弹出 Popup</uni-popup> -->
			<transition name="fade">
				<view class="task-modal" v-if="taskModal">
					<view class="mask"></view>
					<view class="modal-content">
						<view class="modal-title">任务领取</view>
						<view class="task-content">
							<view class="task-item task-item-disabled">
								<view class="label">计划完成时间</view>
								<view class="label-text">2019.07.20</view>
							</view>
							<view class="task-item task-item-disabled">
								<view class="label">巡检员</view>
								<view class="label-text">张三1062262</view>
							</view>
							<view class="task-item ">
								<view class="label">辅检员</view>
								<view class="label-text">
								</view>
							</view>
							<view class="task-item ">
								<view class="label">安全员</view>
								<view class="label-text">
								</view>
							</view>
						</view>
						<view class="task-btns">
							<view class="task-btn-close" @tap="taskModal=false">
								<image src="/static/shift/close.png"></image>
							</view>
							<view class="task-btn-close" @tap="confirm">
								<image src="/static/shift/confirm.png"></image>
							</view>
						</view>
					</view>
				</view>
			</transition>

		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				taskModal: false,
				shifts: [{
						id: '1',
						name: 'C出口售票机检修',
						line: '1号线',
						station: '江陵路站',
						major: '通信专业',
						cycle: '日期',
						date: '2019-06-26',
						icon: ''
					},
					{
						id: '2',
						name: '18-24号车厢空调检修',
						line: '1号线',
						station: '西兴路站',
						major: '通信专业',
						cycle: '日期',
						date: '2019-06-26',
						icon: ''
					},
					{
						id: '3',
						name: 'C出口电梯扶梯检修',
						line: '1号线',
						station: '火车东站',
						major: '通信专业',
						cycle: '日期',
						date: '2019-06-26',
						icon: ''
					},
					{
						id: '4',
						name: '语音广播检修',
						line: '1号线',
						station: '九和路站',
						major: '通信专业',
						cycle: '日期',
						date: '2019-06-26',
						icon: ''
					}
				],
				hasSkelettion: true
			}
		},
		onReady() {
			setTimeout(() => {
				this.hasSkelettion = false
			}, 500)
		},
		methods: {
			getTask() {
				this.taskModal = true
			},
			confirm() {
				this.taskModal = false
				uni.navigateTo({
					url: '../success/success'
				})
			}
		}
	}
</script>

<style>
	.shift-wrapper {
		padding: 20rpx 40rpx 40rpx 40rpx;
	}

	.shift-head {
		display: flex;
		justify-content: space-between;
		color: #fff;
		font-family: GBK Regular;
		align-items: center;
		opacity: 0.8;
		padding-bottom: 20rpx;
	}

	.shift-title {
		font-size: 20px;
	}

	.shift-filter {
		display: flex;
		align-items: center;
		font-size: 14px;
	}

	.shift-item {
		background: #fff;
		border-radius: 14rpx;
		margin-bottom: 40rpx;
		padding: 30rpx;
	}

	.shit-item-name {
		font-size: 20px;
		font-weight: 500;
		color: #000;
		font-family: GBK Regular;
		margin-bottom: 10rpx;
	}

	.shift-item-info {
		display: flex;
		justify-content: space-between;
		height: 70rpx;
	}

	.shift-item-left {
		display: flex;
		color: #666;
		font-size: 14px;
		align-items: center;
	}

	.shift-item-left-label {
		margin-left: 20rpx;
	}

	.shift-item-right {
		color: #333;
		font-size: 14px;

	}

	.shift-item-button {
		overflow: hidden;
		padding-top: 20rpx;
	}

	.shift-item-button button {
		background: #5886fc;
		float: right;
		width: 160rpx;
		border-radius: 15px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
	}

	.task-modal {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .3);
	}

	.modal-content {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%, -50%, 0);
	}

	.modal-title {
		color: #fff;
		text-align: center;
	}

	.task-content {
		background: #fff;
		width: 600rpx;
		box-sizing: border-box;
		/* height: 200px; */
		border-radius: 26rpx;
		margin-top: 20px;
		padding: 40rpx;
	}

	.task-item {
		background: #fff;
		height: 70rpx;
		display: flex;
		border-radius: 10rpx;
		justify-content: space-between;
		margin-bottom: 30rpx;
		font-size: 14px;
		line-height: 70rpx;
		padding: 0 30rpx;
		color: #666;
		border: 1px solid #DBDCDD;
	}

	.task-item-disabled {
		background: #DBDCDD;
	}

	.task-btns {
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
	}

	.task-btn-close {
		background: #fff;
		border-radius: 50%;
		width: 60rpx;
		height: 60rpx;
		border: 6px solid #EEEEEE;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 40rpx;
	}

	.task-btns image {
		width: 40rpx;
		height: 40rpx;
	}


	.fade-enter,
	.fade-leave {
		opacity: 0;
	}

	.fade-enter-active {
		opacity: 1;
	}

	.fade-leave-active {
		opacity: 0;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s;
	}
</style>
