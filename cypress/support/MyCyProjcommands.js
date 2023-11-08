


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types = "Cypress"/> 

Cypress.Commands.add('getIframe', (iframe)=>{
    return cy.get(iframe)
    .its('0.contentDocument.body')
    .should('be.visible')
    .then(cy.wrap)
})

Cypress.Commands.add('clickLink',(label)=>{  /*-- label = text --*/
    cy.get('a').contains(label).click();
})

Cypress.Commands.add('SignIn', (username, password)=>{
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('[type="submit"]').click();
})

Cypress.Commands.add('exportTextToJsonFile', (filename, propertyname, textToAdd)=>{
    cy.fixture(filename + '.json').then((data) => {
        data[propertyname] = textToAdd;
        cy.writeFile('cypress/fixtures/' + filename + '.json', data);
    }); 
});

Cypress.Commands.add('LoginFAST', (region)=>{
    if(region === 'test2'){
        cy.log(Cypress.env('TEST2_URL'));
    }
    else if (region === 'test1'){
        cy.log(Cypress.env('TEST1_URL'));
        cy.log(Cypress.env('USERNAME'));
        cy.log(Cypress.env('PASSWORD'));
    }else{
        throw new Error("Unsupported region");
    }
})

/// <reference types="Cypress" />




/* DIDN'T WORK >> --- overwrite .contains() --- */
/*Cypress.Commands.overwrite('contains', (originalFn, subject, filter, text, options = {}) => {
    //dertmine if a filter argument was passed
    if(typeof text == 'object'){
        options = text
        text = filter
        filter = undefined
    }

    options.matchCase = false

    return originalFn(subject, filter, text, options)
})
*/


// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


