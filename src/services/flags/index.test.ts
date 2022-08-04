import { FlagServiceModule } from '.';
import { DatabaseModule } from '../../database';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { StorageModule } from '../../storage';
import { FlagServiceAnnotation } from './flag-annotations';
import { FlagService } from './flag-service';

describe('Flag Service Module Test Suite', () => {
    const module = new FlagServiceModule();

    beforeAll(() => {
        new StorageModule().configure();
        new DatabaseModule().configure();
        new EnvironmentModule().configure();
        new ModelModule().configure();
        new LoggingModule().configure();
        module.configure();
    });

    test('Should resolve the flag service', () => {
        const service = module.resolve(FlagServiceAnnotation);

        expect(service).toBeInstanceOf(FlagService);
    });
});
