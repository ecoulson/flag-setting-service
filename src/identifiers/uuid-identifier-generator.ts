import { IdentifierGenerator } from './identifier-generator';
import { v4 as uuid } from 'uuid';
import { Injectable } from 'noose-injection';

@Injectable()
export class UUIDIdentifierGenerator implements IdentifierGenerator {
    generate(): string {
        return uuid();
    }
}
