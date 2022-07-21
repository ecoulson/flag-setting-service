import { Injectable } from 'noose-injection';
import { TimestampGenerator } from './timestamp-generator';
import { UTCDatetime } from './utc-datetime';

@Injectable()
export class NativeTimestampGenerator implements TimestampGenerator {
    generateCurrentTimestamp(): UTCDatetime {
        const date = new Date();
        return new UTCDatetime(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds(),
            date.getUTCMilliseconds()
        );
    }
}
