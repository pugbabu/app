<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">故障登记</block>
		</cu-custom>
		<easy-skeleton SkelttionType="prouct" v-show="hasSkelettion"></easy-skeleton>
		<view class="new-trouble" v-show="!hasSkelettion">
			<view class="register-content">
				<form>
					<view class="trouble-item trouble-item-name">
						<view class="trouble-name">
							故障名称
						</view>
						<input v-model="form.troubleName" class="uni-input" name="input" placeholderClass="input-placeholder" placeholder="请输入" />
					</view>
					<view class="trouble-item">
						<view class="trouble-name">
							故障等级
						</view>
						<radio-group class="radio-wrapper" @change="radioChange" v-model="form.troubleLevel">
							<label for="level1" class="label-item">
								<radio value="level1" :checked="troubleLevel === 'level1'" class="label-item-radio" style="transform:scale(0.7)"></radio>
								<text style="font-size: 14px;color: #333;">一级</text>
							</label>
							<label for="level2" class="label-item">
								<radio value="level2" :checked="troubleLevel === 'level2'" class="label-item-radio" style="transform:scale(0.7)"></radio>
								<text style="font-size: 14px;color: #333;">二级</text>
							</label>
							<label for="level2" class="label-item">
								<radio value="level3" :checked="troubleLevel === 'level3'" class="label-item-radio" style="transform:scale(0.7)"></radio>
								<text style="font-size: 14px;color: #333;">三级</text>
							</label>
						</radio-group>

					</view>
					<view class="trouble-item trouble-item-name">
						<view class="trouble-name">
							线路车站
						</view>
						<input v-model="form.lineStation" class="uni-input" name="input" placeholderClass="input-placeholder" placeholder="请输入" />
					</view>
					<view class="trouble-item trouble-item-name">
						<view class="trouble-name">
							设备
						</view>
						<input v-model="form.deviceName" class="uni-input" name="input" placeholderClass="input-placeholder" placeholder="请输入" />
					</view>
					<view class="trouble-item">
						<view class="trouble-name">
							故障描述
						</view>
						<textarea v-model="form.troubleText" style="height: 50px;margin-top: 10px;padding: 10px;font-size: 14px;color:#333;"
						 placeholder-style="color:#999;font-size:14px;" placeholder="请描述具体的故障内容!" />
						</view>
					<view class="trouble-item" style="border-bottom: 0;">
						<view class="trouble-name">
							图片上传
						</view>
						<view style="margin-top: 10px;">
								<view class="grid col-4 grid-square flex-sub">
									<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
									 <image :src="item.path" mode="aspectFill"></image>
									<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
										<text class='cuIcon-close'></text>
									</view>
									</view>
									<view class="solids" @tap="ChooseImage" v-if="imgList.length < imgCount">
										<text class='cuIcon-cameraadd'></text>
									</view>
								</view>
								<view class="text-orange">
									Tip: 最多支持上传{{imgCount}}张图片
								</view>
							<!-- <ss-upload-image :limit="3" :header="headers" :url="url" :file-list="fileList" name="image" @on-success="onSuccess" @on-error="handleError"  /> -->
						</view>
					</view>
				</form>
			</view>
			<view class="register-btn" :class="{'register-btn-gray': isRegistering}" @tap="submit">登记</view>
		</view>
	</view>
	
</template>

