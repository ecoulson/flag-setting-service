import { Module } from 'noose-injection';
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

export class ModelModule extends Module {
    configure(): void {
        this.registerValue(FlagConstructorAnnotation, Flag);
        this.registerValue(MessageConstructorAnnotation, Message);
        this.registerValue(ElapsedTimeMetricAnnotation, ElapsedTimeMetric);
        this.registerValue(
            MessageIdempotencyMappingAnnotation,
            MessageIdempotencyMapping
        );
        this.registerValue(UTCDatetimeAnnotation, UTCDatetime);
    }
}
