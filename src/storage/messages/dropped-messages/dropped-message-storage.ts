import { DroppedMessage } from '../../../models/messages/dropped-message';
import { Storage } from '../../storage';

export interface DroppedMessageStorage<T = unknown>
    extends Storage<DroppedMessage<T>> {
    findBySubscriberId(id: string): Promise<DroppedMessage<T>>;
}
