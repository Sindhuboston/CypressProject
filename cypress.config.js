const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportFilename: "[status]_[datetime]-[name]-report",
    timestamp: "longDate",
    charts: true,
    reportPageTitle: 'My Cypress Automation Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    autoOpen: true,
    overwrite: false,
  },
  e2e: {
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    setupNodeEvents(on, config) {
      screenshotOnRunFailure=true;
      require('cypress-mochawesome-reporter/plugin')(on);  // for HTML report
      
      // implement node event listeners here
    },
  },
});

