abstract class BusinessError extends Error {
    readonly name: string;
    readonly message: string;
}

export class UserAlreadyExistsError extends BusinessError {
    name = 'UserAlredyExists';
    message = 'Attempted to register a user that is already been saved';
}

export class UserNotFoundError extends BusinessError {
    name = 'UserNotFoundError';
    message = 'User not found when attempt to login';
}

export class WrongPasswordError extends BusinessError {
    name = 'WrongPasswordError';
    message = "Password doesn't match when attempt to login";
}
