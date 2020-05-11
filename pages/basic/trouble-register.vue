<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">故障登记</block>
		</cu-custom>
		<view class="new-trouble">
			<view class="register-content">
				<form>
					<view class="trouble-item trouble-item-name">
						<view class="trouble-name">
							故障名称
						</view>
						<input v-model="troubleName" class="uni-input" name="input" placeholderClass="input-placeholder" placeholder="请输入" />
					</view>
					<view class="trouble-item">
						<view class="trouble-name">
							故障等级
						</view>
						<radio-group class="radio-wrapper" @change="radioChange">
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
						<input v-model="lineStation" class="uni-input" name="input" placeholderClass="input-placeholder" placeholder="请输入" />
					</view>
					<view class="trouble-item trouble-item-name">
						<view class="trouble-name">
							设备
						</view>
						<input v-model="deviceName" class="uni-input" name="input" placeholderClass="input-placeholder" placeholder="请输入" />
					</view>
					<view class="trouble-item">
						<view class="trouble-name">
							故障内容
						</view>
						<textarea v-model="troubleText" style="height: 50px;margin-top: 10px;padding: 10px;font-size: 14px;color:#333;" placeholder-style="color:#999;font-size:14px;"
						 placeholder="请描述具体的故障内容!" />
						</view>
					<view class="trouble-item" style="border-bottom: 0;">
						<view class="trouble-name">
							附件内容
						</view>
						<view style="margin-top: 10px;">
							<ss-upload-image :limit="3" :header="headers" :url="url" :file-list="fileList" name="image" @on-success="onSuccess" @on-error="handleError"  />
						</view>
					</view>
				</form>
			</view>
			<view class="register-btn" @tap="submit">登记</view>
		</view>
	</view>
	
</template>

<script>
	import ssUploadImage from '@/components/ss-upload-image/ss-upload-image.vue'
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
				 troubleText: ''
			}
		},
		components: {
			ssUploadImage
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
				this.troubleLevel = v.detail.value
			},
			submit() {
				let str = ''
				if (!this.troubleName) {
					str = '请输入故障名称'
				} else if (!this.troubleLevel) {
					str = '请选择故障等级'
				} else if (!this.lineStation) {
					str = '请输入线路车站'
				} else if (!this.deviceName) {
					str = '请输入设备名称'
				} else if (!this.troubleText) {
					str = '请描述故障内容'
				}
				if (!str) {
					uni.showLoading({
					    title: '登记中'
					});
					setTimeout(function () {
					    uni.hideLoading();
						uni.navigateTo({
							url: '/pages/home/index',
							animationType: 'pop-in',
							animationDuration: 300
						});
					}, 2000);
					
				} else {
					uni.showToast({
						title: str,
						icon: 'none'
					})
				}
				
			}
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
	
</style>
