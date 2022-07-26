import { DebugStringBuilder } from './debug-string-builder';

describe('Debug String Builder Test Suite', () => {
    test('Should build a debug string', () => {
        const object = {
            a: 1,
            b: 2,
        };
        const builder = new DebugStringBuilder();
        const expectedDebugString = JSON.stringify(object, null, 4);

        const actualDebugString = builder.setObject(object).build();

        expect(actualDebugString).toEqual(expectedDebugString);
    });

    test('Should return an error debug string message', () => {
        const builder = new DebugStringBuilder();
        const expectedDebugString =
            'No object was passed to the debug string builder.';

        const actualDebugString = builder.build();

        expect(actualDebugString).toEqual(expectedDebugString);
    });
});
