
import type { ArgsBase } from './emitter.js'
import type { Emitter } from './emitter.js'
import type { Subscription } from './emitter.js'
import type { Disposer } from './emitter.js'

type First<Args extends ArgsBase> = Args extends [] ? undefined : Args[0]

declare function when <Args extends ArgsBase> (emitter: Emitter<Args>): Promise<First<Args>>


import type { MultiEmitter } from './multi.js'
import type { HandlersBase } from './multi.js'

declare function multi
<
	Handlers extends HandlersBase,
	Key extends keyof Handlers
>
(multi: MultiEmitter<Handlers>, key: Key): Promise<First<Handlers[Key]>>


declare const When: typeof when & { multi: typeof multi }
export = When
