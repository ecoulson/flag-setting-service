import { instance, mock, reset, when } from "ts-mockito"
import { Repository } from "typeorm";
import { Flag } from "../../../models/flags/flag";
import { FlagTypeORMRepository } from "./flag-typeorm-repository";
import { TypeORMDataSource } from "../typeorm-data-source"

describe("Flag TypeORM Repository Test Suite", () => {
    const mockedDataSource = mock(TypeORMDataSource);
    const mockedRepository = mock(Repository<Flag>);

    beforeEach(() => {
        reset(mockedDataSource);
        reset(mockedRepository);
    })

    test("Should get a repository from TypeORM", () => {
        const flagTypeORMRepository = new FlagTypeORMRepository(instance(mockedDataSource));
        when(mockedDataSource.getRepository(Flag)).thenReturn(instance(mockedRepository));

        const repository = flagTypeORMRepository.get();

        expect(repository).not.toBeNull();
    })
})