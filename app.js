let buff = null

function dump(num, x, y)
{
	let img = new Image()

	img.onload = function() 
	{ 
		let _width = Math.min(
				img.width * window.min, 
				600, 
				window.outerWidth / 2),
			_height = Math.min(
				img.height * window.min, 
				img.height / img.width * 600, 
				img.height / img.width * window.outerWidth / 2)
		window.canvas.getContext('2d').drawImage(
			img, 
			x - _width / 2,
			y - _height / 2,
			_width,
			_height)
	}
	img.src = './assets/backgrounds/' + window.num + '.png'
}

function _listener(event) {
	dump(window.num, event.clientX, event.clientY)
}

function listener(event) {
	window.num = Math.floor(Math.random() * 6 + 1)
	window.min = Math.min(Math.random() + .5, 1)
	dump(window.num, event.clientX, event.clientY)
	document.querySelector('main').addEventListener('mousemove', _listener)
	document.querySelector('main').addEventListener('touchmove', _listener)
}

window.addEventListener('load', function() {
	const bgFixed = document.getElementsByClassName('background-fixed')
	window.canvas = document.querySelector('canvas')
	window.canvas.width = window.innerWidth
	window.canvas.height = window.innerHeight
	
	let start = null,
		checker = window.innerWidth

	function step(frame)
	{
		if(!start) 
			start = frame
		let progress = frame - start
		if(progress / 8 >= checker)
		{
			bgFixed[0].style.transform = 'translateX(0)'
			bgFixed[1].style.transform = 'translateX(' + window.innerWidth + 'px)'
			checker += window.innerWidth
		}
		else
		{
			bgFixed[0].style.transform = 'translateX(' + (checker - window.innerWidth - progress / 8) + 'px)'
			bgFixed[1].style.transform = 'translateX(' + (checker - progress / 8) + 'px)'
		}

		window.requestAnimationFrame(step)
	}

	window.requestAnimationFrame(step)
	window.addEventListener('resize', function() {
		if (!buff) buff = new Image()
		buff.onload = function()
		{
			window.canvas.width = window.innerWidth
			window.canvas.height = window.innerHeight
			window.canvas.getContext('2d').drawImage(buff, 0, 0)
		}
		buff.src = window.canvas.toDataURL()
	})

	document.querySelector('main').addEventListener('mousedown', listener)
	document.querySelector('main').addEventListener('touchstart', listener)
	document.querySelector('main').addEventListener('mouseup', function(event) {
		this.removeEventListener('mousemove', _listener)
	})
	document.querySelector('main').addEventListener('touchebd', function(event) {
		this.removeEventListener('mousemove', _listener)
	})
})
