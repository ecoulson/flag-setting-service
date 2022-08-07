import { Status } from './status';
import { StatusType } from './status-type';

describe('Status Test Suite', () => {
    test('Should create an ok status with no value', () => {
        const status = Status.ok();

        expect(status.type()).toEqual(StatusType.OK);
        expect(status.ok()).toBeTruthy();
    });

    test('Should create an ok status with a value', () => {
        const status = Status.ok(100);

        expect(status.type()).toEqual(StatusType.OK);
        expect(status.ok()).toBeTruthy();
        expect(status.value()).toEqual(100);
    });

    test('Should create an error status with no exception', () => {
        const status = Status.error();

        expect(status.type()).toEqual(StatusType.ERROR);
        expect(status.ok()).toBeFalsy();
    });

    test('Should create an error status with an exception', () => {
        const inputError = new Error();
        const expectedError = inputError;

        const status = Status.error(inputError);

        expect(status.type()).toEqual(StatusType.ERROR);
        expect(status.ok()).toBeFalsy();
        expect(status.exception()).toEqual(expectedError);
    });

    test('Should create an ok status from a promise', async () => {
        const status = await Status.fromPromise(Promise.resolve(100));

        expect(status.type()).toEqual(StatusType.OK);
        expect(status.ok()).toBeTruthy();
        expect(status.value()).toEqual(100);
    });

    test('Should create an error status from a promise', async () => {
        const error = new Error();

        const status = await Status.fromPromise(Promise.reject(error));

        expect(status.type()).toEqual(StatusType.ERROR);
        expect(status.ok()).toBeFalsy();
        expect(status.exception()).toEqual(error);
    });
});
