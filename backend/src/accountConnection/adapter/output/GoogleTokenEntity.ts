class GoogleTokenEntity {
    readonly email: string;
    readonly refreshToken: string;
    readonly accessToken: string;
    readonly expireDate: Date;

    constructor(email: string, refreshToken: string, accessToken: string, expireDate: Date) {
        this.email = email;
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.expireDate = expireDate;
    }
}

export default GoogleTokenEntity;
