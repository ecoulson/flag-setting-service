import IdentifierServiceModule from '.';
import { UUIDIdentifierServiceAnnotation } from './identifier-annotations';

describe('Identifier Service Module Test Suite', () => {
    const module = new IdentifierServiceModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should resolve uuid identifier service test suite', () => {
        const service = module.resolve(UUIDIdentifierServiceAnnotation);

        expect(service).not.toBeNull();
    });
});
