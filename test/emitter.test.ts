
declare var setTimeout: any

import { expect } from 'chai'

import Emitter from 'emitter'
import once from 'emitter/once'
import when from 'emitter/when'


describe('Emitter', () =>
{
	/* see slot.test */
	/* see emitter.test */
	/* see multi.test */

	it('emits', () =>
	{
		var e = Emitter<[ number ]>()

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

	it('passes all args', () =>
	{
		var e = Emitter<[ number, string, boolean ]>()

		var r = null

		e.on((...args) => { r = [ ...args ] })

		e.emit(1, 'a', true)

		expect(r).deep.eq([ 1, 'a', true ])
	})

	it('provides disposer', () =>
	{
		var e = Emitter<[ number ]>()

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

		ds2()
		ds1()
	})

	it('allows dispose during emit', () =>
	{
		var e = Emitter<[ number ]>()

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
		var e = Emitter<[ number ]>()

		var r = 0
		var f = (x: number) => { r = (r + x) }

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

	it('is_empty', () =>
	{
		var e = Emitter()

		expect(e.is_empty()).true

		var f = () => {}

		var ds1 = e.on(f)
		expect(e.is_empty()).false

		var ds2 = e.on(f)
		expect(e.is_empty()).false

		var ds3 = e.on(f)
		expect(e.is_empty()).false

		ds2()
		expect(e.is_empty()).false
		ds2()
		ds2()
		expect(e.is_empty()).false

		e.emit(1)
		expect(e.is_empty()).false

		ds3()
		expect(e.is_empty()).false
		ds3()
		ds3()
		expect(e.is_empty()).false

		e.emit(10)
		expect(e.is_empty()).false

		ds1()
		expect(e.is_empty()).true

		ds1()
		expect(e.is_empty()).true

		ds1()
		expect(e.is_empty()).true

		e.emit(100)
		expect(e.is_empty()).true
	})

	it('once', () =>
	{
		var e = Emitter<[ number ]>()

		var r1 = 0
		var r2 = 0
		var r3 = 0

		once(e, (x) => { r1 = (r1 + x) })
		var ds2 = once(e, (x) => { r2 = (r2 + x) })
		var ds3 = once(e, (x) => { r3 = (r3 + x) })

		expect(r1).eq(0)
		expect(r2).eq(0)
		expect(r3).eq(0)

		ds2()

		e.emit(1)

		expect(r1).eq(1)
		expect(r2).eq(0)
		expect(r3).eq(1)

		ds3()

		e.emit(10)

		expect(r1).eq(1)
		expect(r2).eq(0)
		expect(r3).eq(1)
	})

	it('when', async () =>
	{
		var e1 = Emitter<[ string ]>()
		var e2 = Emitter()

		var p1 = when(e1)
		var p11 = Promise.race([ p1, timeout() ])

		var p2 = when(e2)
		var p22 = Promise.race([ p2, timeout() ])

		e1.emit('E1')
		e1.emit('E10')
		/* e2.emit('E2') */
		/* e2.emit('E20') */
		await p11.then(x => expect(x).eq('E1'), () => expect.fail('must not throw'))
		await p22.then(() => expect.fail('must throw'), e => expect(e instanceof TypeError))

		var p3 = when(e1)
		var p33 = Promise.race([ p3, timeout() ])

		e1.emit('E100')
		await p33.then(x => expect(x).eq('E100'), () => expect.fail('must not throw'))

		function timeout ()
		{
			return new Promise((_, rj) =>
			{
				setTimeout(() => rj(new TypeError), 25)
			})
		}
	})
})
