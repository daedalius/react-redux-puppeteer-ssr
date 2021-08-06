describe('SPA Application', () => {
  it('opens at root URL', () => {
    cy.visit('/');
    cy.contains('local').should('be.visible');
    cy.contains('remote').should('be.visible');
  });
  it('opens at /local URL', () => {
    cy.visit('/local');
    cy.contains('local').should('be.visible');
    cy.contains('remote').should('be.visible');
    cy.contains('delectus aut autem').should('be.visible');
  });
  it('opens at /remote URL', () => {
    cy.visit('/remote');
    cy.contains('local').should('be.visible');
    cy.contains('remote').should('be.visible');
    cy.contains('delectus aut autem').should('be.visible');
  });
});

describe('SSR-ed Application', () => {
  it('opens at root URL', () => {
    cy.visit('http://127.0.0.1:4000');
    cy.contains('local').should('be.visible');
    cy.contains('remote').should('be.visible');
  });
  it('opens at /local URL', () => {
    cy.visit('http://127.0.0.1:4000/local');
    cy.contains('local').should('be.visible');
    cy.contains('remote').should('be.visible');
    cy.contains('delectus aut autem').should('be.visible');
  });
  it('opens at /remote URL', () => {
    cy.visit('http://127.0.0.1:4000/remote');
    cy.contains('local').should('be.visible');
    cy.contains('remote').should('be.visible');
    cy.contains('delectus aut autem').should('be.visible');
  });
});
