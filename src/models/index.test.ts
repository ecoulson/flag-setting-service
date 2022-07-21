import { ModelModule } from '.';
import { FlagConstructorAnnotation } from './model-annotation';

describe('Model Module Test Suite', () => {
    const module = new ModelModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should resolve the flag constructor', () => {
        const flagConstructor = module.resolve(FlagConstructorAnnotation);

        expect(flagConstructor).not.toBeNull();
    });
});
