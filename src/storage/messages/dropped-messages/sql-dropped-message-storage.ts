import { Injectable } from 'noose-injection';
import { MessageDataSource } from '../../../database/messages/message-data-source';
import { MessageDatabaseAnnotation } from '../../../database/messages/message-database-annotations';
import { Logger } from '../../../logging/logger';
import { LoggerAnnotation } from '../../../logging/logging-annotations';
import { DroppedMessage } from '../../../models/messages/dropped-message';
import { SQLStorage } from '../../sql-storage';
import { DroppedMessageStorage } from './dropped-message-storage';

@Injectable()
export class SQLDroppedMessageStorage
    extends SQLStorage<DroppedMessage>
    implements DroppedMessageStorage
{
    constructor(
        @MessageDatabaseAnnotation.inject() dataSource: MessageDataSource,
        @LoggerAnnotation.inject() logger: Logger
    ) {
        super(dataSource.getDroppedMessageBroker(), logger);
    }

    async findBySubscriberId(id: string): Promise<DroppedMessage[]> {
        return this.broker.findWhere({
            subscriberId: id,
        });
    }
}
