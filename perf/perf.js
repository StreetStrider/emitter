/* eslint-disable max-params */

var Emitter = require('../')
var MultiEmitter = require('../multi')
import { createNanoEvents as Nanoevents } from 'nanoevents'

var { add } = require('benny')
var { suite } = require('benny')
var { cycle, complete } = require('benny')
// var { save } = require('benny')

function Suite (name, cases)
{
	return suite(
		name,
		...cases,

		cycle(),
		complete(),

		/*
		save(
		{
			folder: 'perf/',
			file:   'emitter',
			format: 'chart.html',
		}),
		*/
	)
}

Suite('zero',
[
	add('zero', () =>
	{
		var n = 1

		var emit = (m) => { n = (n * m) }

		return () =>
		{
			emit(-1)
		}
	}),
])


Suite('(1) single subscriber',
[
	add('emitter', () =>
	{
		var e = Emitter()

		var n = 1
		e.on(m => { n = (n * m) })

		return () =>
		{
			e.emit(-1)
		}
	}),

	add('multi', () =>
	{
		var e = MultiEmitter()

		var n = 1
		e.on('a', m => { n = (n * m) })

		return () =>
		{
			e.emit('a', -1)
		}
	}),

	add('nanoevents', () =>
	{
		var e = Nanoevents()

		var n = 1
		e.on('mul', m => { n = (n * m) })

		return () =>
		{
			e.emit('mul', -1)
		}
	}),
])

Suite('(0) zero subscribers',
[
	add('emitter', () =>
	{
		var e = Emitter()

		// var n = 1
		// e.on(m => { n = (n * m) })

		return () =>
		{
			e.emit(-1)
		}
	}),

	add('multi', () =>
	{
		var e = MultiEmitter()

		// var n = 1
		// e.on('a', m => { n = (n * m) })

		return () =>
		{
			e.emit('a', -1)
		}
	}),

	add('nanoevents', () =>
	{
		var e = Nanoevents()

		// var n = 1
		// e.on('mul', m => { n = (n * m) })

		return () =>
		{
			e.emit('mul', -1)
		}
	}),
])

Suite('(2) two subscribers',
[
	add('emitter', () =>
	{
		var e = Emitter()

		var n = 1
		e.on(m => { n = (n * m) })
		e.on(m => { n = (n * m) })

		return () =>
		{
			e.emit(-1)
		}
	}),

	add('multi', () =>
	{
		var e = MultiEmitter()

		var n = 1
		e.on('a', m => { n = (n * m) })
		e.on('a', m => { n = (n * m) })

		return () =>
		{
			e.emit('a', -1)
		}
	}),

	add('nanoevents', () =>
	{
		var e = Nanoevents()

		var n = 1
		e.on('mul', m => { n = (n * m) })
		e.on('mul', m => { n = (n * m) })

		return () =>
		{
			e.emit('mul', -1)
		}
	}),
])

Suite('(10) ten subscribers',
[
	add('emitter', () =>
	{
		var e = Emitter()

		var n = 1
		for (var t = 1; t <= 10; t++)
		{
			e.on(m => { n = (n * m) })
		}

		return () =>
		{
			e.emit(-1)
		}
	}),

	add('multi', () =>
	{
		var e = MultiEmitter()

		var n = 1
		for (var t = 1; t <= 10; t++)
		{
			e.on('a', m => { n = (n * m) })
		}

		return () =>
		{
			e.emit('a', -1)
		}
	}),

	add('nanoevents', () =>
	{
		var e = Nanoevents()

		var n = 1
		for (var t = 1; t <= 10; t++)
		{
			e.on('mul', m => { n = (n * m) })
		}

		return () =>
		{
			e.emit('mul', -1)
		}
	}),
])

Suite('(1 x 3) single subscriber, three arguments',
[
	add('emitter', () =>
	{
		var e = Emitter()

		var n = 1
		e.on((m1, m2, m3) => { n = (n * m1 * m2 * m3) })

		return () =>
		{
			e.emit(-1, -1, -1)
		}
	}),

	add('multi', () =>
	{
		var e = MultiEmitter()

		var n = 1
		e.on('a', (m1, m2, m3) => { n = (n * m1 * m2 * m3) })

		return () =>
		{
			e.emit('a', -1, -1, -1)
		}
	}),

	add('nanoevents', () =>
	{
		var e = Nanoevents()

		var n = 1
		e.on('mul', (m1, m2, m3) => { n = (n * m1 * m2 * m3) })

		return () =>
		{
			e.emit('mul', -1, -1, -1)
		}
	}),
])

Suite('(2 x 3) two subscribers, three arguments',
[
	add('emitter', () =>
	{
		var e = Emitter()

		var n = 1
		e.on((m1, m2, m3) => { n = (n * m1 * m2 * m3) })
		e.on((m1, m2, m3) => { n = (n * m1 * m2 * m3) })

		return () =>
		{
			e.emit(-1, -1, -1)
		}
	}),

	add('multi', () =>
	{
		var e = MultiEmitter()

		var n = 1
		e.on('a', (m1, m2, m3) => { n = (n * m1 * m2 * m3) })
		e.on('a', (m1, m2, m3) => { n = (n * m1 * m2 * m3) })

		return () =>
		{
			e.emit('a', -1, -1, -1)
		}
	}),

	add('nanoevents', () =>
	{
		var e = Nanoevents()

		var n = 1
		e.on('mul', (m1, m2, m3) => { n = (n * m1 * m2 * m3) })
		e.on('mul', (m1, m2, m3) => { n = (n * m1 * m2 * m3) })

		return () =>
		{
			e.emit('mul', -1, -1, -1)
		}
	}),
])

Suite('(10 x 5) ten subscribers, five arguments',
[
	add('emitter', () =>
	{
		var e = Emitter()

		var n = 1
		for (var t = 1; t <= 10; t++)
		{
			e.on((m1, m2, m3, m4, m5) => { n = (n * m1 * m2 * m3 * m4 * m5) })
		}

		return () =>
		{
			e.emit(-1, -1, -1, -1, -1)
		}
	}),

	add('multi', () =>
	{
		var e = MultiEmitter()

		var n = 1
		for (var t = 1; t <= 10; t++)
		{
			e.on('a', (m1, m2, m3, m4, m5) => { n = (n * m1 * m2 * m3 * m4 * m5) })
		}

		return () =>
		{
			e.emit('a', -1, -1, -1, -1, -1)
		}
	}),

	add('nanoevents', () =>
	{
		var e = Nanoevents()

		var n = 1
		for (var t = 1; t <= 10; t++)
		{
			e.on('mul', (m1, m2, m3, m4, m5) => { n = (n * m1 * m2 * m3 * m4 * m5) })
		}

		return () =>
		{
			e.emit('mul', -1, -1, -1, -1, -1)
		}
	}),
])
