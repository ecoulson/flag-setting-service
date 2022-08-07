import { Module } from 'noose-injection';
import { ScheduledExecutorAnnotation } from './executor-annotation';
import { ScheduledExecutor } from './scheduled-executor';

export class ExecutorModule extends Module {
    configure(): void {
        this.registerClass(ScheduledExecutorAnnotation, ScheduledExecutor);
    }
}
