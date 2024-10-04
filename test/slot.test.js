
var { expect } = require('chai')

var Slot = require('../slot')
var once = require('../once')
var when = require('../when')


describe('Slot', () =>
{
	/* see emitter.test */
	/* see multi.test */

	it('emits', () =>
	{
		var e = Slot()

		var r = 0

		e.on((x) => { r += x })
		expect(r).eq(0)

		e.emit(1)
		expect(r).eq(1)

		e.emit(10)
		expect(r).eq(11)
	})

	it('prevent multiple subs', () =>
	{
		var e = Slot()

		e.on(() => {})

		expect(() =>
		{
			e.on(() => {}) /* eslint-disable-line max-nested-callbacks */
		})
		.throw(ReferenceError)
	})

	it('passes all args', () =>
	{
		var e = Slot()

		var r = null

		e.on((...args) => { r = [ ...args ] })

		e.emit(1, 'a', true)

		expect(r).deep.eq([ 1, 'a', true ])
	})

	it('provides disposer', () =>
	{
		var e = Slot()

		var r = 0

		var ds = e.on((x) => { r += x })

		expect(r).eq(0)

		e.emit(1)
		expect(r).eq(1)

		ds()
		e.emit(10)
		expect(r).eq(1)

		ds()
		e.emit(100)
		expect(r).eq(1)

		ds()
	})

	it('allows dispose during emit', () =>
	{
		var e = Slot()

		var r = 0

		var ds = e.on((x) =>
		{
			r += x
			ds()
		})

		expect(r).eq(0)

		e.emit(1)
		expect(r).eq(1)

		e.emit(10)
		expect(r).eq(1)
	})

	it('is_empty', () =>
	{
		var e = Slot()

		expect(e.is_empty()).true

		var f = () => {}

		var ds = e.on(f)
		expect(e.is_empty()).false

		ds()
		expect(e.is_empty()).true

		var ds = e.on(f)
		expect(e.is_empty()).false

		e.emit(1)
		expect(e.is_empty()).false

		ds()
		ds()
		expect(e.is_empty()).true

		e.emit(10)
		expect(e.is_empty()).true
	})

	it('once', () =>
	{
		var e = Slot()

		var r = 0
		var ds = once(e, (x) => { r += x })

		expect(r).eq(0)

		e.emit(1)
		expect(r).eq(1)

		e.emit(10)
		expect(r).eq(1)

		ds()

		e.emit(100)
		expect(r).eq(1)

		var ds = once(e, (x) => { r += x })

		e.emit(1000)
		expect(r).eq(1001)

		e.emit(10000)
		expect(r).eq(1001)
	})

	it('when', async () =>
	{
		var e1 = Slot()
		var e2 = Slot()

		var
		p1 = when(e1)
		p1 = Promise.race([ p1, timeout() ])

		var
		p2 = when(e2)
		p2 = Promise.race([ p2, timeout() ])

		e1.emit('E1')
		e1.emit('E10')
		/* e2.emit('E2') */
		/* e2.emit('E20') */
		await p1.then(x => expect(x).eq('E1'), () => expect.fail('must not throw'))
		await p2.then(() => expect.fail('must throw'), e => expect(e instanceof TypeError))

		var
		p1 = when(e1)
		p1 = Promise.race([ p1, timeout() ])

		e1.emit('E100')
		await p1.then(x => expect(x).eq('E100'), () => expect.fail('must not throw'))

		function timeout ()
		{
			return new Promise((_, rj) =>
			{
				setTimeout(() => rj(new TypeError), 25)
			})
		}
	})
})
