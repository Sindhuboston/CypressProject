describe('test to get text from the UI element', () => {

    before(()=>{
        cy.visit('https://skillboard.org/')
   })
    it('to use invoke to get text', () => {

        cy.get('.max-w-').find('.max-w-xl').invoke('text').then((text)=>{
            cy.wrap(text).should('include', 'Leading domain')
            console.log("UI text:"+text)
        })
    })
})