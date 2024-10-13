import React from 'react';
import { AuthForm } from '../../features/auth/ui/Auth.form';
import { FormLayout } from '../../shared/layouts/FormLayout';

const AuthPage = () => {
  return (
    <FormLayout>
      <h1>Войдите в учетную запись!</h1>
      <AuthForm />
    </FormLayout>
  );
};

export default AuthPage;
