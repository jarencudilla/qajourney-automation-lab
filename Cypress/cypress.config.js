const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://playground.qajourney.net',
    specPattern: 'e2e/**/*.cy.js',
    defaultCommandTimeout: 6000,
    pageLoadTimeout: 15000,
    screenshotOnRunFailure: true,
    video: false,
    setupNodeEvents(on, config) {},
  },
});
