<template>
	<canvas 
		class="canvas"
		ref="canvas"
		:width="width"
		:height="height"
	/>
</template>

<script>
	let publicPath = process.env.BASE_URL
	export default {
		name: 'photo-canvas',
		data: () => ({
			started: false,
			image: null,
			imageWidth: null,
			imageHeight: null,
			width: window.outerWidth,
			height: window.outerHeight,
			items: [
				{id: 1, src: `${publicPath}assets/backgrounds/1.png`},
				{id: 2, src: `${publicPath}assets/backgrounds/2.png`},
				{id: 3, src: `${publicPath}assets/backgrounds/3.png`},
				{id: 4, src: `${publicPath}assets/backgrounds/4.png`},
				{id: 5, src: `${publicPath}assets/backgrounds/5.png`},
				{id: 6, src: `${publicPath}assets/backgrounds/6.png`}
			]
		}),
		methods: {
			drawNewImage(x, y)
			{
				let state = this
				this.image = new Image()
				this.image.onload = function() {
					state.imageWidth = Math.min(
						this.width * Math.min(Math.random() + .5, 1), 
						600, 
						window.outerWidth / 2)
					switch(state.imageWidth)
					{
						case 600:
							state.imageHeight = this.height / this.width * 600
							break
						case window.outerWidth / 2:
							state.imageHeight = this.height / this.width * window.outerWidth / 2
							break
						default:
							state.imageHeight = this.height * Math.min(Math.random() + .5, 1) 
							break
					}	
					
					state.$refs.canvas.getContext('2d').drawImage(
						this,
						x - state.imageWidth / 2,
						y - state.imageHeight / 2,
						state.imageWidth, state.imageHeight)
					state.started = true
				}
				this.image.src = state.items[Math.floor(Math.random() * 6)].src
			},
			drawImage(x, y)
			{
				if(!this.started)
					return
				this.$refs.canvas.getContext('2d').drawImage(
					this.image,
					x - this.imageWidth / 2,
					y - this.imageHeight / 2,
					this.imageWidth, this.imageHeight)
			},
			stopDraw()
			{
				this.started = false
				this.image = null
			},
			preserveCanvasData()
			{
				let buff = new Image()
				buff.onload = () => {
					this.$refs.canvas.getContext('2d').drawImage(buff, 0, 0)
				}
				buff.src = this.$refs.canvas.toDataURL()
			}
		}
	}
</script>

<style scoped>
.canvas {
	position: absolute;
	z-index: -1;
	top: 0;
}
</style>