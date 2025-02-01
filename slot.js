
module.exports = function Slot ()
{
	var fn1 = null

	function on (fn)
	{
		if (fn1) throw new ReferenceError('occupied')

		fn1 = fn
		return disposer(fn)
	}

	function disposer (fn)
	{
		return () =>
		{
			if (! fn) return

			if (fn1 === fn) fn1 = null

			fn = null
		}
	}

	function emit (...args)
	{
		return fn1?.(...args)
	}

	function is_empty ()
	{
		return (! fn1)
	}

	function emit_must (...args)
	{
		if (! fn1) throw new ReferenceError('empty')

		return fn1(...args)
	}

	return { on, emit, emit_must, is_empty }
}
