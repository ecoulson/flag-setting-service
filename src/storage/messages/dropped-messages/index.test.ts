import { DroppedMessageStorageModule } from '.';
import { DatabaseModule } from '../../../database';
import { EnvironmentModule } from '../../../environment';
import { LoggingModule } from '../../../logging';
import { ModelModule } from '../../../models';
import { DroppedMessageStorageAnnotation } from './dropped-message-storage-annotation';
import { SQLDroppedMessageStorage } from './sql-dropped-message-storage';

describe('Dropped Message Storage Module Test Suite', () => {
    const module = new DroppedMessageStorageModule();

    beforeAll(() => {
        new ModelModule().configure();
        new LoggingModule().configure();
        new EnvironmentModule().configure();
        new DatabaseModule().configure();
        module.configure();
    });

    test('Should resolve the dropped message storage annotation', () => {
        const storage = module.resolve(DroppedMessageStorageAnnotation);

        expect(storage).toBeInstanceOf(SQLDroppedMessageStorage);
    });
});
