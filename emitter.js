
module.exports = function Emitter ()
{
	var j = 0
	var f_one = false
	var f_ext = 0

	var fn1 = null
	var fns = null

	function on (fn)
	{
		if (f_ext)
		{
			fns = [].concat(fns, fn)
			f_ext++
		}
		else if (f_one)
		{
			fns = [ fn1, fn ]

			f_ext = 2
			j = 2

			fn1 = null
			f_one = false
		}
		else
		{
			fn1 = fn
			f_one = true
			j = 1
		}

		return disposer(fn)
	}

	/* eslint-disable complexity */
	function disposer (fn)
	{
		return () =>
		{
			if (! fn) { return }

			if (f_ext)
			{
				var index = fns.indexOf(fn)
				if (index !== -1)
				{
					fns = fns.filter((_, fn_index) => (fn_index !== index))
					f_ext--

					if (f_ext === 1)
					{
						fn1 = fns[0]
						f_one = true
						j = 1

						fns = null
						f_ext = 0
					}
				}
			}
			else if (f_one)
			{
				if (fn1 === fn)
				{
					fn1 = null
					f_one = false
					j = 0
				}
			}

			fn = null
		}
	}
	/* eslint-enable complexity */

	function emit (...args)
	{
		switch (j)
		{
		case 1:
			fn1(...args)
			return
		case 0:
			return
		default:
			var fnss = fns
			var L = f_ext

			for (var i = 0; (i < L); i++)
			{
				var fn = fnss[i]

				fn(...args)
			}
		}
	}

	function is_empty ()
	{
		return (! j)
	}

	return { on, emit, is_empty }
}
