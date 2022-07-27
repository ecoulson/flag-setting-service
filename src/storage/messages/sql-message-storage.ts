import { Optional } from '../../common/optional/optional';
import { Message } from '../../models/messages/message';
import { Storage } from '../storage';

export class SQLMessageStorage implements Storage<Message> {
    create(entity: Message<unknown>): Promise<Optional<Message<unknown>>> {
        throw new Error('Method not implemented.');
    }
    delete(entity: Message<unknown>): Promise<Optional<Message<unknown>>> {
        throw new Error('Method not implemented.');
    }
    find(): Promise<Message<unknown>[]> {
        throw new Error('Method not implemented.');
    }
    findById(id: string): Promise<Optional<Message<unknown>>> {
        throw new Error('Method not implemented.');
    }
    update(entity: Message<unknown>): Promise<Optional<Message<unknown>>> {
        throw new Error('Method not implemented.');
    }
}
