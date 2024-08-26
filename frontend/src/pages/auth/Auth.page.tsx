import React from "react";
import {SigninForm} from "../../features/auth/signin";
import {FormLayout} from "../../shared/layouts/FormLayout";

const SigninPage = () => {
    return (
        <FormLayout>
            <h1>Войдите или зарегистрируйтесь</h1>
            <SigninForm />
        </FormLayout>
    )
};

export default SigninPage;