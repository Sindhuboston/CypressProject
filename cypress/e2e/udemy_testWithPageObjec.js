import { onDatePickerPage } from "../support/page_objects/DatePickerPage";
import { onFormLayoutsPage } from "../support/page_objects/formlayoutsPage";
import { navigateTo } from "../support/page_objects/navigationPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe('Test with Page Object', () => {

    beforeEach('open Application', () => {
        cy.openHomePage();
    })

    it('test navigation', () => {
        navigateTo.formLayoutPage();
        navigateTo.datepickerPage();
        navigateTo.toastrPage();
        navigateTo.tooltipPage();
        navigateTo.smarttablePage();
    })

    it('should complete Inline Form', () =>{
        navigateTo.formLayoutPage();
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Mike Smith', 'test@testemail');
        
    })

    it('should complete Basic Form', () => {
        navigateTo.formLayoutPage();
        onFormLayoutsPage.submitBasicFormWithNameAndEmail('test@testemail.com', 'abc');
    })

    it('should select a date from today', () => {
        navigateTo.datepickerPage();
        onDatePickerPage.selectADate(22);
    })

    it('should update table', () => {
        navigateTo.smarttablePage();
        onSmartTablePage.updateAgeByFirstName(22);
        onSmartTablePage.addNewRecordWithFirstNameAndLastName("Mike", "Smith");
    })
})