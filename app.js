function dump(elem, x, y)
{
	elem.style.background = 'url(assets/backgrounds/' + Math.floor(Math.random() * 4 + 1) + '.png) ' + x + 'px ' + y + 'px no-repeat'
	elem.style.backgroundSize = 'contain' 
}


window.addEventListener('load', function() {
	console.log('All resources finished loading')
	const bgFixed = document.querySelectorAll('.background-fixed')
	let shift = setTimeout(() => {
		function _shift(px) 
		{ 
			let _px = px,
			__px = px + window.innerWidth
			if (-1 * px >= window.innerWidth)
				_px = window.innerWidth + px
			if (-1 * px >= window.innerWidth)
				__px = window.innerWidth + px
			bgFixed[0].style.transform = 'translateX(' + _px + 'px)'
			bgFixed[1].style.transform = 'translateX(' + __px + 'px)'
			shift = setTimeout(() => {_shift(_px - 4)}, 20)
		}
		_shift(-1)}, 1000)
})

document.querySelector('main').addEventListener('mousedown', function(event) {
	dump(this, event.clientX, event.clientY)
})