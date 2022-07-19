import { Module } from 'noose-injection';
import { FlagStorageAnnotation } from './flag-broker-annotation';
import { SQLFlagBroker } from './sql-flag-broker';

export class FlagStorageModule extends Module {
    configure(): void {
        this.registerClass(FlagStorageAnnotation, SQLFlagBroker);
    }
}
