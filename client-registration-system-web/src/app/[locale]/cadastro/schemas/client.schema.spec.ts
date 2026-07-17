import { getClientRegistrationSchema } from './client.schema';

// Mock translation function
const t = (key: string) => key;
const schema = getClientRegistrationSchema(t as any);

describe('Client Schema Validation', () => {
  it('should validate a correct client payload', () => {
    const validData = {
      fullName: 'John Doe',
      cpf: '52998224725',
      email: 'john@example.com',
      favoriteColor: 'blue',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail when fullName is empty', () => {
    const invalidData = {
      fullName: '',
      cpf: '52998224725',
      email: 'john@example.com',
      favoriteColor: 'blue',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('fullNameMin');
    }
  });

  it('should fail when CPF is invalid', () => {
    const invalidData = {
      fullName: 'John Doe',
      cpf: '12345678901', // Invalid CPF algorithmically
      email: 'john@example.com',
      favoriteColor: 'blue',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('cpfInvalid');
    }
  });

  it('should fail when email is invalid', () => {
    const invalidData = {
      fullName: 'John Doe',
      cpf: '52998224725',
      email: 'invalid-email',
      favoriteColor: 'blue',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('emailInvalid');
    }
  });
});
