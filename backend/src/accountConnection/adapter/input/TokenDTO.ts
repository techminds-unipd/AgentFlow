class TokenDTO {
    readonly token: string;
    readonly expireDate: Date;

    constructor(token: string, expireDate: Date) {
        this.token = token;
        this.expireDate = expireDate;
    }
}

export default TokenDTO;
