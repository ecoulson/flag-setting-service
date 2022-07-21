import { Module } from 'noose-injection';
import { ConsoleLogger } from './console-logger';
import {
    ChalkAnnotation,
    ConsoleLoggerAnnotation,
} from './console-logger-annotations';
import chalk from 'chalk';

export class ConsoleLoggerModule extends Module {
    configure(): void {
        this.registerClass(ConsoleLoggerAnnotation, ConsoleLogger);
        this.registerValue(ChalkAnnotation, chalk);
    }
}
