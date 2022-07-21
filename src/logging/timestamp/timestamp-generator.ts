import { UTCDatetime } from './utc-datetime';

export interface TimestampGenerator {
    generateCurrentTimestamp(): UTCDatetime;
}
