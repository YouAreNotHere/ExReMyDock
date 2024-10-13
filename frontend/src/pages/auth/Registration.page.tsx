import React from 'react';
import { FormLayout } from '../../shared/layouts/FormLayout';
import RegistrationForm from '../../features/auth/ui/Registration.form';

const RegistrationPage = () => {
  return (
    <FormLayout>
      <h1>Давайте создадим учетную запись!</h1>
      <RegistrationForm />
    </FormLayout>
  );
};

export default RegistrationPage;
