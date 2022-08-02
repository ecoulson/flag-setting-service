export class Event<T = unknown> {
    constructor(
        public readonly id: string,
        public readonly type: string,
        public readonly data: T
    ) {}
}
