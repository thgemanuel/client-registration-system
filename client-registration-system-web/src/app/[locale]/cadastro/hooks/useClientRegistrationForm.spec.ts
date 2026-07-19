import { renderHook, act } from '@testing-library/react';
import { useClientRegistrationForm } from './useClientRegistrationForm';
import { createClientAction } from '@/server-actions/client-registration-system-api/create-client';

// Mock the server action
jest.mock('@/server-actions/client-registration-system-api/create-client', () => ({
  createClientAction: jest.fn(),
}));

describe('useClientRegistrationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useClientRegistrationForm());

    expect(result.current.status).toBe('idle');
    expect(result.current.form.getValues()).toEqual({
      fullName: '',
      cpf: '',
      email: '',
      observations: '',
    });
  });

  it('should update status to success on successful submit', async () => {
    (createClientAction as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: { id: '123' },
    });

    const { result } = renderHook(() => useClientRegistrationForm());

    await act(async () => {
      await result.current.onSubmit({
        fullName: 'John Doe',
        cpf: '123.456.789-00',
        email: 'john@example.com',
        favoriteColor: 'blue',
        observations: 'Some text',
      });
    });

    expect(createClientAction).toHaveBeenCalledWith({
      fullName: 'John Doe',
      cpf: '123.456.789-00',
      email: 'john@example.com',
      favoriteColor: 'blue',
      observations: 'Some text',
    });
    expect(result.current.status).toBe('success');
  });

  it('should update status to error on failed submit', async () => {
    (createClientAction as jest.Mock).mockResolvedValueOnce({
      success: false,
    });

    const { result } = renderHook(() => useClientRegistrationForm());

    await act(async () => {
      await result.current.onSubmit({
        fullName: 'John Doe',
        cpf: '123.456.789-00',
        email: 'john@example.com',
        favoriteColor: 'blue',
        observations: 'Some text',
      });
    });

    expect(result.current.status).toBe('error');
    expect(result.current.errorKey).toBe('errorMessage');
  });

  it('should update status to error and set conflictErrorMessage errorKey on duplicate submit', async () => {
    (createClientAction as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: 'CLIENT_ALREADY_EXISTS',
    });

    const { result } = renderHook(() => useClientRegistrationForm());

    await act(async () => {
      await result.current.onSubmit({
        fullName: 'John Doe',
        cpf: '123.456.789-00',
        email: 'john@example.com',
        favoriteColor: 'blue',
        observations: 'Some text',
      });
    });

    expect(result.current.status).toBe('error');
    expect(result.current.errorKey).toBe('conflictErrorMessage');
  });

  it('should update status to error on exception', async () => {
    (createClientAction as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useClientRegistrationForm());

    await act(async () => {
      await result.current.onSubmit({
        fullName: 'John Doe',
        cpf: '123.456.789-00',
        email: 'john@example.com',
        favoriteColor: 'blue',
        observations: 'Some text',
      });
    });

    expect(result.current.status).toBe('error');
    expect(result.current.errorKey).toBe('errorMessage');
  });

  it('should reset status to idle and errorKey to null when onReset is called', async () => {
    (createClientAction as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: 'CLIENT_ALREADY_EXISTS',
    });

    const { result } = renderHook(() => useClientRegistrationForm());

    await act(async () => {
      await result.current.onSubmit({
        fullName: 'John Doe',
        cpf: '123.456.789-00',
        email: 'john@example.com',
        favoriteColor: 'blue',
        observations: 'Some text',
      });
    });

    expect(result.current.status).toBe('error');
    expect(result.current.errorKey).toBe('conflictErrorMessage');

    act(() => {
      result.current.onReset();
    });

    expect(result.current.status).toBe('idle');
    expect(result.current.errorKey).toBeNull();
  });
});
