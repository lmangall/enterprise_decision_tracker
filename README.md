
[Deployed Demo](https://enterprise-decision-tracker.vercel.app/)

## Intro
This project is a coding challenge following a job interview for a frontend position. You can see the assignment under Docs/assignment.md


## My Approach to this project:
I started by spending a full day overengineering the architecture and researching:
Building a react front-end without any back, seems like a pretty face without any soul or heart, so I wanted *at least* a database, *ideally* way more.
First idea was to have front, back, ***and*** db in a single Vercel project. I wanted to leverage the new feature that makes it possible to run Python. It seemd like a great setup for future projects as well.
Unfortunally this proved impossible: front (Next) and back (Python) or front (Next) and DB(Postgres) is possible, but Vercel postgres use a Next.js sdk, so the backend is useless (at least in terms of being a midleware for front and back). For it to makes sense the project would have to rely on an external DB, but then we would loose the "encapsulation". 
=> End of the overengineering phase (but I'll keep my Next.js+Python setup for possible future projects (it wasn't easy to set up)). I settled on Vercel+Postgress, Postgress being new to me, this is a good opportunity.
Then I did some research on tools and good practises to improve quality and productivity. I did some CI/CD with [Webserv](https://github.com/dantol29/webserver/) (where we had a great team work) but it wasn't much.
I discovered simple git hooks, and more advanced E2E and unit testing with Cypress, that I setup in the repo. Very simple tests, but it was my first time with it so again a great opportunity to learn, next time I will be able to set up better testing.

Since the recruiter mentioned that it's acceptable to use ChatGPT to complete the challenge, and I like to do quality work fast, and I had more ideas that I could ever implement in this timespan, I decided to go for it. For a few days work I am impressed in how much I learned. I used many new tools but also was able to recycle past code pieces ([LoveLetter](https://langgenie.xyz/loveletter) API calls) and ideas. I am really satisfied with the outcome. 
Of course it's far from being perfect, there is a lot of place left for improvement, but I am happy about the code, performance and responsiveness.
My main deception is not having being able to have the fullstack with python middleware hosted on Vercel, but that also would have been a risk to go to far out of requirements.


## Architecture

### Stack:
- Next.js (transitionned from js to ts)
- Deployed on Vercel
- postgres DB from Vercel

## UX/UI
<details>
<summary>Shadcn "library"
</summary>

It's not per-se a library overloading the `node_modules` folder. Instead of installing a package, we use an `npx` command that will copy/paste the code, or copy paste manually of course.
It's built on top of Radix and Tailwind, so solid fundations.
The idea behind this is to give you ownership and control over the code, allowing you to decide how the components are built and styled, and full freedom to modify it.
So yeah, it's the trendy library at the moment, but this was my first experience and I'm blown away with how fast you get to the result you want.
It relies on Radix and Tailwind

</details>

- aceternity


### Testing and code quality:
- conventional commits
- git hooks to have pre-commit tests
- Cypress for unit testing
- Automated CI/CD with GitHub Actions

### Functionality:

- Required functionalities + small details (Goal dates, pending status...)
- Proper (I think) form validation (more under Docs/FormsValidation.md)
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

### passing a prop to a children
I know this one is a classic. I experienced it with the toast. Furthermore I was carefull not to "toast" in a server component (or trigger it, because showing wouldn t be possible) in order to separate the concerns: server (child) component throw an error, client (parent) component catches it and triggers a toast

## Extras and Improvements left to do:

- Show raw data (S. mention it is something to be implemented for A. I find it cool to see a raw json behind a pretty ui)
- Clear and dark mode (mentioned by Sim)
- Redux
- more DRY (FetchAIDecision and DecisionModal have similar mechanisms to add to context and db)
- having a rating value for _important_ and _urgent_ would allow to have an Eisenhower matrix to prioritize and have a graphic, would be super cool and useful
- Finish implementing the clear/dark mode
- center the goal_met icon
- aceternity animation (hero border gradient, moving borders, aurora background, )
- confirm before deletion
- check folders: not all components in hood directory are hooks



