
import { ArgsBase } from './emitter'
import { Subscription } from './emitter'
import { Disposer } from './emitter'

export type Key = (string | symbol)

interface HandlersBase =
{
	[key: Key]: Subscription<ArgsBase>,
}

/* TODO:
interface HandlersDefault extends HandlersBase
{
	[key: Key]: never,
}
*/

export type MultiEmitter<Handlers extends HandlersBase> =
{
	on   <Key extends keyof Handlers> (key: Key, fn: Handlers[Key]): Disposer,
	emit <Key extends keyof Handlers> (key: Key, ...args: Parameters<Handlers[Key]>): void,
	is_empty (): boolean,
}

export default function<Handlers extends HandlersBase> (): MultiEmitter<Args>
