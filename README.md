# TO DO
- unit testing with cypress + write docs
- toogle for clear/dark mode
- center the goal_met icon
- raw data view
- improve tabs ui
- ai help for tab
- aceternity animation (hero border gradient, moving borders, aurora background, )
- goldenticket security
- improve form validation + write docs
- rickroll
- confirm before deletion

- table ui:
smaller goal date
burger more on the right 
status smaller
categories bigger


Deployed demo:
https://enterprise-decision-tracker.vercel.app/


## Architecture

### Stack:
- Next.js (transitionned from js to ts)
- Deployed on Vercel
- postgres db from Vercel


## UX/UI
- `shadcn` "library" (it relies on Radix and Tailwind)
- aceternity

### :


### Testing and code quality:
- conventional commits
- git hooks to have pre-commit tests
- Cypress for unit testing
- Automated CI/CD with GitHub Actions

### Functionality:

- Clear and dark mode (mentioned by Sim)
- Show raw data (Sim mention it is something to be implemented for A. I find it cool to see a raw json behind a pretty ui)
- OpenAI - advice for each task
- OpenAI - format plain text tasks into task objects (eventually, also be used for deletion or other )


### Implementation:
- React Context API in parallel with API calls for state management

## Extras and Improvements:

- Redux
- more DRY (FetchAIDecision and DecisionModal have similar mechanisms to add to context and db)

## Freedom in interpreting the subject:

## Problems encountered

### z-indexing
When I implemented the EditDecisionModal, the modal stayed "under" the DecisionTabs, I tried changing the z-indexing of different components but didn't get to make it work.
The approach to solve the problem involved using a portal to render the modal outside of the normal DOM hierarchy. It's probably not the way it should be, but for a projects that spans in less than a week which I am quite proud of I prefer using a trick than stay stuck in endless z-indexing.
For the sake of consistency I modified the other modal I used to also rely on Modal.tsx that is used to render a direct child of the `<body>`element

### validation:
classic type validation is handled through react-hook-forms, then
add: check first in context for a duplicate, if there are no duplicate add to context and db (id is highest + 1). This order is important to minimize unnecessary calls to backend
edit: In this case, naturally there can be a "duplicate" when we compare new form/existing form, as long as the id is the same its fine (otherwise the user is creating a second but identic one)
delete: delete in both db and context

### passing a prop to a childre
I know it's a classic

# Run locally:
- npm install
- install vercel
- vercel dev (with npm run dev the db queries might fail)
- setup the env