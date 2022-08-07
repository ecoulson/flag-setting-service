import { Injectable } from 'noose-injection';
import { Event } from '../../models/events/event';
import { Message } from '../../models/messages/message';
import { MessageStorage } from '../../storage/messages/message-storage';
import { MessageStorageAnnotation } from '../../storage/messages/message-storage-annotations';
import { EventEmitter } from '../../events/emitter/event-emitter';
import { EventEmitterAnnotation } from '../../events/emitter/event-emitter-annotations';
import { UUIDIdentifierGeneratorAnnotation } from '../../identifiers/identifier-annotations';
import { IdentifierGenerator } from '../../identifiers/identifier-generator';
import { MessageQueueIdempotency } from '../idempotency/message-queue-idempotency';
import { MessageQueueIdempotencyAnnotation } from '../idempotency/message-queue-idempotency-annotations';
import { MessageQueueSubscriberHandler } from '../../models/message-queue/message-queue-subscriber-handler';
import { MessageQueue } from '../message-queue';
import { Optional } from '../../common/optional/optional';
import { MessageQueueSubscriber } from '../../models/message-queue/message-queue-subscriber';
import { Status } from '../../common/status/status';

@Injectable()
export class LocalMessageQueue implements MessageQueue {
    constructor(
        @EventEmitterAnnotation.inject()
        private readonly eventEmitter: EventEmitter,
        @UUIDIdentifierGeneratorAnnotation.inject()
        private readonly identifierService: IdentifierGenerator,
        @MessageQueueIdempotencyAnnotation.inject()
        private readonly idempotencyService: MessageQueueIdempotency,
        @MessageStorageAnnotation.inject()
        private readonly messageStorage: MessageStorage
    ) {}

    async subscribe(
        topic: string,
        subscriber: MessageQueueSubscriber
    ): Promise<Status> {
        return this.eventEmitter.addListener(topic, async (event) => {
            subscriber.handler(await this.retrieveMessage(event));
        });
    }

    private async retrieveMessage(event: Event): Promise<Message> {
        const messageId = await this.idempotencyService.getIdempotentId(
            event.id
        );
        const message = await this.messageStorage.findById(messageId);
        return message.get();
    }

    async publish(message: Message): Promise<Status> {
        const eventId = this.identifierService.generate();
        message.id = await this.idempotencyService.getIdempotentId(eventId);
        this.eventEmitter.emit(new Event(eventId, message.topic, message.data));
        await this.messageStorage.create(message);
        return Status.ok();
    }
}
