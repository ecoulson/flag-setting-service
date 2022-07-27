import { Optional } from '../common/optional/optional';
import { Identifiable } from '../models/identifiable';

export interface Storage<T extends Identifiable> {
    create(entity: T): Promise<Optional<T>>;
    delete(entity: T): Promise<Optional<T>>;
    find(): Promise<T[]>;
    findById(id: string): Promise<Optional<T>>;
    update(entity: T): Promise<Optional<T>>;
}
