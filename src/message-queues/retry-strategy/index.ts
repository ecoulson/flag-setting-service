import { Module } from 'noose-injection';
import { ExecutorModule } from './executor';
import { LinearRetryStrategyModule } from './linear';

export class RetryStrategyModule extends Module {
    configure(): void {
        this.registerModule(new ExecutorModule());
        this.registerModule(new LinearRetryStrategyModule());
    }
}
