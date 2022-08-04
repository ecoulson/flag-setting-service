export class UTCDatetime {
    constructor(
        private readonly utcYear: number,
        private readonly utcMonth: number,
        private readonly utcDate: number,
        private readonly utcHour: number,
        private readonly utcMinute: number,
        private readonly utcSecond: number,
        private readonly utcMilisecond: number
    ) {}

    year(): number {
        return this.utcYear;
    }

    month(): number {
        return this.utcMonth;
    }

    date(): number {
        return this.utcDate;
    }

    hour(): number {
        return this.utcHour;
    }

    minute(): number {
        return this.utcMinute;
    }

    second(): number {
        return this.utcSecond;
    }

    milisecond(): number {
        return this.utcMilisecond;
    }
}
