import { Module } from 'noose-injection';
import { ISO8601TimestampFormatter } from './iso8601-timestamp-formatter';
import { NativeTimestampGenerator } from './native-timestamp-generator';
import {
    TimestampFormatterAnnotation,
    TimestampGeneratorAnnotation,
} from './timestamp-annotations';

export class TimestampModule extends Module {
    configure(): void {
        this.registerClass(
            TimestampGeneratorAnnotation,
            NativeTimestampGenerator
        );
        this.registerClass(
            TimestampFormatterAnnotation,
            ISO8601TimestampFormatter
        );
    }
}
