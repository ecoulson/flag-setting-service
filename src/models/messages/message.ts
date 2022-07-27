export class Message<T = unknown> {
    constructor(private readonly _topic: string, private readonly _data: T) {}

    public topic(): string {
        throw new Error();
    }

    public data(): T {
        throw new Error();
    }
}
