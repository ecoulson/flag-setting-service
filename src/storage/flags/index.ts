import { Module } from 'noose-injection';
import { FlagStorageAnnotation } from './flag-storage-annotations';
import { SQLFlagStorage } from './sql-flag-storage';

export class FlagStorageModule extends Module {
    configure(): void {
        this.registerClass(FlagStorageAnnotation, SQLFlagStorage);
    }
}
