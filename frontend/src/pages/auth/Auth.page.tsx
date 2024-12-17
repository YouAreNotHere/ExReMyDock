import React from 'react';
import { AuthForm } from '../../features/auth/ui/Auth.form';
import { FormLayout } from '../../shared/layouts/FormLayout';

const AuthPage = () => {
  return (
    <FormLayout>
      <h2>Войдите в учетную запись!</h2>
      <AuthForm />
    </FormLayout>
  );
};

export default AuthPage;
