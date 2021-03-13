
var Emitter = require('./emitter')

module.exports = function MultiEmitter ()
{
	var channels = {}

	function on (eventname, fn)
	{
		var emitter = channels[eventname]

		if (! emitter)
		{
			emitter = channels[eventname] = Emitter()
		}

		var ds = emitter.on(fn)

		return () =>
		{
			if (! ds) { return }

			ds()
			ds = null
			fn = null

			if (emitter.is_empty())
			{
				delete channels[eventname]
			}

			eventname = null
			emitter = null
		}
	}

	function emit (eventname, ...args)
	{
		var emitter = channels[eventname]
		if (emitter)
		{
			emitter.emit(...args)
		}
	}

	function is_empty ()
	{
		for (var channel in channels)
		{
			if (! channels[channel].is_empty()) { return false }
		}

		return true
	}

	return { on, emit, is_empty }
}
