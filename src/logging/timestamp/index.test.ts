import { TimestampModule } from '.';
import {
    TimestampFormatterAnnotation,
    TimestampGeneratorAnnotation,
} from './timestamp-annotations';

describe('Timestamp Module Test Suite', () => {
    const module = new TimestampModule();

    beforeAll(() => {
        module.configure();
    });

    test('Should resolve the timestamp generator', () => {
        const generator = module.resolve(TimestampGeneratorAnnotation);

        expect(generator).not.toBeNull();
    });

    test('Should resolve the timestamp formatter', () => {
        const generator = module.resolve(TimestampFormatterAnnotation);

        expect(generator).not.toBeNull();
    });
});
