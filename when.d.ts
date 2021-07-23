
import { ArgsBase } from './emitter'
import { Emitter } from './emitter'
import { Subscription } from './emitter'
import { Disposer } from './emitter'

type First<Args extends ArgsBase> = Args extends [] ? undefined : Args[0]

export default function<Args extends ArgsBase> (emitter: Emitter<Args>): Promise<First<Args>>


import { MultiEmitter } from './multi'
import { HandlersBase } from './multi'

export function multi
<
	Handlers extends HandlersBase,
	Key extends keyof Handlers
>
(multi: MultiEmitter<Handlers>, key: Key): Promise<First<Handlers[Key]>>
