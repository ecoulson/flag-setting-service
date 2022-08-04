import { UTCDatetime } from '../../models/timestamp/utc-datetime';

export interface TimestampGenerator {
    generateCurrentTimestamp(): UTCDatetime;
}
