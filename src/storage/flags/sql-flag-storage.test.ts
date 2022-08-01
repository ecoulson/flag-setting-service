import { anything, instance, mock, reset, verify, when } from 'ts-mockito';
import { Broker } from '../../database/broker/broker';
import { FlagDataSource } from '../../database/flags/flag-data-source';
import { Flag } from '../../models/flags/flag';
import { SQLFlagStorage } from './sql-flag-storage';

describe('SQL Flag Storage Test Suite', () => {
    const mockedFlagBroker = mock<Broker<Flag>>();
    const mockedFlagStorage = mock<FlagDataSource>();
    when(mockedFlagStorage.getFlagBroker()).thenReturn(
        instance(mockedFlagBroker)
    );
    const storage = new SQLFlagStorage(instance(mockedFlagStorage));
    const id = 'ddeca993-11c6-4ff8-b0f4-ccd8d03e8e6e';

    beforeEach(() => {
        reset(mockedFlagBroker);
    });

    test('Should find all flags', async () => {
        const expectedFlag = new Flag(id, 'flag', false);
        when(mockedFlagBroker.find()).thenResolve([expectedFlag]);

        const actualFlags = await storage.find();

        expect(actualFlags).toHaveLength(1);
        const actualFlag = actualFlags[0];
        expect(actualFlag).toEqual(expectedFlag);
        verify(mockedFlagBroker.find()).once();
    });

    test('Should find a flag by id', async () => {
        const expectedFlag = new Flag(id, 'flag', false);
        when(mockedFlagBroker.findById(id)).thenResolve(expectedFlag);

        const actualFlag = await storage.findById(id);

        expect(actualFlag.get()).toEqual(expectedFlag);
        verify(mockedFlagBroker.findById(id)).once();
    });

    test('Should find an empty optional when id is not found', async () => {
        when(mockedFlagBroker.findById(id)).thenResolve(null);

        const actualFlag = await storage.findById(id);

        expect(actualFlag.isEmpty()).toBeTruthy();
        verify(mockedFlagBroker.findById(id)).once();
    });

    test('Should delete a flag by id', async () => {
        const inputFlag = new Flag(id, 'flag', false);
        const expectedFlag = inputFlag;
        when(mockedFlagBroker.delete(inputFlag)).thenResolve(expectedFlag);

        const deletedFlag = await storage.delete(inputFlag);

        expect(deletedFlag.get()).toEqual(expectedFlag);
        verify(mockedFlagBroker.delete(inputFlag)).once();
    });

    test('Should give an empty optional when flag to be removed does not exist', async () => {
        const inputFlag = new Flag(id, 'flag', false);
        when(mockedFlagBroker.delete(inputFlag)).thenResolve(null);

        const deletedFlag = await storage.delete(inputFlag);

        expect(deletedFlag.isEmpty()).toBeTruthy();
        verify(mockedFlagBroker.delete(inputFlag)).once();
    });

    test('Should create a flag', async () => {
        const inputFlag = new Flag(id, 'flag', false);
        const expectedFlag = inputFlag;
        when(mockedFlagBroker.create(inputFlag)).thenResolve(expectedFlag);

        const actualFlag = await storage.create(inputFlag);

        expect(actualFlag.get()).toEqual(expectedFlag);
        verify(mockedFlagBroker.create(inputFlag)).once();
    });

    test('Should give an empty optional when flag to be created does exist', async () => {
        const inputFlag = new Flag(id, 'flag', false);
        when(mockedFlagBroker.create(anything())).thenResolve(null);

        const actualFlag = await storage.create(inputFlag);

        expect(actualFlag.isEmpty()).toBeTruthy();
        verify(mockedFlagBroker.create(anything())).once();
    });

    test('Should update a flag', async () => {
        const inputFlag = new Flag(id, 'flag', false);
        const expectedFlag = inputFlag;
        when(mockedFlagBroker.update(inputFlag)).thenResolve(expectedFlag);

        const actualFlag = await storage.update(inputFlag);

        expect(actualFlag.get()).toEqual(expectedFlag);
        verify(mockedFlagBroker.update(inputFlag)).once();
    });

    test('Should give an empty optional when flag to be updated does exist', async () => {
        const inputFlag = new Flag(id, 'flag', false);
        when(mockedFlagBroker.update(anything())).thenResolve(null);

        const actualFlag = await storage.update(inputFlag);

        expect(actualFlag.isEmpty()).toBeTruthy();
        verify(mockedFlagBroker.update(inputFlag)).once();
    });
});
