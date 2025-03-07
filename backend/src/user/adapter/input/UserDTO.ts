import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsDefined, IsNotEmpty, IsStrongPassword, MinLength } from "class-validator";

class UserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    @IsAlphanumeric()
    @MinLength(2)
    readonly username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDefined()
    @IsStrongPassword() // lettera maiuscola, lettera minuscola, numero, carattere speciale
    @MinLength(8)
    readonly password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export default UserDTO;
