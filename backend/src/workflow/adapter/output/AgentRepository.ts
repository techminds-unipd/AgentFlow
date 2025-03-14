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
            this.httpService.post("http://127.0.0.1:5000/execute", executeData).pipe(
                catchError(() => {
                    throw new Error("Cannot connect to the agent");
                })
            )
        )) as AxiosResponse<string, ExecuteData>;

        return data;
    }
}

export default AgentRepository;
