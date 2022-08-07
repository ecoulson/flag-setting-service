import { Annotation } from 'noose-injection';

export const LinearRetryStrategyAnnotation = new Annotation(
    'LinearRetryStrategy'
);

export const LinearRetryStrategyDelayAnnotation = new Annotation(
    'LinearRetryStrategyDelay'
);

export const LinearRetryStrategyAttemptsAnnotation = new Annotation(
    'LinearRetryStrategyAttempts'
);
