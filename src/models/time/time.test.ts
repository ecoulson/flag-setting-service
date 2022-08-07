import { Time } from './time';
import { TimeUnit } from './time-unit';

describe('Time Test Suite', () => {
    test('Should get the time in miliseconds', () => {
        const time = new Time(100, TimeUnit.Miliseconds);

        expect(time.toMiliseconds()).toEqual(100);
    });
});
