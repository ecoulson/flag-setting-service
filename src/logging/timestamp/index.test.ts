import { TimestampModule } from '.';
import { ISO8601TimestampFormatter } from './iso8601-timestamp-formatter';
import { NativeTimestampGenerator } from './native-timestamp-generator';
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

        expect(generator).toBeInstanceOf(NativeTimestampGenerator);
    });

    test('Should resolve the timestamp formatter', () => {
        const generator = module.resolve(TimestampFormatterAnnotation);

        expect(generator).toBeInstanceOf(ISO8601TimestampFormatter);
    });
});
