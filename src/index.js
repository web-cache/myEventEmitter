import EventEmitter from './eventEmitter' 

const emitter = new EventEmitter() 

const cb = function(){
	console.log('msg事件被触发了', arguments)
}

emitter.$on('msg', cb)
emitter.$on('msg', function(){
	console.log(arguments)
})

emitter.$once('qiang', function(){
	console.log('qianggou',arguments)
})

setTimeout(() => {
	emitter.$emit('msg', '1', 'hello world 1')
	emitter.$off('msg', cb)
	emitter.$emit('msg', '2', 'hello world 2')
	emitter.$emit('qiang', 'qiang1')
	emitter.$emit('qiang', 'qiang2')
}, 2000);
