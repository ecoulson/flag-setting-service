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
import { Identifiable } from '../../models/identifiable';
import { TypeORMBroker } from './typeorm-broker';

class DummyModel implements Identifiable {
    public readonly id: string = 'id';
}

describe('TypeORM Broker Test Suite', () => {
    const mockedRepository = mock<Repository<DummyModel>>();
    const broker = new TypeORMBroker(instance(mockedRepository));

    beforeEach(() => {
        reset(mockedRepository);
    });

    test('Should find all entities in repository', async () => {
        const expectedEntities = [new DummyModel()];
        when(mockedRepository.find()).thenResolve(expectedEntities);

        const actualEntities = await broker.find();

        expect(actualEntities).toEqual(expectedEntities);
        verify(mockedRepository.find()).once();
    });

    test('Should find an entity by id', async () => {
        const expectedEntity = new DummyModel();
        when(mockedRepository.findOne(anything())).thenResolve(expectedEntity);

        const actualEntity = await broker.findById('id');

        expect(actualEntity).toEqual(expectedEntity);
        verify(mockedRepository.findOne(anything())).once();
        const [query] = capture(mockedRepository.findOne).last();
        expect(query).toEqual({
            where: {
                id: 'id',
            },
        });
    });

    test('Should return null when an entity is not found', async () => {
        when(mockedRepository.findOne(anything())).thenResolve(null);

        const actualEntity = await broker.findById('id');

        expect(actualEntity).toBeNull();
        verify(mockedRepository.findOne(anything())).once();
        const [query] = capture(mockedRepository.findOne).last();
        expect(query).toEqual({
            where: {
                id: 'id',
            },
        });
    });

    test('Should return the inserted entity', async () => {
        const inputEntity = new DummyModel();
        const expectedEntity = inputEntity;
        when(mockedRepository.insert(inputEntity)).thenResolve({
            generatedMaps: [expectedEntity],
            raw: '',
            identifiers: [expectedEntity],
        });

        const actualEntity = await broker.create(inputEntity);

        expect(actualEntity).toEqual(expectedEntity);
        verify(mockedRepository.insert(inputEntity)).once();
        const [entity] = capture(mockedRepository.insert).last();
        expect(entity).toEqual(inputEntity);
    });

    test('Should return the updated entity', async () => {
        const inputEntity = new DummyModel();
        const expectedEntity = inputEntity;
        when(mockedRepository.update(anything(), inputEntity)).thenResolve({
            generatedMaps: [expectedEntity],
            raw: '',
        });

        const actualEntity = await broker.update(inputEntity);

        expect(actualEntity).toEqual(expectedEntity);
        verify(mockedRepository.update(anything(), inputEntity)).once();
        const [query, entity] = capture(mockedRepository.update).last();
        expect(query).toEqual({
            where: {
                id: 'id',
            },
        });
        expect(entity).toEqual(inputEntity);
    });

    test('Should return the updated entity', async () => {
        const inputEntity = new DummyModel();
        const expectedEntity = inputEntity;
        when(mockedRepository.delete(anything())).thenResolve({
            affected: 1,
            raw: '',
        });

        const actualEntity = await broker.delete(inputEntity);

        expect(actualEntity).toEqual(expectedEntity);
        verify(mockedRepository.delete(anything())).once();
        const [query] = capture(mockedRepository.delete).last();
        expect(query).toEqual({
            where: {
                id: 'id',
            },
        });
    });

    test('Should return all entities whose values match the query', async () => {
        const expectedEntities = [new DummyModel()];
        when(mockedRepository.find(anything())).thenResolve(expectedEntities);

        const actualEntities = await broker.findWhere({
            id: 'id',
        });

        expect(actualEntities).toEqual(expectedEntities);
        verify(mockedRepository.find(anything())).once();
        const [query] = capture(mockedRepository.find).last();
        expect(query).toEqual({
            where: {
                id: 'id',
            },
        });
    });

    test('Should return an entity whose value matches the query', async () => {
        const expectedEntity = new DummyModel();
        when(mockedRepository.findOne(anything())).thenResolve(expectedEntity);

        const actualEntity = await broker.findOneWhere({
            id: 'id',
        });

        expect(actualEntity).toEqual(expectedEntity);
        verify(mockedRepository.findOne(anything())).once();
        const [query] = capture(mockedRepository.findOne).last();
        expect(query).toEqual({
            where: {
                id: 'id',
            },
        });
    });

    test('Should create a broker from a repository', () => {
        const broker = TypeORMBroker.fromRepository(instance(mockedRepository));

        expect(broker).toBeInstanceOf(TypeORMBroker);
    });
});
