import { ApiProperty } from "@nestjs/swagger";

class TokenDTO {
    @ApiProperty()
    readonly token: string;

    @ApiProperty()
    readonly refreshToken: string;

    @ApiProperty()
    readonly expireDate: Date;

    constructor(token: string, refreshToken: string, expireDate: Date) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.expireDate = expireDate;
    }
}

export default TokenDTO;
