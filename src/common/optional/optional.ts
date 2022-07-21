export class Optional<T> {
    constructor(private readonly value?: T | null) {}

    static empty<T>() {
        return new Optional<T>();
    }

    static of<T>(value?: T | null): Optional<T> {
        return new Optional<T>(value);
    }

    static ofPromise<T>(value?: Promise<T | null>): Promise<Optional<T>> {
        return new Promise(async (resolve) => {
            try {
                resolve(Optional.of(await value));
            } catch (error) {
                console.log(error);
                resolve(Optional.empty());
            }
        });
    }

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

    getOrDefault(defaultValue: T): T {
        if (this.isEmpty()) {
            return defaultValue;
        }
        return this.get();
    }
}
