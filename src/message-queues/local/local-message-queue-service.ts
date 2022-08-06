import { Injectable } from 'noose-injection';
import { Event } from '../../models/events/event';
import { Message } from '../../models/messages/message';
import { MessageStorage } from '../../storage/messages/message-storage';
import { MessageStorageAnnotation } from '../../storage/messages/message-storage-annotations';
import { EventEmitter } from '../../services/events/emitter/event-emitter';
import { EventEmitterAnnotation } from '../../services/events/emitter/event-emitter-annotations';
import { UUIDIdentifierServiceAnnotation } from '../../services/identifier/identifier-annotations';
import { IdentifierService } from '../../services/identifier/identifier-service';
import { MessageQueueIdempotency } from '../idempotency/message-queue-idempotency';
import { MessageQueueIdempotencyAnnotation } from '../idempotency/message-queue-idempotency-annotations';
import { MessageQueueSubscriber } from '../message-queue-subscriber';
import { MessageQueue } from '../message-queue';

@Injectable()
export class LocalMessageQueue implements MessageQueue {
    constructor(
        @EventEmitterAnnotation.inject()
        private readonly eventEmitter: EventEmitter,
        @UUIDIdentifierServiceAnnotation.inject()
        private readonly identifierService: IdentifierService,
        @MessageQueueIdempotencyAnnotation.inject()
        private readonly idempotencyService: MessageQueueIdempotency,
        @MessageStorageAnnotation.inject()
        private readonly messageStorage: MessageStorage
    ) {}

    async subscribe(
        topic: string,
        subscriber: MessageQueueSubscriber
    ): Promise<boolean> {
        return this.eventEmitter.addListener(topic, async (event) => {
            subscriber(await this.ensureMessageExists(event));
        });
    }

    private async ensureMessageExists(event: Event): Promise<Message> {
        const messageId = await this.idempotencyService.getIdempotentId(
            event.id
        );
        const message = await this.messageStorage.findById(messageId);
        if (!message.isEmpty()) {
            return message.get();
        }
        const createdMessage = await this.messageStorage.create(
            new Message(messageId, event.type, event.data)
        );
        return createdMessage.get();
    }

    async publish(message: Message): Promise<boolean> {
        const eventId = this.identifierService.generateId();
        this.eventEmitter.emit(new Event(eventId, message.topic, message.data));
        return true;
    }
}
