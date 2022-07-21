import { Injectable } from 'noose-injection';
import { TimestampFormatter } from './timestamp-formatter';
import { UTCDatetime } from './utc-datetime';

@Injectable()
export class ISO8601TimestampFormatter implements TimestampFormatter {
    format(datetime: UTCDatetime): string {
        const month = this.ensureTwoDigits(datetime.month());
        const date = this.ensureTwoDigits(datetime.date());
        const hour = this.ensureTwoDigits(datetime.hour());
        const minute = this.ensureTwoDigits(datetime.minute());
        const second = this.ensureTwoDigits(datetime.second());
        const milisecond = this.ensureTwoDigits(datetime.milisecond());
        return `${datetime.year()}-${month}-${date}T${hour}:${minute}:${second}.${milisecond}Z`;
    }

    private ensureTwoDigits(n: number): string {
        if (n < 10) {
            return `0${n}`;
        }
        return n.toString();
    }
}
