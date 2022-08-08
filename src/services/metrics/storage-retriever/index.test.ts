import { MetricStorageRetrieverModule } from '.';
import { ConnectionModule } from '../../../connections';
import { DatabaseModule } from '../../../database';
import { EnvironmentModule } from '../../../environment';
import { LoggingModule } from '../../../logging';
import { ModelModule } from '../../../models';
import { StorageModule } from '../../../storage';
import { MetricStorageRetriever } from './metric-storage-retriever';
import { MetricStorageRetrieverAnnotation } from './metric-storage-retriever-annotation';

describe('Metric Storage Retriever Module', () => {
    const module = new MetricStorageRetrieverModule();

    beforeAll(() => {
        new StorageModule().configure();
        new ConnectionModule().configure();
        new DatabaseModule().configure();
        new EnvironmentModule().configure();
        new LoggingModule().configure();
        new ModelModule().configure();
        module.configure();
    });

    test('Should resolve the metric storage retriever annotation', () => {
        const retriever = module.resolve(MetricStorageRetrieverAnnotation);

        expect(retriever).toBeInstanceOf(MetricStorageRetriever);
    });
});
