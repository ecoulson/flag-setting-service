import { IdentifierModule } from '.';
import { UUIDIdentifierGeneratorAnnotation } from './identifier-annotations';
import { UUIDIdentifierGenerator } from './uuid-identifier-generator';

describe('Identifier Module Test Suite', () => {
    const module = new IdentifierModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should resolve uuid identifier service test suite', () => {
        const service = module.resolve(UUIDIdentifierGeneratorAnnotation);

        expect(service).toBeInstanceOf(UUIDIdentifierGenerator);
    });
});
