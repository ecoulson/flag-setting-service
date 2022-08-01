import { Message } from '../../models/messages/message';
import { Broker } from '../broker/broker';
import { DataSource } from '../data-source';

export interface MessageDataSource extends DataSource {
    getMessageBroker(): Broker<Message>;
}
