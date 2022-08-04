import {
    anyOfClass,
    capture,
    instance,
    mock,
    reset,
    verify,
    when,
} from 'ts-mockito';
import { Optional } from '../../../common/optional/optional';
import { MessageIdempotencyMapping } from '../../../models/messages/message-idempotency-mapping';
import { MessageIdempotencyStorage } from '../../../storage/messages/idempotency/message-idempotency-storage';
import { IdentifierService } from '../../identifier/identifier-service';
import { StoredMessageIdempotencyService } from './stored-message-idempotency-service';

describe('Stored Message Idempotency Service Test Suite', () => {
    const eventId = '07873314-86e5-46c1-92ca-41643e7ae2da';
    const idempotentId = 'bd32ed0f-428d-4f1d-946b-3482c1b8664c';
    const mockedIdentifierService = mock<IdentifierService>();
    const mockedStorage = mock<MessageIdempotencyStorage>();
    const service = new StoredMessageIdempotencyService(
        instance(mockedStorage),
        instance(mockedIdentifierService)
    );

    beforeEach(() => {
        reset(mockedIdentifierService);
        reset(mockedStorage);
    });

    test('Should get a message id when a mapping exists', async () => {
        const mapping = new MessageIdempotencyMapping(eventId, idempotentId);
        when(mockedStorage.findById(eventId)).thenResolve(Optional.of(mapping));

        const id = await service.getIdempotentId(eventId);

        expect(id).toEqual(idempotentId);
        verify(mockedStorage.findById(eventId)).once();
        verify(mockedIdentifierService.generateId()).never();
    });

    test('Should create mapping when no mapping exists for an event id', async () => {
        const expectedMapping = new MessageIdempotencyMapping(
            eventId,
            idempotentId
        );
        when(mockedStorage.findById(eventId)).thenResolve(Optional.empty());
        when(
            mockedStorage.create(anyOfClass(MessageIdempotencyMapping))
        ).thenResolve(Optional.of(expectedMapping));
        when(mockedIdentifierService.generateId()).thenReturn(idempotentId);

        const id = await service.getIdempotentId(eventId);

        expect(id).toEqual(idempotentId);
        verify(mockedStorage.findById(eventId)).once();
        verify(
            mockedStorage.create(anyOfClass(MessageIdempotencyMapping))
        ).once();
        verify(mockedIdentifierService.generateId()).once();
        const [actualMapping] = capture(mockedStorage.create).last();
        expect(actualMapping).toEqual(expectedMapping);
    });
});
