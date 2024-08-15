import React from "react";
import {SignupForm} from "../../features/auth/signup";
import {FormLayout} from "../../shared/layouts/FormLayout";

const SignupPage = () => {
  return (
    <FormLayout>
      <h1>Registration</h1>
      <SignupForm />
    </FormLayout>
  )
};

export default SignupPage;
