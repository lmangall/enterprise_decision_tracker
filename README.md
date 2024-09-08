## Architecture

### Stack:

- Use a Database
- Deploy on Vercel
- use git hooks to have pre-commit tests
- Implement automated CI/CD tests with GitHub Actions (yml)

## UX/UI

### Stack:

- Use Tailwind CSS for styling
- Use `shadcn` eventually `aceternity`

### Functionality:

- Clear and dark mode (mentioned by Sim)
- Provide an option to "show raw data" (mentioned by Sim)

### Implementation:

- Consider using a .ts template for decision formatting
- Use the React Context API in parallel with API calls for state management

## Extras and Improvements:

- Redux
- OpenAI - advice for each task
- OpenAI - format plain text tasks into task objects (eventually, also be used for deletion or other )

## Freedom in interpreting the subject:

## Problems encountered

### z-indexing
When I implemented the EditDecisionModal, the modal stayed "under" the DecisionTabs, I tried changing the z-indexing of different components but didn't get to make it work.
The approach to solve the problem involved using a portal to render the modal outside of the normal DOM hierarchy. It's probably not the way it should be, but for a projects that spans in less than a week which I am quite proud of I prefer using a trick than stay stuck in endless z-indexing.
For the sake of consistency I modified the other modal I used to also rely on Modal.tsx that is used to render a direct child of the `<body>`element
