import { ISO8601TimestampFormatter } from './iso8601-timestamp-formatter';
import { UTCDatetime } from './utc-datetime';

describe('ISO 8601 Timestamp Formatter Test Suite', () => {
    const formatter = new ISO8601TimestampFormatter();

    test('Should format the timestamp in iso8601 format', () => {
        const datetime = new UTCDatetime(2022, 7, 1, 9, 2, 1, 1);

        const formattedTimestamp = formatter.format(datetime);

        expect(formattedTimestamp).toEqual('2022-07-01T09:02:01.01Z');
    });

    test('Should format the timestamp in iso8601 format', () => {
        const datetime = new UTCDatetime(2022, 12, 11, 19, 12, 11, 11);

        const formattedTimestamp = formatter.format(datetime);

        expect(formattedTimestamp).toEqual('2022-12-11T19:12:11.11Z');
    });
});
