function loadImg(src) {
	let promise = new Promise(function(resolve, reject){
		// let img = document.createElement('img');
		let img = new Image();
		img.onload = function(){
			resolve(img)
		}
		img.onerror = function(){
			reject('加载图片失败')
		}
		img.src = src
	})
	return promise 
}

export default loadImg 