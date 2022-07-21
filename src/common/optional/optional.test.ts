import { Optional } from './optional';

describe('Optional Test Suite', () => {
    describe('isEmpty', () => {
        test('Should be true when optional is empty', () => {
            const optional = new Optional<number>();

            expect(optional.isEmpty()).toBeTruthy();
        });

        test('Should be false when optional is not empty', () => {
            const optional = new Optional<number>(100);

            expect(optional.isEmpty()).toBeFalsy();
        });
    });

    describe('isPresent', () => {
        test('Should be false when optional is empty', () => {
            const optional = new Optional<number>();

            expect(optional.isPresent()).toBeFalsy();
        });

        test('Should be true when optional is not empty', () => {
            const optional = new Optional<number>(100);

            expect(optional.isPresent()).toBeTruthy();
        });
    });

    describe('get', () => {
        test('Should get the value when the optional is not empty', () => {
            const optional = new Optional<number>(100);

            const value = optional.get();

            expect(value).toEqual(100);
        });

        test('Should throw an error when the optional is empty', () => {
            expect(() => {
                const optional = new Optional<number>();

                optional.get();
            }).toThrowError(
                new Error('Can not get value of an empty optional.')
            );
        });
    });

    describe('empty constructor', () => {
        test('Should create an empty optional', () => {
            const optional = Optional.empty();

            expect(optional.isEmpty()).toBeTruthy();
        });
    });

    describe('of constructor', () => {
        test('Should create an optional with a value', () => {
            const optional = Optional.of(100);

            expect(optional.get()).toEqual(100);
        });
    });

    describe('ofPromise constructor', () => {
        test('Should create an optional with a value when promise resolves', async () => {
            const optional = await Optional.ofPromise(Promise.resolve(100));

            expect(optional.get()).toEqual(100);
        });
    });

    describe('getOrDefault', () => {
        test('Should get default value', () => {
            const optional = Optional.empty();

            const result = optional.getOrDefault(100);

            expect(result).toEqual(100);
        });

        test('Should get the optional value', () => {
            const optional = Optional.of(20);

            const result = optional.getOrDefault(100);

            expect(result).toEqual(20);
        });
    });
});
