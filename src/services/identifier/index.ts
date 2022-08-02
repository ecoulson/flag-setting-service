import { Module } from 'noose-injection';
import { UUIDIdentifierServiceAnnotation } from './identifier-annotations';
import { UUIDIdentifierService } from './uuid-identifier-service';

export default class IdentifierServiceModule extends Module {
    configure(): void {
        this.registerClass(
            UUIDIdentifierServiceAnnotation,
            UUIDIdentifierService
        );
    }
}
