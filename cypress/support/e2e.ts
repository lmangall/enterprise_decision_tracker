describe("Decision Modal", () => {
  beforeEach(() => {
    // Visit the page using the relative URL
    cy.visit("/your-page-url"); // Update with the relative URL of your page
  });

  it("should open the modal when the New Decision button is clicked", () => {
    cy.get("button").contains("New Decision").click();
    cy.get("div").contains("Create New Decision").should("be.visible");
  });

  it("should allow filling out the form and submit it", () => {
    cy.get("button").contains("New Decision").click();

    // Fill out the form
    cy.get('input[name="title"]').type("New Decision Title");
    cy.get('textarea[name="description"]').type(
      "This is a detailed description of the decision."
    );
    cy.get('input[name="measurableGoal"]').type("This is a measurable goal.");

    // Select a date
    cy.get("button").contains("Select a date").click();
    cy.get("button").contains("15").click(); // Update based on available date in the calendar

    // Select status
    cy.get("button").contains("Select status").click();
    cy.get("div").contains("Pending").click(); // Update based on available status

    // Submit the form
    cy.get("button").contains("Submit Decision").click();

    // Check for success toast message
    cy.get(".toast-success").should(
      "contain.text",
      "Decision created successfully!"
    );
  });

  it("should close the modal when the close button is clicked", () => {
    cy.get("button").contains("New Decision").click();
    cy.get("button").contains("Close").click();
    cy.get("div").contains("Create New Decision").should("not.exist");
  });

  it("should display validation errors when form fields are left empty", () => {
    cy.get("button").contains("New Decision").click();
    cy.get("button").contains("Submit Decision").click();

    // Check for validation errors
    cy.get("p").contains("Title is required").should("be.visible");
    cy.get("p").contains("Measurable goal is required").should("be.visible");
  });
});
