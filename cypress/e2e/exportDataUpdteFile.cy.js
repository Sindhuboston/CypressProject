
describe('get UItext and save in json file', () => {

    before(()=>{
        cy.visit('https://skillboard.org/')
   })

    it('should get UItext', () => {
        cy.get('.max-w-').find('.max-w-xl').invoke('text').then((text)=>{
            cy.wrap(text).should('include', 'Leading domain')
            cy.log("UI text:"+text)
        })
    })

    it('should extract & write in json file', () => {
        cy.get('.max-w-').find('.max-w-xl').invoke('text').then((uiText)=>{
            
            /* -- defined in commands.js*/
            exportTextToJsonFile("sbSignIn", "dayOnePTD", uiText);
      });
    })

    function exportTextToJsonFile(filename, propname, text) {
        cy.fixture(filename + '.json').then((data) => {
            data[propname] = text;                          // Use the parameter directly
            cy.writeFile('cypress/fixtures/' + filename + '.json', data);
        });
    }

    it('is_Userdefined_screenshots', ()=>{
        cy.get("[alt='Skill Board Inc']").screenshot('SB_LOGO')
        cy.get('button').contains('Sign in', {matchCase: true}).click();
        cy.fixture('sbSignIn.json').then((data)=>{     //--calling 'fixture'
            cy.get('#username').should('be.visible');
            //cy.SignIn(data.username, data.password);   //--calling 'SignIn' commands.js
            cy.SignIn(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
            cy.get('a').contains('Sindhu Sudhakaran', {matchCase: true}).should('be.visible');
           
            cy.get('.ml-8').click();
        })
    })

    it.only('should enter correct login', () => {
        cy.LoginFAST('test1');
        cy.LoginFAST('test2');

    })
})