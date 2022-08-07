import { TimeUnit } from './time-unit';

export class Time {
    public value: number;
    public unit: TimeUnit;

    constructor(value: number, unit: TimeUnit) {
        this.value = value;
        this.unit = unit;
    }

    toMiliseconds() {
        switch (this.unit) {
            case TimeUnit.Miliseconds:
            default:
                return this.value;
        }
    }
}
