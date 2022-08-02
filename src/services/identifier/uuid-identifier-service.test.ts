import { UUIDIdentifierService } from './uuid-identifier-service';

describe('UUID Identifier Service', () => {
    const service = new UUIDIdentifierService();

    test('Should generate a uuid', () => {
        const id = service.generateId();

        expect(id).not.toBeNull();
    });
});
