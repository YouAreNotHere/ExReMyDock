import {ISignupRequest} from "../types/ISignupRequest";

const signupRequest = async (payload: ISignupRequest) =>
  await fetch('http://localhost:8081/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export {signupRequest}
