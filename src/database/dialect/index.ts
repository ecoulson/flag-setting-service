import { Module } from 'noose-injection';
import { DialectAnnotation } from './dialect-annotations';
import { SystemEnvironmentDialect } from './system-environment-dialect';

export class DialectModule extends Module {
    configure(): void {
        this.registerClass(DialectAnnotation, SystemEnvironmentDialect);
    }
}
