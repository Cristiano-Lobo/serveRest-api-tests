const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "https://serverest.dev",
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    setupNodeEvents(on, config) {
      config.env.API_EMAIL = process.env.CYPRESS_API_EMAIL;
      config.env.API_PASSWORD = process.env.CYPRESS_API_PASSWORD;
      return config;
    },
  },
  video: false,
});
