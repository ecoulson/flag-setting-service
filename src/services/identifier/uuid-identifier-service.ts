import { IdentifierService } from './identifier-service';
import { v4 as uuid } from 'uuid';
import { Injectable } from 'noose-injection';

@Injectable()
export class UUIDIdentifierService implements IdentifierService {
    generateId(): string {
        return uuid();
    }
}
