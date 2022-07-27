export class Event<T = unknown> {
    id(): string {
        throw new Error();
    }

    type(): string {
        throw new Error();
    }

    data(): T {
        throw new Error();
    }
}
