import { createClientAction } from './index';

// We need to mock fetch globally
global.fetch = jest.fn();

describe('createClientAction', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return success and the created client on 201 response', async () => {
    const mockClientData = {
      fullName: 'John Doe',
      cpf: '12345678901',
      email: 'john@example.com',
      favoriteColor: 'blue',
    };

    const mockResponse = {
      id: 'uuid-123',
      ...mockClientData,
      insertedAt: '2026-01-01T00:00:00Z',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await createClientAction(mockClientData as any);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/clients'),
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockClientData),
      })
    );
  });

  it('should return error when fetch fails with non-ok response', async () => {
    const mockErrorResponse = {
      errors: [
        { reason: 'O campo cpf deve conter exatamente 11 dígitos numéricos.' },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
    });

    const result = await createClientAction({} as any);

    expect(result.success).toBe(false);
    expect(result.error).toBe(mockErrorResponse.errors[0].reason);
  });

  it('should return CLIENT_ALREADY_EXISTS when receiving ClientAlreadyExistsException from the API', async () => {
    const mockErrorResponse = {
      errors: [
        {
          code: 'ClientAlreadyExistsException',
          reason: 'Este CPF já está cadastrado',
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
    });

    const result = await createClientAction({} as any);

    expect(result.success).toBe(false);
    expect(result.error).toBe('CLIENT_ALREADY_EXISTS');
  });

  it('should return CLIENT_ALREADY_EXISTS when receiving ClientEmailAlreadyExistsException from the API', async () => {
    const mockErrorResponse = {
      errors: [
        {
          code: 'ClientEmailAlreadyExistsException',
          reason: 'Este E-mail já está cadastrado',
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
    });

    const result = await createClientAction({} as any);

    expect(result.success).toBe(false);
    expect(result.error).toBe('CLIENT_ALREADY_EXISTS');
  });

  it('should return a generic error message when fetch throws an exception', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const result = await createClientAction({} as any);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Erro ao conectar com o servidor.');
  });
});
