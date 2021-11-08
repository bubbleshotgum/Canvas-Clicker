<template>
	<div 
		class="moving"
		ref="moving"></div>
</template>

<script>
	export default {
		name: 'moving-logo',
		props: {
			scale: {
				type: Number,
				required: true
			}
		},
		data: () => ({
			start: null,
			checker: 0
		}),
		methods: {
			step(frame) {
				if(!this.start) 
					this.start = frame
				let progress = frame - this.start
				if(this.$refs.moving.getBoundingClientRect().x < (this.scale - 1) * window.innerWidth)
				{
					this.$refs.moving.style.transform = `translateX(${this.scale * window.innerWidth}px)`
					this.checker++
				}
				else
					this.$refs.moving.style.transform = `translateX(${(this.scale + this.checker) * window.innerWidth - progress / 8}px)`
				window.requestAnimationFrame(this.step)
			}
		},
		mounted()
		{
			this.$refs.moving.style.transform = `translateX(${this.scale * window.innerWidth})px`
			window.requestAnimationFrame(this.step)
		}
	}
</script>

<style scoped>
.moving {
	width: 100vw;
	height: 40vh;
	background: linear-gradient(45deg, hsla(20, 85%, 40%, .8) 1%, hsla(190, 50%, 20%, .9) 60%) center center no-repeat;
	position: fixed;
}
</style>