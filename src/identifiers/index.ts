import { Module } from 'noose-injection';
import { UUIDIdentifierGeneratorAnnotation } from './identifier-annotations';
import { UUIDIdentifierGenerator } from './uuid-identifier-generator';

export class IdentifierModule extends Module {
    configure(): void {
        this.registerClass(
            UUIDIdentifierGeneratorAnnotation,
            UUIDIdentifierGenerator
        );
    }
}
