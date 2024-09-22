import {IAuthRequest} from "../types/IAuthRequest";

const authRequest = async (payload: IAuthRequest, url: string) =>
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });


export {authRequest}
