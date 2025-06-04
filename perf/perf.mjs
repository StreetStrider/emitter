
import Emitter from 'emitter'
import MultiEmitter from 'emitter/multi'

import { createNanoEvents as Nanoevents } from 'nanoevents'

import { bench, run } from 'mitata'
import { group, summary, barplot } from 'mitata'
import { do_not_optimize } from 'mitata'


function Suite (name, fn)
{
	group(name, () => summary(() => barplot(fn)))
}
function xSuite () {} // eslint-disable-line no-unused-vars


Suite('zero', () =>
{
	bench('zero', function * ()
	{
		var n = 1

		var emit = (m) => { n = (n * m) }

		yield () =>
		{
			do_not_optimize(emit(-1))
		}
	})
})


Suite('(1) single subscriber', () =>
{
	/*
	bench('slot', function * ()
	{
		var s = Slot()

		var n = 1
		s.on(m => { n = (n * m) })

		yield () =>
		{
			s.emit(-1)
		}
	})
	//*/

	bench('emitter', function * ()
	{
		var e = Emitter()

		var n = 1
		e.on(m => { n = (n * m) })

		yield () =>
		{
			do_not_optimize(e.emit(-1))
		}
	})

	bench('multi', function * ()
	{
		var e = MultiEmitter()

		var n = 1
		e.on('a', m => { n = (n * m) })

		yield () =>
		{
			do_not_optimize(e.emit('a', -1))
		}
	})

	bench('nanoevents', function * ()
	{
		var e = Nanoevents()

		var n = 1
		e.on('mul', m => { n = (n * m) })

		yield () =>
		{
			do_not_optimize(e.emit('mul', -1))
		}
	})
})


Suite('(0) zero subscribers', () =>
{
	/*
	bench('slot', function * ()
	{
		var s = Slot()

		// var n = 1
		// s.on(m => { n = (n * m) })

		yield () =>
		{
			s.emit(-1)
		}
	})
	//*/

	bench('emitter', function * ()
	{
		var e = Emitter()

		// var n = 1
		// e.on(m => { n = (n * m) })

		yield () =>
		{
			do_not_optimize(e.emit(-1))
		}
	})

	bench('multi', function * ()
	{
		var e = MultiEmitter()

		// var n = 1
		// e.on('a', m => { n = (n * m) })

		yield () =>
		{
			do_not_optimize(e.emit('a', -1))
		}
	})

	bench('nanoevents', function * ()
	{
		var e = Nanoevents()

		// var n = 1
		// e.on('mul', m => { n = (n * m) })

		yield () =>
		{
			do_not_optimize(e.emit('mul', -1))
		}
	})
})


Suite('(2) two subscribers', () =>
{
	bench('emitter', function * ()
	{
		var e = Emitter()

		var n = 1
		e.on(m => { n = (n * m) })
		e.on(m => { n = (n * m) })

		yield () =>
		{
			e.emit(-1)
		}
	})

	bench('multi', function * ()
	{
		var e = MultiEmitter()

		var n = 1
		e.on('a', m => { n = (n * m) })
		e.on('a', m => { n = (n * m) })

		yield () =>
		{
			e.emit('a', -1)
		}
	})

	bench('nanoevents', function * ()
	{
		var e = Nanoevents()

		var n = 1
		e.on('mul', m => { n = (n * m) })
		e.on('mul', m => { n = (n * m) })

		yield () =>
		{
			e.emit('mul', -1)
		}
	})
})


Suite('(10) ten subscribers', () =>
{
	bench('emitter', function * ()
	{
		var e = Emitter()

		var n = 1
		for (var t = 1; t <= 10; t++)
		{
			e.on(m => { n = (n * m) })
		}

		yield () =>
		{
			e.emit(-1)
		}
	})

	bench('multi', function * ()
	{
		var e = MultiEmitter()

		var n = 1
		for (var t = 1; t <= 10; t++)
		{
			e.on('a', m => { n = (n * m) })
		}

		yield () =>
		{
			e.emit('a', -1)
		}
	})

	bench('nanoevents', function * ()
	{
		var e = Nanoevents()

		var n = 1
		for (var t = 1; t <= 10; t++)
		{
			e.on('mul', m => { n = (n * m) })
		}

		yield () =>
		{
			e.emit('mul', -1)
		}
	})
})


