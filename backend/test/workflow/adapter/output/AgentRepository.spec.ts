import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "@nestjs/axios";
import AgentRepository from "src/workflow/adapter/output/AgentRepository";
import { ExecuteData, ExecuteNode, TokenFile } from "src/workflow/adapter/output/ExecuteData";
import { NodeType } from "src/workflow/domain/Workflow";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { of } from "rxjs";

describe("AgentRepository", () => {
    let agentRepository: AgentRepository;
    let httpService: { post: jest.Mock };
    const executeNodesMock = [
        new ExecuteNode("action1", NodeType.GCalendar),
        new ExecuteNode("action2", NodeType.Gmail),
        new ExecuteNode("", NodeType.Pastebin)
    ];
    const tokenFileMock = new TokenFile(
        "token",
        "refreshToken",
        "tokenUri",
        "clientID",
        "clientSecret",
        ["scopes"],
        "universeDomain",
        "account"
    );
    const executeDataMock = new ExecuteData(executeNodesMock, tokenFileMock);
    const response: AxiosResponse<string> = {
        data: "result",
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as InternalAxiosRequestConfig<any>
    };

    const createTestingModule = async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: HttpService, useValue: httpService },
                AgentRepository
            ]
        }).compile();
        agentRepository = module.get<AgentRepository>(AgentRepository);
    };

    beforeEach(async () => {
        httpService = { post: jest.fn() };
        await createTestingModule();
    });

    describe("executeRequest", () => {
        it("should submit the request to the Agent who executes it", async () => {
            httpService.post.mockReturnValue(of(response));
            expect(await agentRepository.executeRequest(executeDataMock)).toEqual("result");
        });

        it("should throw an error because it can't connect to the Agent", async () => {
            httpService.post.mockImplementation(() => {
                throw new Error("Cannot connect to the agent");
            });
            const result = agentRepository.executeRequest(executeDataMock);
            expect(result).rejects.toThrow("Cannot connect to the agent");
        });
    });
});