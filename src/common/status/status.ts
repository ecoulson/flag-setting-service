import { Optional } from '../optional/optional';
import { StatusType } from './status-type';

export class Status<T> {
    constructor(
        private readonly type_: StatusType,
        private readonly value_: Optional<T>,
        private readonly exception_: Optional<Error>
    ) {}

    public static ok<T>(value: T): Status<T> {
        return new Status<T>(
            StatusType.OK,
            Optional.of(value),
            Optional.empty()
        );
    }

    public static error<T>(error: Error): Status<T> {
        return new Status<T>(
            StatusType.ERROR,
            Optional.empty(),
            Optional.of(error)
        );
    }

    public static async fromPromise<T>(
        promise: Promise<T>
    ): Promise<Status<T>> {
        try {
            return Status.ok(await promise);
        } catch (error) {
            return Status.error(error as Error);
        }
    }

    ok(): boolean {
        return this.type_ === StatusType.OK;
    }

    type(): StatusType {
        return this.type_;
    }

    value(): T {
        return this.value_.get();
    }

    exception(): Error {
        return this.exception_.get();
    }
}
