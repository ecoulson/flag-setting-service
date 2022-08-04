import { UTCDatetime } from '../../models/timestamp/utc-datetime';

export interface TimestampFormatter {
    format(datetime: UTCDatetime): string;
}
