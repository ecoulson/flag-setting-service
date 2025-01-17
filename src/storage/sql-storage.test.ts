import { anything, instance, mock, reset, verify, when } from 'ts-mockito';
import { Optional } from '../common/optional/optional';
import { Broker } from '../database/broker/broker';
import { Logger } from '../logging/logger';
import { SQLStorage } from './sql-storage';

describe('SQL Storage Test Suite', () => {
    class DummyModel {
        public id: string = 'id';
    }

    class DummySQLStorage extends SQLStorage<DummyModel> {
        constructor(broker: Broker<DummyModel>) {
            super(Optional.of(broker), instance(mockedLogger));
        }
    }

    class MissingBrokerSQLStorage extends SQLStorage<DummyModel> {
        constructor() {
            super(Optional.empty(), instance(mockedLogger));
        }
    }

    const mockedLogger = mock<Logger>();
    const mockedBroker = mock<Broker<DummyModel>>();
    const storage = new DummySQLStorage(instance(mockedBroker));

    beforeEach(() => {
        reset(mockedBroker);
        reset(mockedLogger);
    });

    test('Should find all models', async () => {
        const expectedModels = [new DummyModel()];
        when(mockedBroker.find()).thenResolve(expectedModels);

        const actualModels = await storage.find();

        expect(actualModels).toEqual(expectedModels);
        verify(mockedBroker.find()).once();
    });

    test('Should find model by id', async () => {
        const expectedModel = new DummyModel();
        when(mockedBroker.findById('id')).thenResolve(expectedModel);

        const actualModel = await storage.findById('id');

        expect(actualModel.get()).toEqual(expectedModel);
        verify(mockedBroker.findById('id')).once();
    });

    test('Should find an empty optional when no model is found with the given id', async () => {
        when(mockedBroker.findById('id')).thenResolve(null);

        const actualModel = await storage.findById('id');

        expect(actualModel.isEmpty()).toBeTruthy();
        verify(mockedBroker.findById('id')).once();
    });

    test('Should delete a model with the given id', async () => {
        const inputModel = new DummyModel();
        const expectedModel = inputModel;
        when(mockedBroker.delete(inputModel)).thenResolve(expectedModel);

        const actualModel = await storage.delete(inputModel);

        expect(actualModel.get()).toEqual(expectedModel);
        verify(mockedBroker.delete(inputModel)).once();
    });

    test('Should give an empty optional when the model does not exist', async () => {
        const inputModel = new DummyModel();
        const expectedModel = inputModel;
        when(mockedBroker.delete(inputModel)).thenResolve(null);

        const actualModel = await storage.delete(inputModel);

        expect(actualModel.isEmpty()).toBeTruthy();
        verify(mockedBroker.delete(inputModel)).once();
    });

    test('Should create a model', async () => {
        const inputModel = new DummyModel();
        const expectedModel = inputModel;
        when(mockedBroker.create(inputModel)).thenResolve(expectedModel);

        const actualModel = await storage.create(inputModel);

        expect(actualModel.get()).toEqual(expectedModel);
        verify(mockedBroker.create(inputModel)).once();
    });

    test('Should get an empty optional when the model already exists', async () => {
        const inputModel = new DummyModel();
        when(mockedBroker.create(inputModel)).thenResolve(null);

        const actualModel = await storage.create(inputModel);

        expect(actualModel.isEmpty()).toBeTruthy();
        verify(mockedBroker.create(inputModel)).once();
    });

    test('Should update a model', async () => {
        const inputModel = new DummyModel();
        const expectedModel = inputModel;
        when(mockedBroker.update(inputModel)).thenResolve(expectedModel);

        const actualModel = await storage.update(inputModel);

        expect(actualModel.get()).toEqual(expectedModel);
        verify(mockedBroker.update(inputModel)).once();
    });

    test('Should get an empty optional when the model already exists', async () => {
        const inputModel = new DummyModel();
        const expectedModel = inputModel;
        when(mockedBroker.update(inputModel)).thenResolve(null);

        const actualModel = await storage.update(inputModel);

        expect(actualModel.isEmpty()).toBeTruthy();
        verify(mockedBroker.update(inputModel)).once();
    });

    test('Should use a dummy broker when there is no broker provided', async () => {
        const storage = new MissingBrokerSQLStorage();

        const models = await storage.find();

        expect(models).toEqual([]);
        verify(mockedLogger.fatal(anything())).twice();
    });
});
