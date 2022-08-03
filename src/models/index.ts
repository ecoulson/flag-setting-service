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
} from './model-annotation';

export class ModelModule extends Module {
    configure(): void {
        this.registerValue(FlagConstructorAnnotation, Flag);
        this.registerValue(MessageConstructorAnnotation, Message);
        this.registerValue(ElapsedTimeMetricAnnotation, ElapsedTimeMetric);
        this.registerValue(
            MessageIdempotencyMappingAnnotation,
            MessageIdempotencyMapping
        );
    }
}
