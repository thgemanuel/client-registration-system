import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { Form } from '@/shared/lib/form';
import { ClientRegistrationFormFields } from './ClientRegistrationFormFields';
import { ClientRegistrationInput } from '../types/client.types';

function TestWrapper() {
  const form = useForm<ClientRegistrationInput>({
    defaultValues: {
      fullName: '',
      cpf: '',
      email: '',
      observations: '',
    },
  });

  return (
    <Form {...form}>
      <form>
        <ClientRegistrationFormFields form={form} />
      </form>
    </Form>
  );
}

describe('ClientRegistrationFormFields', () => {
  it('should render all input fields', () => {
    render(<TestWrapper />);

    expect(screen.getByText('fullName')).toBeInTheDocument();
    expect(screen.getByText('cpf')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
    expect(screen.getByText('favoriteColor')).toBeInTheDocument();
    expect(screen.getByText('observations')).toBeInTheDocument();
  });
});
