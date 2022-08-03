import { Optional } from '../../common/optional/optional';
import { Message } from '../../models/messages/message';
import { MessageIdempotencyMapping } from '../../models/messages/message-idempotency-mapping';
import { Broker } from '../broker/broker';
import { DataSource } from '../data-source';

export interface MessageDataSource extends DataSource {
    getMessageBroker(): Optional<Broker<Message>>;
    getMessageIdempotencyBroker(): Optional<Broker<MessageIdempotencyMapping>>;
}
