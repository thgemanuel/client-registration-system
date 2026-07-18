import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ClientRegistrationSuccess } from './ClientRegistrationSuccess';

describe('ClientRegistrationSuccess', () => {
  it('should render success messages and handle reset click', () => {
    const onResetMock = jest.fn();

    render(<ClientRegistrationSuccess onReset={onResetMock} />);

    // In tests, useTranslations mock returns the key directly
    expect(screen.getByText('successTitle')).toBeInTheDocument();
    expect(screen.getByText('successMessage')).toBeInTheDocument();

    const button = screen.getByText('newRegistration');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onResetMock).toHaveBeenCalledTimes(1);
  });
});