<script>
	// import ssUploadImage from '@/components/ss-upload-image/ss-upload-image.vue'
	import request from '@/js_sdk/bjx-request/index.js'
	export default {
		data() {
			return {
				url: 'https://api.motherbuy.com/decorate/upload/img',
				fileList: [],
				headers: {
					userLoginId: '287da7dc209d9224a22c4700cc1c9777'
				 },
				 oss: 'http://oss.motherbuy.com/',
				 troubleName: '',
				 troubleLevel: '',
				 lineStation: '',
				 deviceName: '',
				 troubleText: '',
				 hasSkelettion: true,
				 form: {
					troubleName: '', // 故障名称
					troubleLevel: '', // 故障等级
					lineStation: '', // 故障车站
					deviceName: '', // 故障设备
					troubleText: '' ,// 故障内容
				 },
				 imgList: [],
				 imgCount: 9,
				 isRegistering: false,
				 filePath: '',
				 img: []
			}
		},
		created() {
			console.log(this.StatusBar, this.CustomBar, '高度')
		},
		onReady() {
			setTimeout(() => {
				this.hasSkelettion = false
			}, 500)
		},
		onUnload() {
			console.log('onUnload')
			uni.hideLoading()
		},
		methods: {
			onSuccess(res) {
				console.log(res)
				if (res.code == 500) {
					uni.showToast({
						title: res.message,
						icon: 'none'
					})
					return
				}
				let img = this.oss + res.data;
				this.fileList.push(img)
				
			},
			handleError(e) {
				uni.showToast({
					title: '图片上传失败',
					icon: 'none'
				})
			},
			radioChange(v) {
				this.form.troubleLevel = v.detail.value
			},
			submit() {
				console.log('testttt')
				if (this.isRegistering) {
					return
				}
				let str = ''
				if (!this.form.troubleName) {
					str = '请输入故障名称'
				} else if (!this.form.troubleLevel) {
					str = '请选择故障等级'
				} else if (!this.form.lineStation) {
					str = '请输入线路车站'
				} else if (!this.form.deviceName) {
					str = '请输入设备名称'
				} else if (!this.form.troubleText) {
					str = '请描述故障内容'
				}
				console.log(str, 'strrrrrrrrrrrrr')
				let imgs = []
				for (let i = 0 ; i < this.imgList.length; i++) {
					let obj = {}
					obj.name = 'file' + i
					obj.uri = this.imgList[i].path
					imgs.push(obj)
					obj = null
				}
				if (!str) {
					uni.showLoading({
					    title: '登记中'
					});
					this.isRegistering = true
					this.form.sessionId = this.$storage.getStorage('sessionId')
					this.$store.dispatch('registerTrouble', {
						url: `${this.$config.requestURL}/common/upload/doRepair`,
						files: imgs,
						formData: this.form,
						fileType: 'image',
						// filePath: this.filePath[0],
						// name: 'file'
						
					}).then(res => {
						res = JSON.parse(res[1].data)
						this.isRegistering = false
						uni.hideLoading()
						console.log(res)
						if (res.code == 200) {
							uni.showToast({
								icon:'none',
								title: '登记成功'
							})
							setTimeout(function () {
								uni.navigateTo({
									url: '/pages/home/index',
									animationType: 'pop-in',
									animationDuration: 300
								});
							}, 500);
							
						}
					}).catch(err => {
						uni.showLoading({
						    title: '出错了~'
						});
						setTimeout(() => {
							uni.hideLoading()
						}, 500)
						this.isRegistering = false
						
					})
				
					
				} else {
					uni.showToast({
						title: str,
						icon: 'none'
					})
				}
				
			},
			ChooseImage() {
				uni.chooseImage({
					count: this.imgCount, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFiles)
							// this.form.imageData = this.form.imageData.concat(res.tempFiles)
						} else {
							this.imgList = res.tempFiles
							// this.form.imageData = res.tempFiles
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '',
					content: '确定要删除这张照片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							// this.form.imageData.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
		}
	}
</script>

<style>
	page{
		background: #f7f8fa;
	}
	.register-btn{
		position: fixed;
		bottom: 30px;
		width: 500rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		color: #FFFDEF;
		background: #5886fc;
		height: 40px;
		border-radius: 20px;
		font-size: 16px;
		font-family: GBK Regular;
		line-height: 40px;
	}
	.register-content{
		width: 660rpx;
		margin: 0 auto;
		margin-top: 40upx;
		box-sizing: border-box;
		background: #fff;
		box-shadow: 0 0 3px #C2C2C2;
		border-radius: 6px;
		padding: 30rpx;
	}
	.trouble-name{
		font-size: 14px;
		color: #999;
		font-family: GBK Regular;
	}
	.trouble-item{
		border-bottom: 1px solid #eee;
		padding-bottom: 20rpx;
		margin-bottom: 30rpx;
	}
	.trouble-item-name{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.uni-input{
		text-align: right;
		color: #333;
		font-size: 14px;
	}
	.input-placeholder{
		color: #999;
		font-size: 14px;
		text-align: right;
	}
	.radio-wrapper{
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
		padding-right: 20rpx;
		
	}
	.register-btn-gray{
		background-color: #f0f0f0;
		color: #333333;
	}
	
</style>
