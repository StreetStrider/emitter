
import { Disposer } from '../'



//
/* Slot */
import Slot from '../slot'

var s = Slot<[string, number]>()

s // $ExpectType Emitter<[string, number]>

s.on((s: string, n: number) => console.log(s.repeat(n)))
s.on((s, n) => console.log(s.repeat(n)))
s.on((s, n) =>
{
	s // $ExpectType string
	n // $ExpectType number
})

once(s, (s: string, n: number) => console.log(s.repeat(n)))
once(s, (s, n) => console.log(s.repeat(n)))
once(s, (s, n) =>
{
	s // $ExpectType string
	n // $ExpectType number
})

async function wait_slot ()
{
	var r = await when(s)
	r // $ExpectType string

	var e_void = E<[]>()

	var r_void = await when(e_void)
	r_void // $ExpectType undefined
}

// $ExpectError
s.on((a: number, b: number) => console.log(a + b))
// $ExpectError
s.on(true)
// $ExpectError
s.on()

// $ExpectError
once(s)

async function wait_error_slot ()
{
// $ExpectError
	await when(s, (a: number, b: number) => console.log(a + b))
}

s.emit('a', 5)

// $ExpectError
s.emit(1, 5)
// $ExpectError
s.emit(1)
// $ExpectError
s.emit()

// $ExpectType Disposer
var ds = s.on(() => {})

ds()
ds()

if (s.is_empty())
{
	console.log('empty')
}

// $ExpectError
console.log(s.is_empty() + 1)


//
/* Emitter */
import { Emitter } from '../'
import E from '../'
import once from '../once'
import when from '../when'

var e = E<[string, number]>()

e // $ExpectType Emitter<[string, number]>

e.on((s: string, n: number) => console.log(s.repeat(n)))
e.on((s, n) => console.log(s.repeat(n)))
e.on((s, n) =>
{
	s // $ExpectType string
	n // $ExpectType number
})

once(e, (s: string, n: number) => console.log(s.repeat(n)))
once(e, (s, n) => console.log(s.repeat(n)))
once(e, (s, n) =>
{
	s // $ExpectType string
	n // $ExpectType number
})

async function wait ()
{
	var r = await when(e)
	r // $ExpectType string

	var e_void = E<[]>()

	var r_void = await when(e_void)
	r_void // $ExpectType undefined
}

// $ExpectError
e.on((a: number, b: number) => console.log(a + b))
// $ExpectError
e.on(true)
// $ExpectError
e.on()

// $ExpectError
once((a: number, b: number) => console.log(a + b))
// $ExpectError
once(null, (a: number, b: number) => console.log(a + b))
// $ExpectError
once(e)
// $ExpectError
once(true)
// $ExpectError
once()

async function wait_error ()
{
// $ExpectError
	await when(e, (a: number, b: number) => console.log(a + b))

// $ExpectError
	await when((a: number, b: number) => console.log(a + b))

// $ExpectError
	await when(null, (a: number, b: number) => console.log(a + b))

// $ExpectError
	await when(null)

// $ExpectError
	await when(true)

// $ExpectError
	await when()
}

e.emit('a', 5)

// $ExpectError
e.emit(1, 5)
// $ExpectError
e.emit(1)
// $ExpectError
e.emit()

// $ExpectType Disposer
var ds = e.on(() => {})

ds()
ds()

if (e.is_empty())
{
	console.log('empty')
}

// $ExpectError
console.log(e.is_empty() + 1)


//
/* MultiEmitter */
import { MultiEmitter } from '../multi'
import M from '../multi'
import { multi as once_multi } from '../once'
import { multi as when_multi } from '../when'

var m = M<{ a: [string, number], b: [boolean] }>()

m // $ExpectType MultiEmitter<{ a: [string, number]; b: [boolean]; }>

m.on('a', (s, n) =>
{
	s // $ExpectType string
	n // $ExpectType number
})

m.on('b', (b) =>
{
	b // $ExpectType boolean
})

once_multi(m, 'a', (s, n) =>
{
	s // $ExpectType string
	n // $ExpectType number
})
once_multi(m, 'b', (b) =>
{
	b // $ExpectType boolean
})

async function wait_multi ()
{
	var s = await when_multi(m, 'a')
	s // $ExpectType string

	var b = await when_multi(m, 'b')
	b // $ExpectType boolean

	var m_void = M<{ a: [] }>()

	var r_void = await when_multi(m_void, 'a')
	r_void // $ExpectType undefined
}

// $ExpectError
m.on('b', (n: number) => {})

// $ExpectError
m.on('a')

// $ExpectError
m.on('a', true)

// $ExpectError
m.on(true, true)

// $ExpectError
m.on('c', () => {})

// $ExpectError
once_multi((s: string, n: number) => {})
// $ExpectError
once_multi(null, (s: string, n: number) => {})
// $ExpectError
once_multi(m)
// $ExpectError
once_multi(true)
// $ExpectError
once_multi()

async function wait_error_multi ()
{
// $ExpectError
	await when_multi(m, 'a', (a: number, b: number) => console.log(a + b))

// $ExpectError
	await when_multi('a', (a: number, b: number) => console.log(a + b))

// $ExpectError
	await when_multi((a: number, b: number) => console.log(a + b))

// $ExpectError
	await when_multi(null, 'a', (a: number, b: number) => console.log(a + b))

// $ExpectError
	await when_multi(null)

// $ExpectError
	await when_multi(true)

// $ExpectError
	await when_multi()

// $ExpectError
	await when_multi(m, 'c')
}


/* cross-once: */
// $ExpectError
once(m, (a: number, b: number) => console.log(a + b))
// $ExpectError
multi_once(e, 'b', (b) => {})
