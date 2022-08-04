import { ModelModule } from '.';
import { Flag } from './flags/flag';
import { Message } from './messages/message';
import { MessageIdempotencyMapping } from './messages/message-idempotency-mapping';
import { ElapsedTimeMetric } from './metrics/elasped-time-metric';
import {
    ElapsedTimeMetricAnnotation,
    FlagConstructorAnnotation,
    MessageConstructorAnnotation,
    MessageIdempotencyMappingAnnotation,
    UTCDatetimeAnnotation,
} from './model-annotation';
import { UTCDatetime } from './timestamp/utc-datetime';

describe('Model Module Test Suite', () => {
    const module = new ModelModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should resolve the flag constructor', () => {
        const flagConstructor = module.resolve(FlagConstructorAnnotation);

        expect(flagConstructor).toEqual(Flag);
    });

    test('Should resolve the message constructor', () => {
        const messageConstructor = module.resolve(MessageConstructorAnnotation);

        expect(messageConstructor).toEqual(Message);
    });

    test('Should resolve the elapsed time metric constructor', () => {
        const elapsedTimeMetric = module.resolve(ElapsedTimeMetricAnnotation);

        expect(elapsedTimeMetric).toEqual(ElapsedTimeMetric);
    });

    test('Should resolve the message idempotency mapping constructor', () => {
        const elapsedTimeMetric = module.resolve(
            MessageIdempotencyMappingAnnotation
        );

        expect(elapsedTimeMetric).toEqual(MessageIdempotencyMapping);
    });

    test('Should resolve the utc datetime constructor', () => {
        const utcDatetime = module.resolve(UTCDatetimeAnnotation);

        expect(utcDatetime).toEqual(UTCDatetime);
    });
});
