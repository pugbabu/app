<template>
	<view class="cu-bar bg-white solid-bottom">
		<view class="action">
			<text class="cuIcon-titles text-green"></text> 
			<view
				v-for="(d, index) in directories" 
				:key="index" 
				class="text-green" 
				:class="{'dir': d.fileId != '0', 'text-gray': index == directories.length - 1 && d.fileId != '0'}"
				 @click="selectDir(d, index)">
				<text>{{d.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			directories: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		methods: {
			selectDir(d, index) {
				if (index == this.directories.length - 1) return
				this.$emit('selectDir', {
					fileId: d.fileId,
					index: index
				})
			}
		}
	}
</script>

<style>
	.directory{
		padding: 0 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 60rpx;
	}
	.dir:before {
		content: "/\A0";
		padding: 0 5px;
		color: #ccc;
	}
</style>
