<template>
	<view>
		<view  class="page">
			<view style="flex: auto;">
				<cu-custom bgColor="bg-gradual-blue" :isManual="true" :isBack="true" @back="handleBack">
					<block slot="backText">返回</block>
					<block slot="content">转辙机维修过程</block>
				</cu-custom>
				<scroll-view scroll-x class="bg-white padding response cu-steps steps-bottom" :scroll-into-view="'scroll-' + scroll"
				 scroll-with-animation>
					<view class="cu-item padding-lr-xl" :class="index>scroll?'':'text-green'" v-for="(item,index) in stepList" :key="index"
					 :id="'scroll-' + index">
						{{item.stepName}} <text class="num" :data-index="index + 1"></text>
					</view>
				</scroll-view>
				<view class="cu-bar bg-white solid-bottom" style="margin-top: 20upx;">
					<view class="action">
						<text class="cuIcon-titles text-green"></text><text class="text-green">{{stepTitle}}</text> 
					</view>
				</view>
				
				<!-- 检测步骤 -->
				<block v-for="(item, index) in currentList" :key="index">
					<view class="cu-bar bg-white solid-bottom margin-top">
						<view class="action">
							<text class="cuIcon-title text-orange "></text> {{item.name}}
							<text class="lg text-gray cuIcon-question" @tap="showDesc(item.desc)"></text>
						</view>
						<view class="action" v-if="item.display == 'switch'">
							<switch :class="item.value?'checked':''" :checked="item.value" @change="switchChange($event, index)"></switch>
						</view>
					</view>
					<view class="cu-form-group" v-if="item.display == 'input'">
						<input placeholder="请填写检修后状态" name="input" v-model="item.value"></input>
					</view>
					
				</block>
			</view>
			



			<!-- 底部操作 -->
			<view class="action action-bottom">
				<button style="margin-right: 30upx;" v-if="scroll != 0" class="cu-btn bg-grey shadow" @tap="ScrollSteps('prev')">上一步</button>
				<button class="cu-btn bg-green shadow" @tap="ScrollSteps('next')">{{nextBtnText}}</button>
				<button style="margin-left: 30upx;" class="cu-btn bg-red shadow" @tap="saveSteps">保存</button>
			</view>

			
		</view>
		<!-- 详情弹窗 -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">详细描述</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{desc}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				desc: '',
				scroll: 0,
				stepList: [{
						stepName: '道岔外部方正检查',
						list: [{
								name: '螺丝、螺栓检查',
								display: 'switch',
								value: false,
								desc: '用手锤依电动转辙机底座、角钢、丁字铁、象鼻铁、调整杆、表示连接杆、尖端杆的顺序检查，紧固螺母，螺栓不得低于螺母顶面。'
							},
							{
								name: '机壳检查',
								display: 'switch',
								value: false,
								desc: '电缆盒检查, 基础完整，不倾斜，代号清晰，培土良好，无杂草，箱(盖)无裂纹。 盘根良好，箱内配线整齐，螺母、垫片齐全紧固，线头牢固，箱内整洁。箱内二极管固定良好，无过热现象。'
							},
							{
								name: '安装方正检查',
								display: 'switch',
								value: false,
								desc: '角钢安装装置方正，无裂纹，螺栓紧固。附有绝缘各处，安装完整，不破损，性能良好。'
							},
							{
								name: '各类杆件检查',
								display: 'switch',
								value: false,
								desc: '密贴调整杆和表示连接杆、尖端杆的连接销开口销齐全；劈开角度为60°-90°。主轴、动作杆及移位接触器检查, 各孔内不得有铁屑及杂物，挤切销应固定在齿条块圆孔内的台上，不得顶住或压住动作杆。'
							}
						]
					},
					{
						stepName: '转辙机内部检查',
						list: [{
								name: '开口检查-定位检查',
								display: 'input',
								value: '',
								desc: '开口量测试，开口量值为152±3mm 左右偏差小于2mm'
							},{
								name: '开口检查-反位检查',
								display: 'input',
								value: '',
								desc: '开口量测试，开口量值为152±3mm 左右偏差小于2mm'
							},
							{
								name: '机内配线',
								display: 'switch',
								value: false,
								desc: '引出线头无假焊、断股，线头不松动；'
							},
							{
								name: '电机',
								display: 'switch',
								value: false,
								desc: '电搬动作中听有无过大噪音，并检查电机无过大火花.'
							},
							{
								name: '传动装置',
								display: 'switch',
								value: false,
								desc: '减速器检查, 壳无裂纹，安装牢固。转动灵活无异声。摩擦连结器检查转动灵活无异声, 摩擦带与内齿轮伸出部分应保持清洁，不得有油垢。摩擦调整簧无磨卡，有弹力，弹簧各圈间最小间隙应不小于1.5mm。摩擦力调整适当，手摇转换时不空转。锁闭齿轮圆弧与齿条块削尖齿圆弧应吻合，检查锁闭圆弧面有无拉伤。连接器件检查, 开口销齐全，焊接部分无脱焊，铆接良好，活动部分适当注油'
							},
							{
								name: '自动开闭器',
								display: 'switch',
								value: false,
								desc: '16.动、静接点检查,动、静接点安装紧固，接触良好；深度不小于4mm；用手搬动动接点摆动量不大于3.5mm，接点接触压力不小于4.0N；接点片无严重磨损，压力适当，胶木无裂纹；配线整齐，无断股，线头不松动'
							},
							{
								name: '遮断器',
								display: 'switch',
								value: false,
								desc: '17.速动爪与速动片检查, 速动爪与速动片应有间隙，解锁时为0.5～1mm，锁闭时为1～3mm；滚轮轴不松动，传动中应在起动片上滚动，落下后不打底，距起动片缺口底部不小于 0.5mm。'
							},
							{
								name: '移位接触器',
								display: 'switch',
								value: false,
								desc: '拉簧检查, 拉簧作用良好，在动作杆和表示杆正常出入时，动接点在静接点组内，迅速转接并带动检查柱上升或落下。'
							},
							{
								name: '手摇转辙机检查',
								display: 'switch',
								value: false,
								desc: '操作转辙机前应断开转辙机动作电源。 各杆与基本轨相垂直不磨卡；各丝扣余量不小于10mm，密贴杆空动游间不小于5mm；防松铁线完整，开口销齐全完好；杆件的直径磨耗减少量不得超过1/10。注意检查时勿用手扶基本轨，以防被尖轨夹伤。8.摇动时，转子、定子不磨卡；清擦流面，换向器表面无氧化层；绝缘槽无烧痕，无炭粉，片间绝缘物不高出换向器弧面。21.擦拭,用手摇动转辙机将动接点至于两静接点组之间，擦拭并调整自动开闭器静接点、动接点。用食指持鹿皮压紧电机换向器，擦拭换向器，转动擦一周后，再反向擦一周'
							}
						]
					},
					{
						stepName: '转辙机动态检测',
						list: [{
								name: '密贴检查-4mm不锁闭-定位检查',
								display: 'switch',
								value: false,
								desc: '26.试验道岔密贴状态。在动作杆密贴处插入道岔密贴检查尺4mm，道岔不锁闭；在动作杆密贴处插入道岔密贴检查尺 2mm，道岔应锁闭.'
							},{
								name: '密贴检查-4mm不锁闭-反位检查',
								display: 'switch',
								value: false,
								desc: '26.试验道岔密贴状态。在动作杆密贴处插入道岔密贴检查尺4mm，道岔不锁闭；在动作杆密贴处插入道岔密贴检查尺 2mm，道岔应锁闭.'
							},{
								name: '密贴检查-2mm锁闭-定位检查',
								display: 'switch',
								value: false,
								desc: '26.试验道岔密贴状态。在动作杆密贴处插入道岔密贴检查尺4mm，道岔不锁闭；在动作杆密贴处插入道岔密贴检查尺 2mm，道岔应锁闭.'
							},{
								name: '密贴检查-2mm锁闭-反位检查',
								display: 'switch',
								value: false,
								desc: '26.试验道岔密贴状态。在动作杆密贴处插入道岔密贴检查尺4mm，道岔不锁闭；在动作杆密贴处插入道岔密贴检查尺 2mm，道岔应锁闭.'
							},
							{
								name: '表示缺口检查-定位检查）',
								display: 'switch',
								value: false,
								desc: '28.表示杆检查,查柱落入检查块时的缺口间隙为 1.5±0.5mm。主、副表示杆横穿螺栓不松动，连接铁固定良好，后盖紧固。'
							},
							{
								name: '表示缺口检查-反位检查）',
								display: 'switch',
								value: false,
								desc: '28.表示杆检查,查柱落入检查块时的缺口间隙为 1.5±0.5mm。主、副表示杆横穿螺栓不松动，连接铁固定良好，后盖紧固。'
							},
							{
								name: '尖轨和基本轨检查',
								display: 'switch',
								value: false,
								desc: '尖轨与基本轨密贴良好，压力适当'
							},
							{
								name: '工作电压160V～230VDC-定位测量',
								display: 'input',
								value: '',
								desc: '25.试验、测试（用万用表测试）,工作电压,DC160V。工作电流≤2.0A。 摩擦电流2.3~2.9A 并把测试值记录到检修表格中。'
							},
							{
								name: '工作电压160V～230VDC-反位测量',
								display: 'input',
								value: '',
								desc: '25.试验、测试（用万用表测试）,工作电压,DC160V。工作电流≤2.0A。 摩擦电流2.3~2.9A 并把测试值记录到检修表格中。'
							},
							{
								name: '工作电流≤2A-定位测量',
								display: 'input',
								value: '',
								desc: '25.试验、测试（用万用表测试）,工作电压,DC160V。工作电流≤2.0A。 摩擦电流2.3~2.9A 并把测试值记录到检修表格中。'
							},
							{
								name: '工作电流≤2A-反位测量',
								display: 'input',
								value: '',
								desc: '25.试验、测试（用万用表测试）,工作电压,DC160V。工作电流≤2.0A。 摩擦电流2.3~2.9A 并把测试值记录到检修表格中。'
							},
							{
								name: '摩擦电流2.3～2.9A-定位测量）',
								display: 'input',
								value: '',
								desc: '25.试验、测试（用万用表测试）,工作电压,DC160V。工作电流≤2.0A。 摩擦电流2.3~2.9A 并把测试值记录到检修表格中。'
							},
							{
								name: '摩擦电流2.3～2.9A-反位测量）',
								display: 'input',
								value: '',
								desc: '25.试验、测试（用万用表测试）,工作电压,DC160V。工作电流≤2.0A。 摩擦电流2.3~2.9A 并把测试值记录到检修表格中。'
							},
							{
								name: '移位接触器试验-定位试验',
								isYear: true,
								display: 'switch',
								value: false,
								desc: '15.顶杆与移位接触器的触头间隙为1.5mm时，接点不应断开；用2.5mm 垫片试验或用备用销带动道岔试验时，移位接触器接点应断开，非经人工恢复不得接通电路；其“复位按扭”在所加外力复位过程中不得引起接点簧片变形。'
							},
							// {
							// 	name: '移位接触器试验-反位试验',
							// 	isYear: true,
							// 	display: 'switch',
							// 	value: false,
							// 	desc: '15.顶杆与移位接触器的触头间隙为1.5mm时，接点不应断开；用2.5mm 垫片试验或用备用销带动道岔试验时，移位接触器接点应断开，非经人工恢复不得接通电路；其“复位按扭”在所加外力复位过程中不得引起接点簧片变形。'
							// }
						]
					},
					{
						stepName: '清扫养护',
						list: [{
							name: '清扫注油',
							display: 'switch',
							value: false,
							desc: '7.用钢丝刷和毛刷清扫各部螺丝扣并注油，做到清洁、油润。22.清扫, 使用手摇把摇动转辙机，用干净的布擦拭锁闭齿轮、削尖齿23.注油, 用油壶给锁闭齿轮启动齿两侧圆弧、削尖齿圆弧涂油，涂油应均匀全面。擦净速动片缺口，用油壶给速动片两侧注油孔各注一滴油；转辙机内部及外部的零部件的裸露加工面、动作杆、表示杆应适当注油。'
						}]
					},
					// {
					// 	stepName: '年检',
					// 	isYear: true,
					// 	list: [{
					// 			name: '挤切销更换',
					// 			desc: '更换挤切削',
					// 			display: 'switch',
					// 			value: false
					// 		},
					// 		{
					// 			name: '设备整治（填写更换的部件）',
					// 			display: 'input',
					// 			value: '',
					// 			desc: '10.检查炭刷，炭刷于握盒内上下不卡阻，弹簧压力适当，炭刷磨耗后不小于9mm(全长15mm×3/5)，接触面积不少于炭刷面积3/4。30.检查道岔绝缘情况，如绝缘不良，则更换道岔绝缘31.检查转辙机盖上印字是否清晰，不清晰则需重新喷漆32.检查配线端子对地绝缘电阻值，应小于4欧'
					// 		}
					// 	]
					// }
				],
				step: null,
				id: null,
				storageList: []
			}
		},
		computed: {
			stepTitle() {
				console.log(this.scroll)
				return this.stepList[this.scroll].stepName
			},
			currentList() {
				return this.stepList[this.scroll].list
			},
			nextBtnText() {
				if (this.scroll == this.stepList.length - 1) {
					return '提交'
				}
				return '下一步'
			}

		},
		onLoad(option) {
			this.step = option.step
			this.id = option.id
			this.scroll = parseInt(this.step) - 1
			let storageSetting = this._getStorage('switch-task-' + this.id)
			if (storageSetting) {
				this.stepList = storageSetting.storageList
				this.scroll = this.step == 1 ? 0 : storageSetting.curStep
			}
			console.log(storageSetting)
		},
		methods: {
			ScrollSteps(type) {
				if (type == 'prev') {
					this.scroll--
					
				} else {
					this._setStorage()
					this._validateInput().then(flag => {
						if (!flag) {
							uni.showToast({
								title:'填写内容不能为空',
								icon: 'none',
								duration: 1000
							})
							return
						}
						if (this.scroll == this.stepList.length - 1) {
							uni.navigateTo({
								url:'./result?id=' + this.id
							})
						} else {
							this.scroll++
						}
					})
				
				}
			},
			saveSteps() {
				this._setStorage()
			},
			_setStorage() {
				let key = 'switch-task-' + this.id
				this.stepList.forEach((item, index) => {
					if (this.scroll == index) {
						this.storageList[this.scroll] = {stepName: this.stepTitle, list: this.currentList}
					} else {
						this.storageList[index] = item
					}
				})
				let data = {
					curStep: this.scroll,
					id: this.id,
					storageList: this.storageList
					
				}
				console.log(data)
				this.$storage.setStorage(key, data)
			},
			_getStorage(key) {
				let data = this.$storage.getStorage(key)
				if (!data) {
					return null
				} else {
					return data
				}
			},
			switchChange(e, index) {
				console.log(e, index)
				let value = e.detail.value
				this.currentList[index].value = value;
			},
			showDesc(desc) {
				this.desc = desc
				this.modalName = 'Modal'
			},
			hideModal() {
				this.modalName = null
			},
			_validateInput() {
				return new Promise(resolve => {
					let flag = true
					this.currentList.forEach(item => {
						if (item.display == 'input' && !item.value) {
							flag = false
						}
					})	
					resolve(flag)
				})
		
			},
			handleBack() {
				uni.navigateTo({
					url: '/pages/basic/switch-machine'
				})
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		/* box-sizing: border-box;
		padding-bottom: 150upx; */
	}
	.action-bottom {
		flex-shrink: 0;
		padding: 30upx 0;
		display: flex;
		justify-content: center;
		/* position: fixed;
		bottom: 40upx;
		left: 0;
		right: 0;
		text-align: center;
		z-index: 99; */
	}
	.uni-input-placeholder{
		color: grey;
	}
</style>
