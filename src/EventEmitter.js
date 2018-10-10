class EventEmitter {
	constructor() {
		this._events = {}
	}
	$on(event, fn) {
		// 如果event是数组，则逐类型订阅事件
		if (Array.isArray(event)) {
			event.forEach(ev => {
				this.$on(ev, fn)
			})
		} 
		// 订阅单个事件 
		else {
			(this._events[event] || (this._events[event] = [])).push(fn)
		}
		return this 
	}
	$emit(event, ...args) {
		let cbs = this._events[event]
		// 如果有订阅的事件，则逐个触发
		if (cbs && cbs.length) {
			cbs.forEach(cb => {
				cb.apply(this, args)
			})
		}
		return this 
	}
	$off(event, fn) {
		// 如果不传参数，则注销所有事件 
		if (!arguments.length) {
			this._events = {}
		} else if (arguments.length === 1) {
            this._events[event] = []
		} else if (arguments.length === 2) {
			if (this._events[event]) {
				this._events[event] = this._events[event].filter(cb => cb !== fn)
			}
		}
		return this 
	}
	$once(event, fn) {
		const _this = this 
		function one() {
			fn.apply(_this, arguments)
			_this.$off(event, one)
		}
		one.fn = fn 
		this.$on(event, one) 
		return this 
	}
}

export default EventEmitter
