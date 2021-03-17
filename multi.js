
var Emitter = require('./emitter')

var empty = {}
for (var key of Object.getOwnPropertyNames(Object.prototype))
{
	empty[key] = null
}

module.exports = function MultiEmitter ()
{
	var ems  = { ...empty }
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
		var emitter = ems[key]
		if (emitter)
		{
			emitter.emit(...args)
		}
	}

	function is_empty ()
	{
		return (! keys)
	}

	return { on, emit, is_empty }
}
