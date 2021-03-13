
var Emitter = require('./emitter')

module.exports = function MultiEmitter ()
{
	var ems  = {}
	var keys = 0

	function on (key, fn)
	{
		var emitter = ems[key]

		if (! emitter)
		{
			emitter = ems[key] = Emitter()
			keys++
		}

		return disposer(key, emitter.on(fn))
	}

	function disposer (key, ds)
	{
		return () =>
		{
			if (! ds) { return }
			ds()

			var emitter = ems[key]
			if (emitter.is_empty())
			{
				delete ems[key]
				keys--
			}

			key = null
			ds  = null
		}
	}

	function emit (key, ...args)
	{
		if (key in ems)
		{
			ems[key].emit(...args)
		}
	}

	function is_empty ()
	{
		return (! keys)
	}

	return { on, emit, is_empty }
}
