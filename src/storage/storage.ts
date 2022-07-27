import { Optional } from '../common/optional/optional';

export interface Storage<T> {
    create(entity: T): Promise<Optional<T>>;
    delete(entity: T): Promise<Optional<T>>;
    find(): Promise<T[]>;
    findById(id: string): Promise<Optional<T>>;
    update(entity: T): Promise<Optional<T>>;
}
