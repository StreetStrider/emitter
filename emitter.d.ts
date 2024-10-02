
declare namespace Emitter
{

export type ArgsBase = any[]

export type Subscription <Args extends ArgsBase> = (...args: Args) => void

export type Disposer = () => void

export type Emitter <Args extends ArgsBase> =
{
	on (fn: Subscription<Args>): Disposer,
	emit (...args: Args): void,
	is_empty (): boolean,
}

}

declare function Emitter <Args extends Emitter.ArgsBase> (): Emitter.Emitter<Args>

export = Emitter
