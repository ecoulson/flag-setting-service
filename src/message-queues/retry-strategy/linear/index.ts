import { Module } from 'noose-injection';
import { Time } from '../../../models/time/time';
import { TimeUnit } from '../../../models/time/time-unit';
import { LinearRetryStrategy } from './linear-retry-strategy';
import {
    LinearRetryStrategyAnnotation,
    LinearRetryStrategyAttemptsAnnotation,
    LinearRetryStrategyDelayAnnotation,
} from './linear-retry-strategy-annotations';

export class LinearRetryStrategyModule extends Module {
    configure(): void {
        this.registerValue(
            LinearRetryStrategyDelayAnnotation,
            new Time(1000, TimeUnit.Miliseconds)
        );
        this.registerValue(LinearRetryStrategyAttemptsAnnotation, 5);
        this.registerClass(LinearRetryStrategyAnnotation, LinearRetryStrategy);
    }
}
