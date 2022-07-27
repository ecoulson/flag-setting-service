import { anyString, instance, mock, reset, verify, when } from 'ts-mockito';
import { Optional } from '../../common/optional/optional';
import { Logger } from '../../logging/logger';
import { Flag } from '../../models/flags/flag';
import { Storage } from '../../storage/storage';
import { FlagService } from './flag-service';

describe('Flag Service Test Suite', () => {
    const id = 'bd32ed0f-428d-4f1d-946b-3482c1b8664c';
    const mockedStorage = mock<Storage<Flag>>();
    const mockedLogger = mock<Logger>();
    const flagService = new FlagService(
        instance(mockedStorage),
        instance(mockedLogger)
    );

    beforeEach(() => {
        reset(mockedStorage);
        reset(mockedLogger);
    });

    test('Should get an empty optional when there is no flag found', async () => {
        when(mockedStorage.findById(id)).thenResolve(Optional.empty());

        const flag = await flagService.getFlag(id);

        expect(flag.isEmpty()).toBeTruthy();
        verify(mockedStorage.findById(id)).once();
        verify(mockedLogger.error(anyString())).once();
    });

    test('Should get a flag when there is a flag found', async () => {
        const expectedFlag = new Flag(id, 'flag', false);
        when(mockedStorage.findById(id)).thenResolve(Optional.of(expectedFlag));

        const flag = await flagService.getFlag(id);

        expect(flag.get()).toEqual(expectedFlag);
        verify(mockedStorage.findById(id)).once();
        verify(mockedLogger.error(anyString())).never();
    });
});
