import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here, if needed
      // Example: setup custom command
      // on('task', {
      //   exampleTask() {
      //     // task implementation
      //   }
      // });
    },
    baseUrl: "http://localhost:3000",

    //file to define global configurations, custom commands, or helper functions
    //that are shared across your tests.It's loaded automatically before your tests run.
    supportFile: "cypress/support/e2e.ts",

    // contains data you use to populate your tests.
    //It helps simulate data and ensure consistent test scenarios.
    fixturesFolder: "cypress/fixtures", // contains data you use to populate your tests. It helps simulate data and ensure consistent test scenarios.

    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
