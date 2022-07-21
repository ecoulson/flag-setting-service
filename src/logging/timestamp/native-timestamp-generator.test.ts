import { NativeTimestampGenerator } from './native-timestamp-generator';

describe('Native Timestamp Generator Test Suite', () => {
    const timestampGenerator = new NativeTimestampGenerator();

    test('Should generate the current timestamp', () => {
        const timestamp = timestampGenerator.generateCurrentTimestamp();

        expect(timestamp).not.toBeNull();
    });
});
