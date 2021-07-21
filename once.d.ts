
import { ArgsBase } from './emitter'
import { Emitter } from './emitter'
import { Subscription } from './emitter'
import { Disposer } from './emitter'

export default function<Args extends ArgsBase> (emitter: Emitter<Args>, fn: Subscription<Args>): Disposer


import { MultiEmitter } from './multi'
import { HandlersBase } from './multi'

export function multi
<
	Handlers extends HandlersBase,
	Key extends keyof Handlers
>
(multi: MultiEmitter<Handlers>, key: Key, fn: Subscription<Handlers[Key]>): Disposer
