describe('Page', () => {
  it('should render the company overview page and display a list of companies', () => {
    cy.intercept('GET', '/api/companies', {
      statusCode: 200,
      body: {
        data: [
          { companyId: 1, companyName: 'Tesla', companyCountry: 'US' },
          { companyId: 2, companyName: 'IKEA', companyCountry: 'SWE' },
        ],
      },
    }).as('getCompanies');

    cy.visit('http://localhost:3000/');

    cy.get('header > h2').contains('Trending companies');

    cy.wait('@getCompanies');

    cy.findAllByRole('listitem').should('have.length', 2);

    // Verify the text content of the first list item
    cy.findAllByRole('listitem').first().should('contain.text', 'Tesla');
  });
});
