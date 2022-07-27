import { instance, mock, reset, when } from "ts-mockito"
import { Repository } from "typeorm";
import { TypeORMDataSource } from "../typeorm-data-source"
import { Message } from "../../../models/messages/message";
import { MessageTypeORMRepository } from "./message-typeorm-repository";

describe("Flag TypeORM Repository Test Suite", () => {
    const mockedDataSource = mock(TypeORMDataSource);
    const mockedRepository = mock(Repository<Message>);

    beforeEach(() => {
        reset(mockedDataSource);
        reset(mockedRepository);
    })

    test("Should get a repository from TypeORM", () => {
        const messageTypeORMRepository = new MessageTypeORMRepository(instance(mockedDataSource));
        when(mockedDataSource.getRepository(Message)).thenReturn(instance(mockedRepository));

        const repository = messageTypeORMRepository.get();

        expect(repository).not.toBeNull();
    })
})