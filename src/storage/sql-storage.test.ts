import {
    anything,
    capture,
    instance,
    mock,
    reset,
    verify,
    when,
} from 'ts-mockito';
import { Repository } from 'typeorm';
import { SQLStorage } from './sql-storage';

class DummyModel {
    public id: string = 'id';
}

class DummySQLStorage extends SQLStorage<DummyModel> {
    constructor(repository: Repository<DummyModel>) {
        super(repository);
    }
}

describe('SQL Storage Test Suite', () => {
    const mockedRepository = mock<Repository<DummyModel>>();
    const storage = new DummySQLStorage(instance(mockedRepository));

    beforeEach(() => {
        reset(mockedRepository);
    });

    test('Should find all models', async () => {
        const expectedModels = [new DummyModel()];
        when(mockedRepository.find()).thenResolve(expectedModels);

        const actualModels = await storage.find();

        expect(actualModels).toEqual(expectedModels);
        verify(mockedRepository.find()).once();
    });

    test('Should find model by id', async () => {
        const expectedModel = new DummyModel();
        when(mockedRepository.findOne(anything())).thenResolve(expectedModel);

        const actualModel = await storage.findById('id');

        expect(actualModel.get()).toEqual(expectedModel);
        verify(mockedRepository.findOne(anything())).once();
        const [query] = capture(mockedRepository.findOne).last();
        expect(query).toEqual({
            where: {
                id: 'id',
            },
        });
    });

    test('Should find an empty optional when no model is found with the given id', async () => {
        when(mockedRepository.findOne(anything())).thenResolve(null);

        const actualModel = await storage.findById('id');

        expect(actualModel.isEmpty()).toBeTruthy();
        verify(mockedRepository.findOne(anything())).once();
        const [query] = capture(mockedRepository.findOne).last();
        expect(query).toEqual({
            where: {
                id: 'id',
            },
        });
    });

    test('Should delete a model with the given id', async () => {
        const inputModel = new DummyModel();
        const expectedModel = inputModel;
        when(mockedRepository.remove(inputModel)).thenResolve(expectedModel);
        when(mockedRepository.findOne(anything())).thenResolve(expectedModel);

        const actualModel = await storage.delete(inputModel);

        expect(actualModel.get()).toEqual(expectedModel);
        verify(mockedRepository.remove(inputModel)).once();
        verify(mockedRepository.findOne(anything())).once();
    });

    test('Should give an empty optional when the model does not exist', async () => {
        const inputModel = new DummyModel();
        const expectedModel = inputModel;
        when(mockedRepository.remove(inputModel)).thenResolve(expectedModel);
        when(mockedRepository.findOne(anything())).thenResolve(null);

        const actualModel = await storage.delete(inputModel);

        expect(actualModel.isEmpty()).toBeTruthy();
        verify(mockedRepository.remove(inputModel)).never();
        verify(mockedRepository.findOne(anything())).once();
    });

    test('Should create a model', async () => {
        const inputModel = new DummyModel();
        const expectedModel = inputModel;
        when(mockedRepository.save(inputModel)).thenResolve(expectedModel);
        when(mockedRepository.findOne(anything())).thenResolve(null);

        const actualModel = await storage.create(inputModel);

        expect(actualModel.get()).toEqual(expectedModel);
        verify(mockedRepository.save(inputModel)).once();
        verify(mockedRepository.findOne(anything())).once();
    });

    test('Should get an empty optional when the model already exists', async () => {
        const inputModel = new DummyModel();
        const expectedModel = inputModel;
        when(mockedRepository.save(inputModel)).thenResolve(expectedModel);
        when(mockedRepository.findOne(anything())).thenResolve(expectedModel);

        const actualModel = await storage.create(inputModel);

        expect(actualModel.isEmpty()).toBeTruthy();
        verify(mockedRepository.remove(inputModel)).never();
        verify(mockedRepository.findOne(anything())).once();
    });

    test('Should update a model', async () => {
        const inputModel = new DummyModel();
        const expectedModel = inputModel;
        when(mockedRepository.save(inputModel)).thenResolve(expectedModel);
        when(mockedRepository.findOne(anything())).thenResolve(expectedModel);

        const actualModel = await storage.update(inputModel);

        expect(actualModel.get()).toEqual(expectedModel);
        verify(mockedRepository.save(inputModel)).once();
        verify(mockedRepository.findOne(anything())).once();
    });

    test('Should get an empty optional when the model already exists', async () => {
        const inputModel = new DummyModel();
        const expectedModel = inputModel;
        when(mockedRepository.save(inputModel)).thenResolve(expectedModel);
        when(mockedRepository.findOne(anything())).thenResolve(null);

        const actualModel = await storage.update(inputModel);

        expect(actualModel.isEmpty()).toBeTruthy();
        verify(mockedRepository.remove(inputModel)).never();
        verify(mockedRepository.findOne(anything())).once();
    });
});
