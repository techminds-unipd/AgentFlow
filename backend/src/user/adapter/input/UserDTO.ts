import { ApiProperty } from "@nestjs/swagger";


class UserDTO {
    @ApiProperty()
    private _username: string;
    @ApiProperty()
    private _password: string;

    constructor(username: string, password: string) {
        this._username = username;
        this._password = password;
    }

    get username() { return this._username; }
    get password() { return this._password; }
}

export default UserDTO;