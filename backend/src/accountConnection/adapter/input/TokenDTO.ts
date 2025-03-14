class TokenDTO {
    readonly token: string;
    readonly refreshToken: string;
    readonly expireDate: Date;

    constructor(token: string, refreshToken: string, expireDate: Date) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.expireDate = expireDate;
    }
}

export default TokenDTO;
