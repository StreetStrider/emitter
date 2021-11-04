
import { ArgsBase } from './emitter'
import { Subscription } from './emitter'
import { Disposer } from './emitter'

// export type Key = (string | symbol)

type HandlersBase =
{
	[key: string]: ArgsBase,
}

export type MultiEmitter<Handlers extends HandlersBase> =
{
	on   <Key extends keyof Handlers> (key: Key, fn: Subscription<Handlers[Key]>): Disposer,
	emit <Key extends keyof Handlers> (key: Key, ...args: Handlers[Key]): void,
	is_empty (): boolean,
}

export default function<Handlers extends HandlersBase> (): MultiEmitter<Handlers>
