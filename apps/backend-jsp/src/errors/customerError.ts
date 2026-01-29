import { BaseError } from "./baseError";

export class CustomerError extends BaseError {
    constructor(message: string, status: number = 400) {
        super(message, status);
    }
}