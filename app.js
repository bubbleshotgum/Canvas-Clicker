function dump(elem, num, x, y)
{
	elem.style.background = (elem.style.background) ? 
		'url(assets/backgrounds/' + num + '.png) ' + x + 'px ' + y + 'px no-repeat, ' + elem.style.background : 
		'url(assets/backgrounds/' + num + '.png) ' + x + 'px ' + y + 'px no-repeat'
	elem.style.backgroundSize = 'contain'
}

function _listener(event) {
	dump(event.currentTarget, window.num, event.clientX, event.clientY)
}

function listener(event) {
	window.num = Math.floor(Math.random() * 4 + 1)
	dump(event.currentTarget, window.num, event.clientX, event.clientY)
	document.querySelector('main').addEventListener('mousemove', _listener)
}

window.addEventListener('load', function() {
	const bgFixed = document.getElementsByClassName('background-fixed')
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
})

document.querySelector('main').addEventListener('mousedown', listener)
document.querySelector('main').addEventListener('mouseup', function(event) {
	this.removeEventListener('mousemove', _listener)
})