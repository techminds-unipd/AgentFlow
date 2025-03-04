import { ApiProperty } from "@nestjs/swagger";


class UserDTO {
    @ApiProperty()
    readonly username: string;
    @ApiProperty()
    readonly password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export default UserDTO;