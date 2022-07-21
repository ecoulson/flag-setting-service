import { UTCDatetime } from './utc-datetime';

describe('Should constructor the utc datetime object', () => {
    test('Should create a utc date time', () => {
        const datetime = new UTCDatetime(2022, 7, 21, 0, 55, 1, 1);

        expect(datetime.year()).toEqual(2022);
        expect(datetime.month()).toEqual(7);
        expect(datetime.date()).toEqual(21);
        expect(datetime.hour()).toEqual(0);
        expect(datetime.minute()).toEqual(55);
        expect(datetime.second()).toEqual(1);
        expect(datetime.milisecond()).toEqual(1);
    });
});
