<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed cu-bar-h" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view class="content" :style="[{top:StatusBar  + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// #ifdef APP-PLUS
				StatusBar: this.StatusBar ? this.StatusBar : 40,
				CustomBar: this.CustomBar ? this.CustomBar : 90
				// #endif
				// #ifdef H5
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
				// #endif
			
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				console.log(StatusBar, CustomBar, 'CustomBar')
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			isManual: {
				type: [Boolean, String],
				default: false
			}
		},
		methods: {
			BackPage() {
				if (this.isManual) {
					this.$emit('back')
				} else {
					console.log(uni)
					uni.navigateBack({
						delta: 1
					});
				}
			
			}
		}
	}
</script>

<style>
.cu-custom{
	height: 45px;
}
.cu-bar-h{
	height: 45px;
}
</style>
