import { DialectType } from './dialect-type';

export interface Dialect {
    type(): DialectType;
}
