import { anything, instance, mock, reset, verify, when } from "ts-mockito";
import { Repository } from "typeorm";
import { Flag } from "../../models/flags/flag";
import { SQLFlagBroker } from "./sql-flag-broker";

describe('SQL Flag Broker', () => {
    const mockedRepository = mock(Repository<Flag>);
    const storage = new SQLFlagBroker(instance(mockedRepository));
    const id = 'ddeca993-11c6-4ff8-b0f4-ccd8d03e8e6e';

    beforeEach(() => {
        reset(mockedRepository);
    })

    test("Should find all flags", async () => {
        const expectedFlag = new Flag(id, 'flag', false);
        when(mockedRepository.find()).thenResolve([expectedFlag]);

        const actualFlags = await storage.find();

        expect(actualFlags).toHaveLength(1);
        const actualFlag = actualFlags[0];
        expect(actualFlag).toEqual(expectedFlag);
        verify(mockedRepository.find()).once();
    })

    test("Should find a flag by id", async () => {
        const expectedFlag = new Flag(id, 'flag', false);
        when(mockedRepository.findOne(anything())).thenResolve(expectedFlag);

        const actualFlag = await storage.findById(id);

        expect(actualFlag.get()).toEqual(expectedFlag);
        verify(mockedRepository.findOne(anything())).once();
    })

    test("Should find an empty optional when id is not found", async () => {
        const expectedFlag = new Flag(id, 'flag', false);
        when(mockedRepository.findOne(anything())).thenResolve(null);

        const actualFlag = await storage.findById(id);

        expect(actualFlag.isEmpty()).toBeTruthy();
        verify(mockedRepository.findOne(anything())).once();
    })

    test("Should delete a flag by id", async () => {
        const inputFlag = new Flag(id, 'flag', false);
        const expectedFlag = inputFlag 
        when(mockedRepository.findOne(anything())).thenResolve(expectedFlag)
        when(mockedRepository.remove(inputFlag)).thenResolve(expectedFlag)

        const deletedFlag = await storage.delete(inputFlag);

        expect(deletedFlag.get()).toEqual(expectedFlag);
        verify(mockedRepository.remove(inputFlag)).once();
    })

    test("Should give an empty optional when flag to be removed does not exist", async () => {
        const inputFlag = new Flag(id, 'flag', false);
        when(mockedRepository.findOne(anything())).thenResolve(null);

        const deletedFlag = await storage.delete(inputFlag);

        expect(deletedFlag.isEmpty()).toBeTruthy();
        verify(mockedRepository.findOne(anything())).once();
        verify(mockedRepository.remove(inputFlag)).never();
    })

    test("Should create a flag", async () => {
        const inputFlag = new Flag(id, 'flag', false);
        const expectedFlag = inputFlag;
        when(mockedRepository.save(inputFlag)).thenResolve(expectedFlag);

        const actualFlag = await storage.create(inputFlag);

        expect(actualFlag.get()).toEqual(expectedFlag);
        verify(mockedRepository.save(inputFlag)).once();
    })

    test("Should give an empty optional when flag to be created does exist", async () => {
        const inputFlag = new Flag(id, 'flag', false);
        when(mockedRepository.findOne(anything())).thenResolve(inputFlag);

        const actualFlag = await storage.create(inputFlag);

        expect(actualFlag.isEmpty()).toBeTruthy();
        verify(mockedRepository.findOne(anything())).once();
        verify(mockedRepository.save(inputFlag)).never();
    })

    test("Should update a flag", async () => {
        const inputFlag = new Flag(id, 'flag', false);
        const expectedFlag = inputFlag;
        when(mockedRepository.findOne(anything())).thenResolve(expectedFlag);
        when(mockedRepository.save(inputFlag)).thenResolve(expectedFlag);

        const actualFlag = await storage.update(inputFlag);

        expect(actualFlag.get()).toEqual(expectedFlag);
        verify(mockedRepository.save(inputFlag)).once();
    })

    test("Should give an empty optional when flag to be created does exist", async () => {
        const inputFlag = new Flag(id, 'flag', false);
        when(mockedRepository.findOne(anything())).thenResolve(null);

        const actualFlag = await storage.update(inputFlag);

        expect(actualFlag.isEmpty()).toBeTruthy();
        verify(mockedRepository.findOne(anything())).once();
        verify(mockedRepository.save(inputFlag)).never();
    })
});
