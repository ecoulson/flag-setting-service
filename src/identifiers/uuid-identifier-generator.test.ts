import { UUIDIdentifierGenerator } from './uuid-identifier-generator';

describe('UUID Identifier Service', () => {
    const service = new UUIDIdentifierGenerator();

    test('Should generate a uuid', () => {
        const id = service.generate();

        expect(id).not.toBeNull();
    });
});
