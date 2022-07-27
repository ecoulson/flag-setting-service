import { MessageStorageModule } from '.';
import { DatabaseModule } from '../../database';
import { EnvironmentModule } from '../../environment';
import { LoggingModule } from '../../logging';
import { ModelModule } from '../../models';
import { MessageStorageAnnotation } from './message-storage-annotations';

describe('Message Storage Module Test Suite', () => {
    const module = new MessageStorageModule();

    beforeAll(() => {
        new ModelModule().configure();
        new LoggingModule().configure();
        new EnvironmentModule().configure();
        new DatabaseModule().configure();
        module.configure();
    });

    test('Should resolve sql message storage annotation', () => {
        const storage = module.resolve(MessageStorageAnnotation);

        expect(storage).not.toBeNull();
    });
});
