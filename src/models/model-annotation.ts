import { Annotation } from 'noose-injection';

export const FlagConstructorAnnotation = new Annotation('FlagConstructor');
export const MessageConstructorAnnotation = new Annotation(
    'MessageConstructor'
);
export const ElapsedTimeMetricAnnotation = new Annotation('ElapsedTimeMetric');
export const MessageIdempotencyMappingAnnotation = new Annotation(
    'MessageIdempotencyMapping'
);
export const UTCDatetimeAnnotation = new Annotation('UTCDatetime');
export const DroppedMessageAnnotation = new Annotation('DroppedMessage');
