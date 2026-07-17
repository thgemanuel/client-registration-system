// Helper function to generate a valid CPF
function generateValidCPF(): string {
  const randomDigit = () => Math.floor(Math.random() * 9);
  const n = Array.from({ length: 9 }, randomDigit);

  let d1 = 0;
  for (let i = 0; i < 9; i++) {
    d1 += n[i] * (10 - i);
  }
  d1 = 11 - (d1 % 11);
  if (d1 >= 10) d1 = 0;

  let d2 = 0;
  for (let i = 0; i < 9; i++) {
    d2 += n[i] * (11 - i);
  }
  d2 += d1 * 2;
  d2 = 11 - (d2 % 11);
  if (d2 >= 10) d2 = 0;

  return n.join('') + d1 + d2;
}

describe('Client Registration Flow', () => {
  it('should display validation errors for empty submission', () => {
    cy.visit('/pt/cadastro');

    cy.get('button[type="submit"]').click();

    cy.get('.text-destructive').should('have.length.greaterThan', 0);
    cy.contains('Nome completo deve ter pelo menos 3 caracteres').should('be.visible');
  });

  it('should successfully register a client', () => {
    cy.visit('/pt/cadastro');
    cy.wait(1000); // Wait for Next.js hydration

    const validCpf = generateValidCPF();

    cy.get('input[name="fullName"]').should('be.visible').clear().type('Cypress E2E User', { delay: 10 });
    cy.get('input[name="cpf"]').should('be.visible').clear().type(validCpf, { delay: 10 });
    
    const uniqueEmail = `cypress_${Date.now()}@example.com`;
    cy.get('input[name="email"]').should('be.visible').clear().type(uniqueEmail, { delay: 10 });
    
    cy.get('button[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Azul').click();

    cy.get('button[type="submit"]').click();

    cy.get('.text-destructive').should('not.exist');
    cy.contains('Cadastro realizado com sucesso!').should('be.visible');
  });
});

