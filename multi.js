
var Emitter = require('./emitter')

// var yes = Symbol('yes')

module.exports = function MultiEmitter ()
{
	var ems = new Map
	// var ems = {}
	// var ems_yes = {}
	// var keys = 0

	function on (key, fn)
	{
		if (ems.has(key))
		{
			var emitter = ems.get(key)
		}
		else
		{
			var emitter = Emitter()
			ems.set(key, emitter)

			// ems_yes[key] = yes
			// keys++
		}

		return disposer(key, emitter.on(fn))
	}

	function disposer (key, ds)
	{
		return () =>
		{
			if (! ds) { return }
			ds()

			var emitter = ems.get(key)
			if (emitter.is_empty())
			{
				ems.delete(key)
				// delete ems[key]
				// delete ems_yes[key]
				// keys--
			}

			key = null
			ds  = null
		}
	}

	function emit (key, ...args)
	{
		if (ems.has(key))
		{
			ems.get(key).emit(...args)
		}
	}

	function is_empty ()
	{
		return (! ems.size)
	}

	return { on, emit, is_empty }
}
