
import type { ArgsBase } from './emitter.js'
import type { Subscription } from './emitter.js'
import type { Disposer } from './emitter.js'

/* export type Key = (string | symbol) */


declare namespace MultiEmitter
{

type HandlersBase =
{
	[key: string]: ArgsBase,
}

export type MultiEmitter <Handlers extends HandlersBase> =
{
	on   <Key extends keyof Handlers> (key: Key, fn: Subscription<Handlers[Key]>): Disposer,
	emit <Key extends keyof Handlers> (key: Key, ...args: Handlers[Key]): void,
	is_empty (): boolean,
}

export type MultiOn <Key extends string, Data extends ArgsBase> =
{
	on (key: Key, fn: Subscription<Data>): Disposer,
}

}

declare function MultiEmitter <Handlers extends MultiEmitter.HandlersBase> (): MultiEmitter.MultiEmitter<Handlers>

export = MultiEmitter /* TODO: */
