
var { expect } = require('chai')

var Emitter = require('../')


describe('Emitter', () =>
{
	it('emits', () =>
	{
		var e = Emitter()

		var r1 = 0
		var r2 = 0
		var r3 = 0

		e.on((x) => { r1 = (r1 + x) })
		e.on((x) => { r2 = (r2 + x) })

		expect(r1).eq(0)
		expect(r2).eq(0)
		expect(r3).eq(0)

		e.emit(1)

		expect(r1).eq(1)
		expect(r2).eq(1)
		expect(r3).eq(0)

		e.emit(10)

		expect(r1).eq(11)
		expect(r2).eq(11)
		expect(r3).eq(0)
	})

	it('pass all args', () =>
	{
		var e = Emitter()

		var r = null

		e.on((...args) => { r = [ ...args ] })

		e.emit(1, 'a', true)

		expect(r).deep.eq([ 1, 'a', true ])
	})

	it('provides disposer', () =>
	{
		var e = Emitter()

		var r1 = 0
		var r2 = 0

		var ds1 = e.on((x) => { r1 = (r1 + x) })
		var ds2 = e.on((x) => { r2 = (r2 + x) })

		expect(r1).eq(0)
		expect(r2).eq(0)

		e.emit(1)

		expect(r1).eq(1)
		expect(r2).eq(1)

		ds1()
		e.emit(10)

		expect(r1).eq(1)
		expect(r2).eq(11)

		ds1()
		e.emit(100)

		expect(r1).eq(1)
		expect(r2).eq(111)

		ds2()
		e.emit(1000)

		expect(r1).eq(1)
		expect(r2).eq(111)
	})

	it('allows dispose during emit', () =>
	{
		var e = Emitter()

		var r1 = 0
		var r2 = 0
		var r3 = 0

		var ds1 = e.on((x) =>
		{
			r1 = (r1 + x)
			ds1()
			ds3()
		})
		e.on((x) => { r2 = (r2 + x) })
		var ds3 = e.on((x) => { r3 = (r3 + x) })

		expect(r1).eq(0)
		expect(r2).eq(0)
		expect(r3).eq(0)

		e.emit(1)

		expect(r1).eq(1)
		expect(r2).eq(1)
		expect(r3).eq(1)

		e.emit(10)

		expect(r1).eq(1)
		expect(r2).eq(11)
		expect(r3).eq(1)
	})

	it('disposes single fn', () =>
	{
		var e = Emitter()

		var r = 0
		var f = (x) => { r = (r + x) }

		var ds1 = e.on(f)
		var ds2 = e.on(f)

		e.emit(2)
		expect(r).eq(4)

		ds1()

		e.emit(2)
		expect(r).eq(6)

		ds2()

		e.emit(2)
		expect(r).eq(6)
	})
})
