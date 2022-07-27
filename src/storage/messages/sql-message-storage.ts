import { Injectable } from 'noose-injection';
import { Repository } from 'typeorm';
import { MessageTypeORMRepositoryAnnotation } from '../../database/typeorm/repositories/repository-annotations';
import { Message } from '../../models/messages/message';
import { SQLStorage } from '../sql-storage';
import { MessageStorage } from './message-storage';

@Injectable()
export class SQLMessageStorage
    extends SQLStorage<Message>
    implements MessageStorage
{
    constructor(
        @MessageTypeORMRepositoryAnnotation.inject()
        repository: Repository<Message>
    ) {
        super(repository);
    }

    findByTopic(topic: string): Promise<Message[]> {
        return this.repository.find({
            where: {
                topic,
            },
        });
    }
}
