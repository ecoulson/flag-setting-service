import { instance, mock, reset, verify } from 'ts-mockito';
import { MetricType } from '../../../models/metrics/metric-type';
import { SQLElapsedTimeMetricStorage } from '../../../storage/metrics/sql-elapsed-time-metric-storage';
import { MetricStorageRetriever } from './metric-storage-retriever';

describe('Metric Storage Retriever Test Suite', () => {
    const mockedElapsedStorageRetriever = mock(SQLElapsedTimeMetricStorage);
    const elapsedTimeMetricStorage = instance(mockedElapsedStorageRetriever);
    const retriever = new MetricStorageRetriever(elapsedTimeMetricStorage);

    beforeEach(() => {
        reset(mockedElapsedStorageRetriever);
    });

    test('Should get the elapsed time metric storage', () => {
        const storage = retriever.retrieve(MetricType.ElapsedTime);

        expect(storage).toEqual(elapsedTimeMetricStorage);
    });
});
