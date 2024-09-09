**Coding Test: Enterprise Decision Tracker Application**

**Objective:**

Build a simple React application that allows users to track enterprise decisions. Each decision should include a title, description, one measurable goal, and a status indicator. Once a decision is marked as completed, users should evaluate the outcome of the measurable goal.

**Requirements:**

**Decision List Display:**

- Display a list of enterprise decisions.
- Each decision should show the title, description, measurable goal, and status (Pending or Completed).
- Completed decisions should be visually distinct (e.g., struck through or dimmed).

**Adding a Decision:**

- Provide an input form where users can add a new decision.
- The form should include:
  - **Title:** Short description or title of the decision.
  - **Description:** A more detailed explanation of the decision.
  - **Measurable Goal:** A single, clear, and quantifiable goal attached to the decision (e.g., "Increase revenue by 10%").
- Include a button that adds the decision to the list when clicked.
- Clear the form after the decision is added.

**Marking a Decision as Completed:**

- Allow users to mark a decision as completed.
- Once a decision is marked as completed, prompt the user to evaluate the outcome of the measurable goal.
- The evaluation form should ask:
  - **Was the goal met?** (Yes/No)
  - **Comments:** A text area for additional comments about the outcome.

**Editing a Decision:**

- Allow users to edit the title, description, or measurable goal of an existing decision.
- Provide an edit button next to each decision that enables the editing of the decision details.
- Save the changes when the user confirms the edit.

**Deleting a Decision:**

- Provide a button next to each decision that allows the user to delete the decision.
- Upon deletion, the decision should be removed from the list.

**Submission:**

- Submit the project as a GitHub repository.
- Include a README.md file explaining how to run the application locally.
- Write a few comments in the code explaining your approach and any assumptions made.

**Evaluation Criteria:**

- Code organization and readability.
- Proper use of React components, state, and props.
- Handling of events and forms in React.
