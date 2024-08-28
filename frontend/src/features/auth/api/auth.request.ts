import {IAuthRequest} from "../types/IAuthRequest";
import {useState} from "react";

const authRequest = async (payload: IAuthRequest, url: string) =>
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
        },
    });


export {authRequest}
