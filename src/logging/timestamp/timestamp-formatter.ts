import { UTCDatetime } from './utc-datetime';

export interface TimestampFormatter {
    format(datetime: UTCDatetime): string;
}
