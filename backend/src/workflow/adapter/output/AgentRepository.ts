import { Injectable } from "@nestjs/common";
import { ExecuteData } from "./ExecuteData";
import { catchError, firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";

@Injectable()
class AgentRepository {
    constructor(private readonly httpService: HttpService) {}

    async executeRequest(executeData: ExecuteData): Promise<string> {
        const { data } = (await firstValueFrom(
            this.httpService.post(process.env.AGENT_URL + "/execute", executeData).pipe(
                catchError(() => {
                    throw new Error("Cannot connect to the agent");
                })
            )
        )) as AxiosResponse<string, ExecuteData>;

        return data;
    }
}

export default AgentRepository;
