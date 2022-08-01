import { Injectable } from 'noose-injection';
import { MessageDataSource } from '../../database/messages/message-data-source';
import { MessageDatabaseAnnotation } from '../../database/messages/message-database-annotations';
import { Message } from '../../models/messages/message';
import { SQLStorage } from '../sql-storage';
import { MessageStorage } from './message-storage';

@Injectable()
export class SQLMessageStorage
    extends SQLStorage<Message>
    implements MessageStorage
{
    constructor(
        @MessageDatabaseAnnotation.inject()
        dataSource: MessageDataSource
    ) {
        super(dataSource.getMessageBroker());
    }

    findByTopic(topic: string): Promise<Message[]> {
        return this.broker.findWhere({
            topic,
        });
    }
}
