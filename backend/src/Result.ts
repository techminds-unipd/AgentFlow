import { assert } from "console";

class Result<T, E extends Error> {
    private readonly ok: T | null = null;
    private readonly err: E | null = null;
    constructor(ok: T | null, err: E | null) {
        if (!ok && !err) {  
            throw new Error('Result must have a value or an error');  
        }
        if (ok && err) {
            throw new Error('Result cannot have both a value and and error')
        }
            
        if (ok !== null) {  
            this.ok = ok;  
        } else {  
            this.err = err as E;
        }
    }
    
    isOk(): boolean {
        return this.ok !== null;
    }

    isError(): boolean {
        return this.err !== null;
    }

    unwrap(): T {
        if (this.isOk()){
            return this.ok!;
        }
        throw this.err;
    }

    getError(): E | null {
        if (this.isError()){
            return this.err!;
        }
        return null;
    }
}

export default Result;