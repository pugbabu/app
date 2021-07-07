<template>
	<view class="my-register-trouble">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">故障登记列表</block>
		</cu-custom>
		<view v-if="!troubleList.length && hasLoaded">
			<no-data text="暂无登记内容"></no-data>
		</view>
		<view class="register-trouble-list" v-else>
			<view class="register-trouble" v-for="(item, index) in troubleList" :key="index">
				<view class="register-trouble-title cu-item">
					<text class="text-black">{{item.troubleName}}</text>
					<view class="action">
						<view class="cu-tag round light" :class="hanldeRepairStatus(item.repairStatus)">{{item.repairStatus}}</view>
					</view>
				</view>
				<view class="trouble-flex-item margin-top margin-bottom text-grey">
					<text>故障等级</text>
					<text>{{item.troubleLevel | troubleFilter}}</text>
				</view>
				<view class="trouble-flex-item margin-top margin-bottom text-grey">
					<text>登记时间</text>
					<text>{{item.createTime}}</text>
				</view>
				<view class="trouble-item-action">
					<view class="cu-btn round bg-orange light" @click="toTroubleDetail(item)">查看详情</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				troubleList: [
					// {
					// 	troubleName: '阀门关不牢',
					// 	troubleLevel: 'level1',
					// 	lineStation: '1号线江陵路站',
					// 	deviceName: '转辙机',
					// 	troubleText: '故障内容信息',
					// 	time: '2020-05-20',
					// 	status: '未处理'
					// },
					// {
					// 	troubleName: '阀门关不牢',
					// 	troubleLevel: 'level1',
					// 	lineStation: '1号线江陵路站',
					// 	deviceName: '转辙机',
					// 	troubleText: '故障内容信息',
					// 	time: '2020-05-21',
					// 	status: '已处理'
					// }
				],
				hasLoaded: false
			}
		},
		created() {
			this.getMyTroubles()
		},
		methods: {
			toTroubleDetail(item) {
				uni.navigateTo({
					url:'/pages/basic/trouble-detail?id=' + item.fileId
				})
			},
			getMyTroubles() {
				uni.showLoading({
					title: '加载中'
				})
				this.$store.dispatch('getTtroubles', {
					url: '/portal/biRepairList2App.action',
					data: {
						sessionId: this.$storage.getStorage('sessionId')
					}
				}).then(res => {
					uni.hideLoading()
					this.troubleList = res.data
					this.hasLoaded = true
				}).catch(err => {
					this.hasLoaded = true
				})
			},
			hanldeRepairStatus(status) {
				switch(status) {
					case '未检修':
						return 'bg-blue';
					case '检修未通过':
						return 'bg-red';
					case '检修通过':
						return 'bg-green'
					default:
						return ''
				}
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
	.register-trouble-list{
		padding: 0 30upx;
		padding-top: 40upx;
	}
	.register-trouble{
		box-sizing: border-box;
		background: #fff;
		box-shadow: 0 0 6upx #C2C2C2;
		border-radius: 10upx;
		padding: 0 20upx;
		margin-bottom: 20upx;
		padding-bottom: 20upx;
	}
	.register-trouble-title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		border-bottom: 1px dashed #DBDCDD;
		font-size: 30upx;
		font-weight: 600;
		color: #333333;
	}
	.trouble-flex-item{
		display: flex;
		justify-content: space-between;
	}
	.trouble-item-action{
		display: flex;
		justify-content: flex-end;
	}
</style>
