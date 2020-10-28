
import { expectType } from 'tsd'
import { expectError } from 'tsd'

import { Emitter as EmitterType } from '../'
import { Disposer } from '../'

import Emitter from '../'

var e = Emitter<[string, number]>()

expectType<EmitterType<[string, number]>>(e)

e.on((s: string, n: number) => console.log(s.repeat(n)))
e.on((s, n) => console.log(s.repeat(n)))
e.on((s, n) =>
{
	expectType<string>(s)
	expectType<number>(n)
})
expectError(e.on((a: number, b: number) => console.log(a + b)))
expectError(e.on(true))
expectError(e.on())

e.emit('a', 5)
expectError(e.emit(1, 5))
expectError(e.emit(1))
expectError(e.emit())

var ds = e.on(() => {})
expectType<Disposer>(ds)
ds()
ds()
