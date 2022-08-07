import { Status } from '../../common/status/status';
import { Event } from '../../models/events/event';
import { MessageQueueSubscriber } from '../../models/message-queue/message-queue-subscriber';

export interface NotificationStrategy {
    notify(subscriber: MessageQueueSubscriber, event: Event): Promise<Status>;
}
