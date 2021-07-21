
var { expect } = require('chai')

var MultiEmitter = require('../multi')
var once = require('../once').multi


describe('MultiEmitter', () =>
{
	/* see emitter.test */

	it('emits', () =>
	{
		var e = MultiEmitter()

		var r1 = 0
		var r2 = 0
		var r3 = 0
		var r4 = 0

		e.on('a', (x) => { r1 = (r1 + x) })
		e.on('a', (x) => { r2 = (r2 + x) })
		e.on('b', (y) => { r3 = (r3 + y) })

		expect(r1).eq(0)
		expect(r2).eq(0)
		expect(r3).eq(0)
		expect(r4).eq(0)

		e.emit('a', 1)

		expect(r1).eq(1)
		expect(r2).eq(1)
		expect(r3).eq(0)
		expect(r4).eq(0)

		e.emit('a', 10)
		e.emit('b', 20)
		e.emit('c', 30)

		expect(r1).eq(11)
		expect(r2).eq(11)
		expect(r3).eq(20)
		expect(r4).eq(0)
	})

	it('supports symbols', () =>
	{
		var s = Symbol('s')
		var e = MultiEmitter()

		var r = 0

		var ds = e.on(s, (x) => { r = (r + x) })

		expect(r).eq(0)

		e.emit(s, 1)
		expect(r).eq(1)

		e.emit(s, 10)
		expect(r).eq(11)

		ds()
		e.emit(s, 100)
		expect(r).eq(11)
	})

	it('passes all args', () =>
	{
		var e = MultiEmitter()

		var r = null

		e.on('X', (...args) => { r = [ ...args ] })

		e.emit('X', 1, 'a', true)

		expect(r).deep.eq([ 1, 'a', true ])
	})

	it('provides disposer', () =>
	{
		var e = MultiEmitter()

		var r1 = 0
		var r2 = 0

		var ds1 = e.on('a', (x) => { r1 = (r1 + x) })
		var ds2 = e.on('b', (x) => { r2 = (r2 + x) })

		expect(r1).eq(0)
		expect(r2).eq(0)

		e.emit('a', 1)
		e.emit('b', 2)
		e.emit('c', 3)

		expect(r1).eq(1)
		expect(r2).eq(2)

		ds1()
		e.emit('a', 10)
		e.emit('b', 20)
		e.emit('c', 30)

		expect(r1).eq(1)
		expect(r2).eq(22)

		ds1()
		e.emit('a', 100)
		e.emit('b', 200)
		e.emit('c', 300)

		expect(r1).eq(1)
		expect(r2).eq(222)

		ds2()
		e.emit('a', 1000)
		e.emit('b', 2000)
		e.emit('c', 3000)

		expect(r1).eq(1)
		expect(r2).eq(222)

		ds2()
		ds1()
	})

	it('allows dispose during emit', () =>
	{
		var e = MultiEmitter()

		var r1 = 0
		var r2 = 0
		var r3 = 0

		var ds1 = e.on('a', (x) =>
		{
			r1 = (r1 + x)
			ds1()
			ds3()
		})
		e.on('a', (x) => { r2 = (r2 + x) })
		var ds3 = e.on('a', (x) => { r3 = (r3 + x) })

		expect(r1).eq(0)
		expect(r2).eq(0)
		expect(r3).eq(0)

		e.emit('a', 1)

		expect(r1).eq(1)
		expect(r2).eq(1)
		expect(r3).eq(1)

		e.emit('a', 10)

		expect(r1).eq(1)
		expect(r2).eq(11)
		expect(r3).eq(1)
	})

	it('disposes single fn', () =>
	{
		var e = MultiEmitter()

		var r = 0
		var f = (x) => { r = (r + x) }

		var ds1 = e.on('a', f)
		var ds2 = e.on('a', f)
		var ds3 = e.on('b', f)

		e.emit('a', 2)
		e.emit('b', 2)
		expect(r).eq(6)

		ds1()

		e.emit('a', 2)
		e.emit('b', 2)
		expect(r).eq(10)

		ds2()

		e.emit('a', 2)
		e.emit('b', 2)
		expect(r).eq(12)

		ds3()

		e.emit('a', 2)
		e.emit('b', 2)
		expect(r).eq(12)
	})

	it('is_empty', () =>
	{
		var e = MultiEmitter()

		expect(e.is_empty()).true

		var f = () => {}

		var ds1 = e.on('a', f)
		expect(e.is_empty()).false

		var ds2 = e.on('a', f)
		expect(e.is_empty()).false

		var ds3 = e.on('b', f)
		expect(e.is_empty()).false

		ds2()
		expect(e.is_empty()).false
		ds2()
		ds2()
		expect(e.is_empty()).false

		ds3()
		expect(e.is_empty()).false
		ds3()
		ds3()
		expect(e.is_empty()).false

		ds1()
		expect(e.is_empty()).true

		ds1()
		expect(e.is_empty()).true

		ds1()
		expect(e.is_empty()).true
	})

	it('doesnt collide with prototypes', () =>
	{
		var e = MultiEmitter()

		e.emit('a', 1)
		e.emit('toString', 2)
		e.emit('valueOf', 3)

		var r = 0
		e.on('valueOf', (x) => { r = (r + x) })

		e.emit('a', 1)
		e.emit('toString', 2)
		e.emit('valueOf', 3)

		expect(r).eq(3)
	})

	it('once', () =>
	{
		var e = MultiEmitter()

		var r1 = 0
		var r2 = 0
		var r3 = 0
		var r4 = 0

		once(e, 'a', (x) => { r1 = (r1 + x) })
		once(e, 'a', (x) => { r2 = (r2 + x) })
		var ds3 = once(e, 'b', (y) => { r3 = (r3 + y) })
		var ds4 = once(e, 'b', (y) => { r4 = (r4 + y) })

		expect(r1).eq(0)
		expect(r2).eq(0)
		expect(r3).eq(0)
		expect(r4).eq(0)

		ds3()

		e.emit('a', 1)

		expect(r1).eq(1)
		expect(r2).eq(1)
		expect(r3).eq(0)
		expect(r4).eq(0)

		e.emit('a', 10)
		e.emit('b', 20)
		e.emit('c', 30)

		expect(r1).eq(1)
		expect(r2).eq(1)
		expect(r3).eq(0)
		expect(r4).eq(20)

		ds4()

		e.emit('a', 100)
		e.emit('b', 200)
		e.emit('c', 300)

		expect(r1).eq(1)
		expect(r2).eq(1)
		expect(r3).eq(0)
		expect(r4).eq(20)
	})
})
