
import type { ArgsBase } from './emitter.js'
import type { Emitter } from './emitter.js'
import type { Subscription } from './emitter.js'
import type { Disposer } from './emitter.js'

declare function once <Args extends ArgsBase> (emitter: Emitter<Args>, fn: Subscription<Args>): Disposer


import type { MultiEmitter } from './multi.js'
import type { HandlersBase } from './multi.js'

declare function multi
<
	Handlers extends HandlersBase,
	Key extends keyof Handlers
>
(multi: MultiEmitter<Handlers>, key: Key, fn: Subscription<Handlers[Key]>): Disposer


declare const Once: typeof once & { multi: typeof multi }
export = Once /* TODO: */
