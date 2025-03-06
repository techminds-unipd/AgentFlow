import * as bcrypt from "bcrypt";

class User {
    readonly username: string;
    readonly password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    async hashPassword(): Promise<User> {
        const salt = 10;
        return new User(this.username, await bcrypt.hash(this.password, salt));
    }
}

export default User;
