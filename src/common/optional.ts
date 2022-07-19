export class Optional<T> {
    constructor(private readonly value?: T) {}

    isEmpty(): boolean {
        return this.value === null || this.value === undefined;
    }

    isPresent(): boolean {
        return !this.isEmpty();
    }

    get(): T {
        if (this.isEmpty()) {
            throw new Error('Can not get value of an empty optional.');
        }
        return this.value as T;
    }
}
