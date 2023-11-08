
function selectGroupeMenuItem(groupname){
    cy.contains('a', groupname).then(menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
            if(attr.includes('left')){
                cy.wrap(menu).click();
            }
        })
    })
}

export class NavgationPage{

    formLayoutPage(){
        selectGroupeMenuItem('Forms');
        cy.contains('Form Layouts').click();
    }

    datepickerPage(){
        selectGroupeMenuItem('Forms');
        cy.contains('Datepicker').click();
    }

    toastrPage(){
        selectGroupeMenuItem('Modal & Overlays');
        cy.contains('Toastr').click();
    }

    tooltipPage(){
        selectGroupeMenuItem('Modal & Overlays');
        cy.contains('Tooltip').click();
        
    }

    
    smarttablePage(){
        selectGroupeMenuItem('Tables & Data');
        cy.contains('Smart Table').click();
    }    
}
export const navigateTo  = new NavgationPage();