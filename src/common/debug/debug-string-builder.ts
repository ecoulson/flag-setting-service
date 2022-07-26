import { Optional } from '../optional/optional';

export class DebugStringBuilder {
    private object: Optional<any>;

    constructor() {
        this.object = Optional.empty();
    }

    setObject(object: any): DebugStringBuilder {
        this.object = Optional.of(object);
        return this;
    }

    build(): string {
        if (this.object.isEmpty()) {
            return 'No object was passed to the debug string builder.';
        }
        return JSON.stringify(this.object.get(), null, 4);
    }
}
