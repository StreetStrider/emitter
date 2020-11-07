
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

Suite('emitter',
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
