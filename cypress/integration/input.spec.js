describe('Input form', ()=>{
  const inputText = 'Buy Beer'
  beforeEach(()=>{
    cy.server();
     cy.route('GET', '/api/todos', "fixture:todos");
     cy.visit('/');
  })

  it('Focuses on input on page load', ()=>{
    cy.focused()
      .should('have.class', 'new_todo')
  });

  it('Accepts user input', ()=>{
    cy.typeInput(inputText)
      .should('have.value', inputText)
  })

  it.only('Creates new todo', ()=>{
    cy.fixture('todos').then(fixtures=>{
      cy.route({
        url: '/api/todos',
        method: "POST",
        response: [...fixtures, {id: 5, title: inputText, isComplete: false}]
      })
    })
    cy.typeInput(inputText)
      .type('{enter}')
      .should('have.value', '');

    cy.get('.todos')
      .should('have.length', 5)
      .contains(inputText);
  })
})