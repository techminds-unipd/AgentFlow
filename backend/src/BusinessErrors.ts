abstract class BusinessError extends Error {
    readonly name: string;
    readonly message: string;
}

// USER ERRORS

export class UserAlreadyExistsError extends BusinessError {
    name = "UserAlredyExists";
    message = "Attempted to register a user that is already been saved";
}

export class UserNotFoundError extends BusinessError {
    name = "UserNotFoundError";
    message = "User not found in the database";
}

export class WrongPasswordError extends BusinessError {
    name = "WrongPasswordError";
    message = "Password doesn't match when attempt to login";
}

// WORKFLOW ERRORS

export class WorkflowAlreadyExistsError extends BusinessError {
    name = "WorkflowAlreadyExists";
    message = "Attempted to create a workflow with the same name as an existing one";
}

export class WorkflowNotAddedError extends BusinessError {
    name = "WorkflowNotAdded";
    message = "Workflow not added to the user";
}

export class WorkflowNotFoundError extends BusinessError {
    name = "WorkflowNotFoundError";
    message = "Workflow not found";
}
