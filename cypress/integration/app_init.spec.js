describe('App initialization', ()=>{

  it('Should load todos on page load', ()=>{
    cy.server();
    cy.route('GET', '/api/todos', "fixture:todos");
    cy.visit('/');

    cy.get('.todos')
      .should('exist')
  })
  it('Handles get request failure', ()=>{
    cy.server();
    cy.route({
      url: '/api/todos',
      method: "GET",
      status: 500,
      response: {}
    });
    cy.visit('/');

    cy.get('.todos')
      .should('not.exist')

    cy.get('.error')
      .should('exist')
      .and('be.visible')
  })
})