import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExecuteData } from "./ExecuteData";
import { catchError, firstValueFrom } from "rxjs";
import { HttpService } from '@nestjs/axios';

@Injectable()
class AgentRepository {
  constructor(private readonly httpService: HttpService) {}

  async executeRequest(executeData: ExecuteData): Promise<string> {
    const { data } = await firstValueFrom(
      this.httpService
        .post('http://127.0.0.1:5000/execute', executeData)
        .pipe(
          catchError((e) => {
            console.log(e);
            throw new HttpException(
              'Cannot connect to the worker',
              HttpStatus.SERVICE_UNAVAILABLE,
            );
          }),
        ),
    );

    return data;
  }
}

export default AgentRepository;