import { Injectable } from 'noose-injection';
import { Optional } from '../../../common/optional/optional';
import { MessageDataSource } from '../../../database/messages/message-data-source';
import { MessageDatabaseAnnotation } from '../../../database/messages/message-database-annotations';
import { Logger } from '../../../logging/logger';
import { LoggerAnnotation } from '../../../logging/logging-annotations';
import { MessageIdempotencyMapping } from '../../../models/messages/message-idempotency-mapping';
import { SQLStorage } from '../../sql-storage';
import { MessageIdempotencyStorage } from './message-idempotency-storage';

@Injectable()
export class SQLMessageIdempotencyStorage
    extends SQLStorage<MessageIdempotencyMapping>
    implements MessageIdempotencyStorage
{
    constructor(
        @MessageDatabaseAnnotation.inject() dataSource: MessageDataSource,
        @LoggerAnnotation.inject() logger: Logger
    ) {
        super(dataSource.getMessageIdempotencyBroker(), logger);
    }

    findMappingByIdempotentId(
        idempotentId: string
    ): Promise<Optional<MessageIdempotencyMapping>> {
        return Optional.ofPromise(
            this.broker.findOneWhere({
                idempotentId,
            })
        );
    }
}
