import {ISigninRequest} from "../types/ISigninRequest";

const signinRequest = async (payload: ISigninRequest, url: string) =>
    await fetch('http://localhost:8081/auth/signin', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    });

export {signinRequest}
