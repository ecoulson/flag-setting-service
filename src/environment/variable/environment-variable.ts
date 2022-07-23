export class EnvironmentVariable {
    constructor(private readonly key: string) {}

    name(): string {
        return this.key;
    }
}
