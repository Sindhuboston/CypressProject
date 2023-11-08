/// <reference types="cypress" />

describe('First Test Suite', ()=>{
    it('first test', ()=>{
       cy.visit('/') // url is already added in the cyperss.config.js file

       cy.contains('Forms').click();
       cy.contains('Form Layouts').click();

       //by tag name 
       cy.get('input');

       //by ID
       cy.get('#inputEmail1');

       //by class value
       cy.get('.input-full-width');

       //by attribute name
       cy.get('[fullwidth]');

       //by attribute and value
       cy.get('[placeholder="Email"]');

       //by class and value
       cy.get('[class="input-full-width size-medium shape-rectangle"]')

       //by two attributes
       cy.get('[placeholder="Email"][fullwidth]') //without any space between them

       //but tag, id, class, attribute
       cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')
    })

    it('second test',()=>{
        cy.visit('/') // url is already added in the cyperss.config.js file

        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //Theory: 
        // get() - find elements on the entire page by locator globally
        // find() - find child elements by locator 
        // contains() - find HTML text and by text and locator

        cy.contains('Sign in');
        cy.contains('[status="warning"]', 'Sign in');
        cy.contains('nb-card', 'Horizontal form').find('button');
        cy.contains('nb-card', 'Horizontal form').contains('Sign in');

        // cypress chains and DOM 
        cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('.custom-checkbox')
        .click(); //note- should not chain after Action
    })

    it('save subject of the command', ()=>{
        cy.visit('/') // url is already added in the cyperss.config.js file

        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');
                
        //1. cypress Alias
        cy.contains('nb-card', 'Using the Grid').as('theGrid')
        cy.get('@theGrid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.get('@theGrid').find('[for="inputPassword2"]').should('contain', 'Password');

        //2. cypress then() method
        cy.contains('nb-card', 'Using the Grid').then(theGrid =>{
            cy.wrap(theGrid).find('[for="inputEmail1"]').should('contain', 'Email');
            cy.wrap(theGrid).find('[for="inputPassword2"]').should('contain', 'Password');
        })
    })

    it('radio buttons',()=>{
        cy.visit('/') // url is already added in the cyperss.config.js file

        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( allradiobutton =>{
                cy.wrap(allradiobutton).eq(0).check({force: true}).should('be.checked');
                cy.wrap(allradiobutton).eq(1).check({force: true});                
                cy.wrap(allradiobutton).eq(0).should('not.be.checked');
                cy.wrap(allradiobutton).eq(2).should('be.disabled');
        })
 
        cy.get('[type="radio"]').eq(0).check({force: true}); // this is also valid 
    })

    it('checkboxes',()=>{
        cy.visit('/') // url is already added in the cyperss.config.js file

        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        cy.get('[type="checkbox"]').eq(0).click({force: true});
        cy.get('[type="checkbox"]').eq(1).check({force: true});
       
    })

    it('Date Picker', ()=> {
        function selectDayFromCurrent(day){
            let date = new Date();
            date.setDate(date.getDate() + day);
            let futureDay = date.getDate();
            let futureMonth = date.toLocaleDateString('en-US', {month: 'short'});
            let futureYear = date.getFullYear();
            let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`;

            //pick month & year:
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                    cy.get('[data-name="chevron-right"]').click();
                    selectDayFromCurrent(day);
                }else{//pick date:
                    cy.get('.day-cell').not('.bounding-month').contains(futureDay).click();
                }
            })
            return dateToAssert
        }

        cy.visit('/') // url is already added in the cyperss.config.js file
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input =>{
            cy.wrap(input).click();
            const dateToAssert = selectDayFromCurrent(200);    
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert);
            cy.wrap(input).should('have.value', dateToAssert);           
        })
    })

    it('Lists and Dropdowns', () => {
        cy.visit('/') ;

        //1st approach to only select 'Dark' theme:
        cy.get('nav nb-select').click();
        cy.get('.options-list').contains('Dark').click();
        cy.get('nav nb-select').should('contain', 'Dark');

        //2nd approach to select each options:
        cy.get('nav nb-select').then( dropDown => {
            cy.wrap(dropDown).click();
            cy.get('.options-list nb-option').each( (listItem, index) => {
                    const itemText = listItem.text().trim();
                        cy.wrap(listItem).click();
                        cy.wrap(dropDown).should('contain', itemText);
                        if( index < 3){
                            cy.wrap(dropDown).click();
                        }
            })
        })
    })

    it.only('WebTables', ()=>{
        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        //Get row by text - select Larry in the table and modify the age:
        cy.get('table').contains('tr', 'Larry').then( rowElement => {
            cy.wrap(rowElement).find('.nb-edit').click(); 
            cy.wrap(rowElement).find('[placeholder="Age"]').clear().type('35');
            cy.wrap(rowElement).find('.nb-checkmark').click();
            cy.wrap(rowElement).find('td').eq(6).invoke('text').then((textAge)=>{
               expect(textAge).to.equal('35');
               cy.wrap(rowElement).find('td').eq(6).should('contain', '35');
            })
        })
        //Get row by index 
        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').eq(2).then( rowElement =>{
            cy.wrap(rowElement).find('[placeholder="First Name"]').clear().type('Mike');
            cy.wrap(rowElement).find('[placeholder="Last Name"]').clear().type('Smith');
            cy.wrap(rowElement).find('.nb-checkmark').click();
            //-- assertion:
            cy.get('tbody tr').first().find('td').then(allColumns => {
                cy.wrap(allColumns).eq(2).should('contain', 'Mike');
                cy.wrap(allColumns).eq(3).should('contain', 'Smith');
            })
        })

        //Get filtered row:
        const age = [20, 30, 40, 200]
        cy.wrap(age).each(age =>{
            cy.get('thead [placeholder="Age"]').clear().type(age);
            cy.wait(500)
            cy.get('tbody tr').each(tablerow => {
                if(age == 200){
                    cy.wrap(tablerow).should('contain', 'No data found')
                }else{
                    cy.wrap(tablerow).find('td').eq(6).should('contain', age);
                }
            })
        })
    })
})