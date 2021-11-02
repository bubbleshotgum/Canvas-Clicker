function dump(elem, num, x, y)
{
	elem.style.background = (elem.style.background) ? 
		'url(assets/backgrounds/' + num + '.png) ' + x + 'px ' + y + 'px no-repeat, ' + elem.style.background : 
		'url(assets/backgrounds/' + num + '.png) ' + x + 'px ' + y + 'px no-repeat'
	elem.style.backgroundSize = '25%'
	elem.children 
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
	console.log('All resources finished loading')
	const bgFixed = document.querySelectorAll('.background-fixed')
	let shift = setTimeout(() => {
		function _shift(px) 
		{ 
			let _px = px
			if (-1 * px >= window.innerWidth)
				_px = window.innerWidth + px
			bgFixed[0].style.transform = 'translateX(' + _px + 'px)'
			bgFixed[1].style.transform = 'translateX(' + (_px + window.innerWidth) + 'px)'
			shift = setTimeout(() => {_shift(_px - 4)}, 20)
		}
		_shift(-1)}, 1000)
})

document.querySelector('main').addEventListener('mousedown', listener)
document.querySelector('main').addEventListener('mouseup', function(event) {
	this.removeEventListener('mousemove', _listener)
})