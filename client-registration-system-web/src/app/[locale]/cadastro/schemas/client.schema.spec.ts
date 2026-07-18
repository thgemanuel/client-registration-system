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

  it('should validate a correct payload including optional observations', () => {
    const validData = {
      fullName: 'John Doe',
      cpf: '52998224725',
      email: 'john@example.com',
      favoriteColor: 'green',
      observations: 'VIP client',
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should validate successfully when observations is omitted', () => {
    const validData = {
      fullName: 'John Doe',
      cpf: '52998224725',
      email: 'john@example.com',
      favoriteColor: 'red',
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

  it('should fail when fullName is shorter than 3 characters', () => {
    const invalidData = {
      fullName: 'Jo',
      cpf: '52998224725',
      email: 'john@example.com',
      favoriteColor: 'blue',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should fail when fullName does not contain a space (no surname)', () => {
    const invalidData = {
      fullName: 'John',
      cpf: '52998224725',
      email: 'john@example.com',
      favoriteColor: 'blue',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('fullNameInvalid');
    }
  });

  it('should fail when fullName has a space but the surname is shorter than 2 characters', () => {
    const invalidData = {
      fullName: 'John D',
      cpf: '52998224725',
      email: 'john@example.com',
      favoriteColor: 'blue',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('fullNameInvalid');
    }
  });

  it('should fail when fullName contains numbers', () => {
    const invalidData = {
      fullName: 'John Doe 123',
      cpf: '52998224725',
      email: 'john@example.com',
      favoriteColor: 'blue',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('fullNameContainsNumbers');
    }
  });

  it('should fail when CPF is invalid algorithmically', () => {
    const invalidData = {
      fullName: 'John Doe',
      cpf: '12345678901',
      email: 'john@example.com',
      favoriteColor: 'blue',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('cpfInvalid');
    }
  });

  it('should fail when CPF is empty', () => {
    const invalidData = {
      fullName: 'John Doe',
      cpf: '',
      email: 'john@example.com',
      favoriteColor: 'blue',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('cpfRequired');
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

  it('should fail when email is empty', () => {
    const invalidData = {
      fullName: 'John Doe',
      cpf: '52998224725',
      email: '',
      favoriteColor: 'blue',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('emailRequired');
    }
  });

  it('should fail when favoriteColor is not a valid enum value', () => {
    const invalidData = {
      fullName: 'John Doe',
      cpf: '52998224725',
      email: 'john@example.com',
      favoriteColor: 'purple',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('favoriteColorRequired');
    }
  });

  it('should fail when favoriteColor is missing', () => {
    const invalidData = {
      fullName: 'John Doe',
      cpf: '52998224725',
      email: 'john@example.com',
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should strip CPF formatting characters and keep only digits on success', () => {
    const formattedData = {
      fullName: 'John Doe',
      cpf: '529.982.247-25',
      email: 'john@example.com',
      favoriteColor: 'blue',
    };

    const result = schema.safeParse(formattedData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.cpf).toBe('52998224725');
    }
  });

  it('should fail when observations exceeds 500 characters', () => {
    const invalidData = {
      fullName: 'John Doe',
      cpf: '52998224725',
      email: 'john@example.com',
      favoriteColor: 'blue',
      observations: 'a'.repeat(501),
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('observationsMax');
    }
  });

  it('should accept all valid favorite color options', () => {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    colors.forEach((color) => {
      const data = {
        fullName: 'John Doe',
        cpf: '52998224725',
        email: 'john@example.com',
        favoriteColor: color,
      };
      const result = schema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });
});

