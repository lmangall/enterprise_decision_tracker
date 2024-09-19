
[Deployed Demo](https://enterprise-decision-tracker.vercel.app/)

## Intro
This project was a coding challenge for a frontend position. You can see the assignment under Docs/assignment.md


## My Approach to this project:
Building a react front-end without any back, seems like a pretty face without any soul or heart, so I wanted *at least* a database and decided to go over the requirements.
I decided to leverage tools and good practises to improve quality and productivity. I used git hooks for pre-commit checks and more advanced E2E/unit testing with Cypress. Very simple tests, given the project was a couple days of hacking but nontheless great to have

I used Shadcn to do quality work fast. For around 3 days of work I am impressed in how much I could to. I used new tools but also was able to recycle past code pieces ([LoveLetter](https://langgenie.xyz/loveletter) API calls) and ideas. Overall I am really satisfied with the outcome. 
Of course it's far from being perfect, there is a lot of place left for improvement, but I am happy about the code, performance and responsiveness.

## Architecture

### Stack:
- Next.js (transitionned from js to ts)
- Deployed on Vercel
- postgres DB

## UX/UI
<details>
<summary>Shadcn "library"
</summary>

It's not per-se a library overloading the `node_modules` folder. Instead of installing a package, we get the full code.
The idea behind this is to give you ownership and control over the code, allowing you to decide how the components are built and styled, and full freedom to modify it.
It's built on top of Radix and Tailwind, so solid fundations.

</details>



### Testing and code quality:
- conventional commits
- git hooks to have pre-commit tests
- Cypress for unit testing

### Functionality:

- Required functionalities + small details (Goal dates, pending status...)
- Proper form validation (more under Docs/FormsValidation.md)
- OpenAI - per-task advice
- OpenAI - Plain text task generation (the prompt is passed to openAI, mapped to Decision type, then added like a "normal" task)
- Rickroll

# Run locally:
- setup the env
- npm install
- install vercel
- vercel dev (with npm run dev the db queries might fail)
- npm cypress open or npm cypress run

## Difficulties encountered

### z-indexing
When I implemented the EditDecisionModal, the modal stayed "under" the DecisionTabs, I tried changing the z-indexing of different components but didn't get to make it work.
The approach to solve the problem involved using a portal to render the modal outside of the normal DOM hierarchy. It's probably not the way it should be, but for a projects that spans in less than a week which I am quite proud of I prefer using a trick than stay stuck in endless z-indexing.
For the sake of consistency I modified the other modal I used to also rely on Modal.tsx that is used to render a direct child of the `<body>`element

### types.ts
Within the `decision` type, `id`, `created_at` and `updated_at` are undefined during form validation, they will be generated later when added to the context and db, this create discrepancies in the type of `decision` and makes it more hard to have a ***DRY*** code. I did do an _Interface_ and an _Interface extension_ on decision, but I didn't had enough time to have the code as DRY and clean as I would have wanted it to be.

### validation:
See under `Docs/FormsValidation.md`


## Extras and Improvements left to do:

- Show raw data (I find it cool to see a raw json behind a pretty ui)
- Clear and dark mode
- Redux
- more DRY (FetchAIDecision and DecisionModal have similar mechanisms to add to context and db)
- having a rating value for _important_ and _urgent_ would allow to have an Eisenhower matrix to prioritize and have a graphic, would be super cool and useful
- Finish implementing the clear/dark mode
- center the goal_met icon
- aceternity animation (hero border gradient, moving borders, aurora background, )
- confirm before deletion
- check folders: not all components in hooks directory are hooks
- click outside of modal to exit



