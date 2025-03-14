export class ExecuteNode {
    readonly action: string;
    readonly type: string;

    constructor(action: string, type: string) {
        this.action = action;
        this.type = type;
    }
}

export class TokenFile {
    readonly token: string;
    readonly refreshToken: string;
    readonly tokenUri: string;
    readonly clientID: string;
    readonly clientSecret: string;
    readonly scopes: string[];
    readonly universeDomain: string;
    readonly account: string;

    /*eslint-disable max-params*/
    constructor(
        token: string,
        refreshToken: string,
        tokenUri: string,
        clientID: string,
        clientSecret: string,
        scopes: string[],
        universeDomain: string,
        account: string
    ) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.tokenUri = tokenUri;
        this.clientID = clientID;
        this.clientSecret = clientSecret;
        this.scopes = scopes;
        this.universeDomain = universeDomain;
        this.account = account;
    }
}

export class ExecuteData {
    readonly workflowNodes: ExecuteNode[];
    readonly googleTokenFile: TokenFile;

    constructor(nodes: ExecuteNode[], token: TokenFile) {
        this.workflowNodes = nodes;
        this.googleTokenFile = token;
    }
}
