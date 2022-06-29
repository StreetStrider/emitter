
module.exports = function Emitter ()
{
	var f_one = false
	var f_ext = false

	var fn1 = null
	var fns = []

	function on (fn)
	{
		if (f_ext)
		{
			fns.push(fn)
		}
		else if (f_one)
		{
			fns.push(fn1, fn)
			f_ext = true
			f_one = false
		}
		else
		{
			fn1 = fn
			f_one = true
		}

		return disposer(fn)
	}

	function disposer (fn)
	{
		return () =>
		{
			if (! fn) { return }

			if (f_ext)
			{
				var index = fns.indexOf(fn)
				fns = fns.filter((_, fn_index) => (fn_index !== index))

				if (fns.length === 1)
				{
					fn1 = fns.pop()
					f_ext = false
					f_one = true
				}
			}
			else if (f_one)
			{
				if (fn1 === fn)
				{
					fn1 = null
					f_one = false
				}
			}

			fn = null
		}
	}

	function emit (...args)
	{
		if (f_one)
		{
			fn1(...args)
		}
		else if (f_ext)
		{
			var fnss = fns
			var i = 0
			var L = fnss.length

			for (; (i < L); i++)
			{
				var fn = fnss[i]

				fn(...args)
			}
		}
	}

	function is_empty ()
	{
		return (! (f_ext || f_one))
	}

	return { on, emit, is_empty }
}
