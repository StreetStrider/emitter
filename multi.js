
var Emitter = require('./emitter')

var yes = Symbol('yes')

module.exports = function MultiEmitter ()
{
	var ems = {}
	var ems_yes = {}
	var keys = 0

	function on (key, fn)
	{
		if (ems_yes[key] === yes)
		{
			var emitter = ems[key]
		}
		else
		{
			var emitter = ems[key] = Emitter()
			ems_yes[key] = yes
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
				delete ems_yes[key]
				keys--
			}

			key = null
			ds  = null
		}
	}

	function emit (key, ...args)
	{
		if (ems_yes[key] === yes)
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
