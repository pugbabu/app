<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">综合监测</block>
		</cu-custom>
		<easy-skeleton SkelttionType="prouct" v-show="hasSkelettion"></easy-skeleton>
		<view v-show="!hasSkelettion">
			<view class="report-wrapper">
				<view class="qiun-columns">
					<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
						<view class="qiun-title-dot-light">报警等级</view>
					</view>
					<view class="qiun-charts"><canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas></view>
				</view>
				<view class="qiun-columns">
					<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
						<view class="qiun-title-dot-light">1号线设备故障比例</view>
					</view>
					<view class="qiun-charts"><canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas></view>
				</view>
				<view class="qiun-columns">
					<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
						<view class="qiun-title-dot-light">历年ATS与CC故障</view>
					</view>
					<view class="qiun-charts"><canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas></view>
				</view>
			</view>
		</view>
	
		
	</view>

</template>

<script>
	import {mapState} from "vuex";
	import uCharts from '@/components/leiqch-ucharts/js/u-charts.js';
	var _self;
	var canvaPie = null;

	export default {
		computed: {
			...mapState({
				isLoading: 'isLoading'
			})
		},
		data() {
			return {
				hasSkelettion: true,
				canvasRing: null,
				canvasPie: null,
				canvasColumn: null,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				ringData: {
					series: [{
							name: '一级报警',
							data: 17
						},
						{
							name: '二级报警',
							data: 29
						},
						{
							name: '三级报警',
							data: 24
						},
						{
							name: '四级报警',
							data: 21
						},
					]
				},
				pieData: {
					series: [{
							name: '板卡故障',
							data: 50
						},
						{
							name: 'ATO故障',
							data: 30
						},
						{
							name: 'AB系网故障',
							data: 20
						},
						{
							name: '通信故障故障',
							data: 18
						},
						{
							name: '电源屏显示故障',
							data: 8
						}
					]
				},
				columnData: {
					categories: ['2013', '2014', '2015', '2016', '2017', '2018'],
					series: [{
							name: 'ATS',
							data: [45, {
								value: 40,
								color: '#f04864'
							}, 37, 34, 23, 15]
						},
						{
							name: 'CC',
							data: [34, {
								value: 30,
								color: '#facc14'
							}, 25, 20, 18, 14]
						}
					]
				}
			};
		},
		
		onReady() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			setTimeout(() => {
				this.hasSkelettion = false
				this.init();
			}, 1000)
			// this.getServerData();
		},
		methods: {
			init() {
				this.showPie('canvasPie', this.pieData);
				this.showColumn('canvasColumn', this.columnData);
				this.showRing('canvasRing', this.ringData);
				// setTimeout(() => {
				// 	this.$store.commit('hideLoading')
				// }, 1000)
			},
			showRing(canvasId, chartData) {
				this.canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: true,
					// title: {
					// 	name: '70%',
					// 	color: '#7cb5ec',
					// 	fontSize: 25 * _self.pixelRatio,
					// 	offsetY: -20 * _self.pixelRatio
					// },
					// subtitle: {
					// 	name: '收益率',
					// 	color: '#666666',
					// 	fontSize: 15 * _self.pixelRatio,
					// 	offsetY: 30 * _self.pixelRatio
					// },
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 40 * _self.pixelRatio,
							labelWidth: 15
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true
				});
			},
			touchRing(e) {
				this.canvaRing.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data;
					}
				});
			},
			showPie(canvasId, chartData) {
				this.canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							lableWidth: 15
						}
					}
				});
			},
			touchPie(e) {
				this.canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data;
					}
				});
			},
			showColumn(canvasId, chartData) {
				this.canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: {
						show: true
					},
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: (_self.cWidth * _self.pixelRatio * 0.45) / chartData.categories.length
						}
					}
				});
			},

			touchColumn(e) {
				this.canvaColumn.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value;
						} else {
							return category + ' ' + item.name + ':' + item.data;
						}
					}
				});
			}
		}
	};
</script>

<style>


.qiun-padding {
	padding: 2%;
	width: 96%;
}
	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
		margin-bottom: 10rpx;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #ffffff;
	}

	.qiun-title-bar {
		/* width: 96%; */
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000;
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}
</style>
