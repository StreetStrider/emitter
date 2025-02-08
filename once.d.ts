
import type { ArgsBase } from './emitter.js'
import type { On } from './emitter.js'
import type { Subscription } from './emitter.js'
import type { Disposer } from './emitter.js'

declare function once <Args extends ArgsBase> (emitter: On<Args>, fn: Subscription<Args>): Disposer


import type { MultiOn } from './multi.js'
import type { MultiEmitter } from './multi.js'
import type { HandlersBase } from './multi.js'

declare function multi
<
	Handlers extends HandlersBase,
	Key extends keyof Handlers
>
(multi: MultiEmitter<Handlers>, key: Key, fn: Subscription<Handlers[Key]>): Disposer

declare function multi
<
	Key  extends string,
	Data extends ArgsBase
>
(multi: MultiOn<Key, Data>, key: Key, fn: Subscription<Data>): Disposer


declare const Once: typeof once & { multi: typeof multi }
export = Once /* TODO: */
