
import Emitter from '../'
import { createNanoEvents as Nanoevents } from 'nanoevents'

import { add } from 'benny'
import { suite } from 'benny'
import { cycle, complete } from 'benny'
// import { save } from 'benny'

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
