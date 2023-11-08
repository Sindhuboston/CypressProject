
   /*Note:
        1. Only execution on Terminal will create screenshots & videos.
        2. Automatic screenshots & videos will happen only for a failed step
        2. Execution on Cypress app will not store automatic screenshots & videos
        */


describe('ScreenshotsAndVideos', ()=>{

    it.skip('Userdefined_screenshots', ()=>{
        
        cy.visit('https://skillboard.org/');
        
        cy.screenshot("HomePage");
        cy.get("[alt='Skill Board Inc']").screenshot('SB_LOGO')

        cy.get('button').contains('Sign in', {matchCase: true}).click();
        
        cy.fixture('skillboard_SignIn.json').then((data)=>{     //--calling 'fixture'
           
            cy.get('#username').should('be.visible');
            cy.SignIn(data.username, data.password);            //--calling 'SignIn' commands.js
                        
            cy.get('a').contains('Sindhu Sudhakaran', {matchCase: true}).should('be.visible');
            cy.screenshot("successfully Signed In")
            
            cy.get('.ml-8').click();

        })
    })
})

    it('Automatic_screenshots_videos_onFail', ()=>{
            
        cy.visit('https://skillboard.org/');
        
        cy.get("[alt='Skill Board Inc']").screenshot('SB_LOGO')

        cy.get('button').contains('Sign in', {matchCase: true}).click();
        
        cy.fixture('skillboard_SignIn.json').then((data)=>{     //--calling 'fixture'
        
            cy.get('#username').should('be.visible');
            cy.SignIn(data.username, data.password);            //--calling 'SignIn' commands.js
                        
            cy.get('a').contains('Sindhu Sudhakaran', {matchCase: true}).should('not.be.visible');
            cy.screenshot("successfully Signed In")
            
            cy.get('.ml-8').click();
        })
    })