
describe('UsingFixtures', ()=>{

/*
let Data;
beforeEach(() => {
    cy.fixture('skillboard.json').then((data) => {
    Data = data;
    });
});
*/

    it('should_signIn_to_skillboard', ()=>{
        cy.visit('https://skillboard.org/');
        cy.get('button').contains('Sign in', {matchCase: true}).click();
        
        cy.fixture('skillboard_SignIn.json').then((data)=>{     //--calling 'fixture'
            cy.get('#username').should('be.visible');
            cy.SignIn(data.username, data.password);            //--calling 'SignIn' commands.js
                        
            cy.get('a').contains('Sindhu Sudhakaran', {matchCase: true}).should('be.visible');
            cy.get('.ml-8').click();
        })
    })

    it.skip('should_do_DDT_signup', ()=>{
        cy.visit('https://skillboard.org/');
        cy.get(".ml-8").click();

        cy.fixture('skillboard_DDT.json').then((data)=>{        
            data.forEach(getDDT => {
                cy.get("#firstName").clear().type(getDDT.firstname);
                cy.get("#lastName").clear().type(getDDT.lastname);
                cy.get("#username").clear().type(getDDT.username);
                cy.get('#email').clear().type(getDDT.email);
                cy.get("#password").clear().type(getDDT.password);

                cy.get('p').contains(getDDT.expected, {matchCase: false}).should('be.visible');
                cy.get('button[type="button"].mt-3');    //click Cancel
            })
        });
    })

    it.skip('should_do_singleDataSet_signup', () => {
        cy.visit('https://skillboard.org/');
        cy.get(".ml-8").click();
    
            //note: to enable the beforeEach for data below

        cy.get("#firstName").type(getData.firstname);
        cy.get("#lastName").type(getData.lastname);
        cy.get("#username").type(getData.username);
        cy.get('#email').type(getData.email);
        cy.get("#password").type(getData.password);
    
        cy.get("[type='submit']").click();
    
        cy.get('p').contains(getData.expected).should('be.visible');
    });
   
    it.skip('fixture demo', ()=>{
       cy.visit('https://skillboard.org/');
        cy.get(".ml-8").click();                             

        /* --- fixture --- */
        cy.fixture('skillboard_SignUP.json').then((data)=>{
            
            cy.get("#firstName").type(data.firstname);
            cy.get("#lastName").type(data.lastname);           
            cy.get("#username").type(data.username);
            cy.get('#email').type(data.email);
            cy.get("#password").type(data.password);

            cy.get('p').contains(data.expected, {matchCase: false}).should('be.visible');
            cy.get('button[type="button"].mt-3');    //click Cancel
      })
    })
})