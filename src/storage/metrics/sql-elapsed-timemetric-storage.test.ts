import {
    anything,
    capture,
    instance,
    mock,
    reset,
    verify,
    when,
} from 'ts-mockito';
import { Optional } from '../../common/optional/optional';
import { Broker } from '../../database/broker/broker';
import { MetricDataSource } from '../../database/metrics/metric-data-source';
import { Logger } from '../../logging/logger';
import { ElapsedTimeMetric } from '../../models/metrics/elasped-time-metric';
import { SQLElapsedTimeMetricStorage } from './sql-elapsed-time-metric-storage';

describe('SQL Metric Storage Test Suite', () => {
    const id = 'bd32ed0f-428d-4f1d-946b-3482c1b8664c';
    const mockedLogger = mock<Logger>();
    const mockedBroker = mock<Broker<ElapsedTimeMetric>>();
    const mockedDataSource = mock<MetricDataSource>();
    when(mockedDataSource.getElapsedTimeMetricBroker()).thenReturn(
        Optional.of(instance(mockedBroker))
    );
    const storage = new SQLElapsedTimeMetricStorage(
        instance(mockedDataSource),
        instance(mockedLogger)
    );

    beforeEach(() => {
        reset(mockedBroker);
        when(mockedDataSource.getElapsedTimeMetricBroker()).thenReturn(
            Optional.of(mockedBroker)
        );
    });

    test('Should find all metrics with a given tag', async () => {
        const metric = new ElapsedTimeMetric(id, 'tag', 100);
        const expectedMetrics = [metric];
        when(mockedBroker.findWhere(anything())).thenResolve(expectedMetrics);

        const actualMetrics = await storage.findByTag('tag');

        expect(actualMetrics).toEqual(expectedMetrics);
        verify(mockedBroker.findWhere(anything())).once();
        const [query] = capture(mockedBroker.findWhere).last();
        expect(query).toEqual({
            tag: 'tag',
        });
    });
});