Suite('(1 x 3) single subscriber, three arguments', () =>
{
	/*
	bench('slot', function * ()
	{
		var s = Slot()

		var n = 1
		s.on((m1, m2, m3) => { n = (n * m1 * m2 * m3) })

		yield () =>
		{
			s.emit(-1, -1, -1)
		}
	})
	//*/

	bench('emitter', function * ()
	{
		var e = Emitter()

		var n = 1
		e.on((m1, m2, m3) => { n = (n * m1 * m2 * m3) })

		yield () =>
		{
			e.emit(-1, -1, -1)
		}
	})

	bench('multi', function * ()
	{
		var e = MultiEmitter()

		var n = 1
		e.on('a', (m1, m2, m3) => { n = (n * m1 * m2 * m3) })

		yield () =>
		{
			e.emit('a', -1, -1, -1)
		}
	})

	bench('nanoevents', function * ()
	{
		var e = Nanoevents()

		var n = 1
		e.on('mul', (m1, m2, m3) => { n = (n * m1 * m2 * m3) })

		yield () =>
		{
			e.emit('mul', -1, -1, -1)
		}
	})
})


Suite('(2 x 3) two subscribers, three arguments', () =>
{
	bench('emitter', function * ()
	{
		var e = Emitter()

		var n = 1
		e.on((m1, m2, m3) => { n = (n * m1 * m2 * m3) })
		e.on((m1, m2, m3) => { n = (n * m1 * m2 * m3) })

		yield () =>
		{
			e.emit(-1, -1, -1)
		}
	})

	bench('multi', function * ()
	{
		var e = MultiEmitter()

		var n = 1
		e.on('a', (m1, m2, m3) => { n = (n * m1 * m2 * m3) })
		e.on('a', (m1, m2, m3) => { n = (n * m1 * m2 * m3) })

		yield () =>
		{
			e.emit('a', -1, -1, -1)
		}
	})

	bench('nanoevents', function * ()
	{
		var e = Nanoevents()

		var n = 1
		e.on('mul', (m1, m2, m3) => { n = (n * m1 * m2 * m3) })
		e.on('mul', (m1, m2, m3) => { n = (n * m1 * m2 * m3) })

		yield () =>
		{
			e.emit('mul', -1, -1, -1)
		}
	})
})


Suite('(10 x 5) ten subscribers, five arguments', () =>
{
	bench('emitter', function * ()
	{
		var e = Emitter()

		var n = 1
		for (var t = 1; t <= 10; t++)
		{
			e.on((m1, m2, m3, m4, m5) => { n = (n * m1 * m2 * m3 * m4 * m5) })
		}

		yield () =>
		{
			e.emit(-1, -1, -1, -1, -1)
		}
	})

	bench('multi', function * ()
	{
		var e = MultiEmitter()

		var n = 1
		for (var t = 1; t <= 10; t++)
		{
			e.on('a', (m1, m2, m3, m4, m5) => { n = (n * m1 * m2 * m3 * m4 * m5) })
		}

		yield () =>
		{
			e.emit('a', -1, -1, -1, -1, -1)
		}
	})

	bench('nanoevents', function * ()
	{
		var e = Nanoevents()

		var n = 1
		for (var t = 1; t <= 10; t++)
		{
			e.on('mul', (m1, m2, m3, m4, m5) => { n = (n * m1 * m2 * m3 * m4 * m5) })
		}

		yield () =>
		{
			e.emit('mul', -1, -1, -1, -1, -1)
		}
	})
})


await run()
