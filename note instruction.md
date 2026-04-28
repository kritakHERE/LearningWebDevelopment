# Note Instruction

## Learner Context

Who I am:
- I am a teenager learning JavaScript with the current goal of becoming strong at frontend web development.
- My next major step after JavaScript is React.
- I want to become excellent at AI-assisted coding, or "vibecoding", by understanding what the AI wrote, managing errors, directing projects, and producing polished web apps.
- I may explore TypeScript and other tools later, but they are not important right now.

Career goal:
- Build enough real frontend skill to earn around 20 to 40 USD per hour through skilled gig freelancing or remote website work.

Existing background:
- I am not starting from zero.
- I have previous programming knowledge, DSA exposure, SQL/database knowledge, system and software engineering awareness, operating systems, and computer architecture/organization background.
- I have an intuitive understanding of object oriented programming, OOP pillars, and exception handling from Java.
- I have previous experience with HTML and CSS from college projects and hobby learning.

Learning style and teaching direction:
- Build JavaScript on top of my existing programming knowledge instead of treating me like a total beginner.
- Always connect JavaScript concepts to what they can do for a website.
- Use implementation-focused exercises, not only theory.
- Include small projects that help me read, debug, modify, and direct AI-generated code.
- Prefer clear mental models, practical browser examples, and frontend use cases.

Current known progress:
- Day 1 completed: JavaScript DOM basics.
- Practiced selecting an element, creating an element, adding text with `textContent`, appending with `appendChild()`, setting an attribute with `setAttribute()`, and removing an element with `.remove()` inside a button click handler.

Important correction to remember:
- `parent.appendChild(child)` means "put the child inside the parent".
- `practiceArea.appendChild(newParagraph)` is correct because the paragraph should go inside the practice area.
- `newParagraph.appendChild(practiceArea)` is reversed and would try to put the whole practice area inside the paragraph.

## JavaScript Mastery Course Structure

### Phase 1 - Browser JavaScript Foundation

Goal:
Understand what JavaScript can do inside a website and become comfortable controlling the live page.

What JavaScript can do for a website:
- Change text, styles, classes, and attributes after the page loads.
- Create, remove, move, and update HTML elements.
- Respond to user actions such as clicks, typing, hovering, submitting forms, and keyboard input.
- Validate forms before sending data.
- Store temporary or persistent data in the browser.
- Fetch data from APIs and render it on the page.
- Build interactive UI such as tabs, modals, accordions, filters, carts, dashboards, and single page app behavior.

Topics:
- How JS connects to HTML and CSS.
- Variables, values, types, operators, and expressions.
- Conditionals and loops as applied to UI behavior.
- Functions, parameters, return values, callbacks, and scope.
- DOM selection and DOM mutation.
- Events and event handlers.
- `classList`, `dataset`, `style`, `value`, `innerHTML` vs `textContent`.

Exercises:
- Build a button that changes a heading and toggles a CSS class.
- Build a counter with increase, decrease, reset, and disabled states.
- Build a show/hide password field.
- Build a color/theme switcher.
- Build a small profile card generator from an object.
- Build a list where items can be added and removed.

Definition of done:
- I can explain how JS finds an element, changes it, and responds to an event.
- I can debug simple DOM and event mistakes using browser DevTools.

### Phase 2 - Core JavaScript for Real UI Logic

Goal:
Write clean logic that can power real frontend features.

Topics:
- Arrays and objects deeply.
- Array methods: `forEach`, `map`, `filter`, `find`, `some`, `every`, `reduce`, `sort`.
- Object destructuring, spread/rest, optional chaining.
- String and number utilities.
- Pure functions vs functions that change the page.
- Basic module thinking: splitting logic into smaller functions.
- Error handling in JS compared with Java exception handling.

Exercises:
- Render product cards from an array of product objects.
- Add search and category filtering.
- Add sorting by price/name/date.
- Build a cart total calculator.
- Convert messy repeated code into reusable functions.
- Take an AI-generated function and explain every line, then improve names and edge cases.

Definition of done:
- I can transform data into UI.
- I can separate data logic from DOM rendering.

### Phase 3 - Forms, Validation, and State

Goal:
Build reliable user input flows.

Topics:
- Form events and `event.preventDefault()`.
- Reading input values.
- Controlled UI state with plain JS objects/arrays.
- Validation rules and error messages.
- Rendering state back into the DOM.
- Local storage and session storage.
- Basic accessibility habits for forms and buttons.

Exercises:
- Signup form with validation.
- Todo app with add, complete, delete, edit, and filter.
- Save todos in `localStorage`.
- Expense tracker with category totals.
- Multi-step form with back/next navigation.

Definition of done:
- I can build an input-heavy UI and keep the data consistent.
- I can persist browser data and reload it correctly.

### Phase 4 - Async JavaScript and APIs

Goal:
Use real data from servers and handle loading, success, and error states.

Topics:
- Callbacks, promises, `async`/`await`.
- `fetch()`.
- JSON.
- HTTP basics: GET, POST, status codes.
- Loading states, error states, empty states.
- Race conditions at a beginner-friendly level.
- `try/catch/finally`.

Exercises:
- Fetch and render users/posts from a public API.
- Build a search UI that fetches matching data.
- Build a weather-style card from API data.
- Build loading and error UI.
- Refactor API code into reusable functions.
- Ask AI to generate API code, then inspect where errors could happen.

Definition of done:
- I can connect a frontend to an API and handle failure without the UI breaking.

### Phase 5 - Modern JavaScript and Code Organization

Goal:
Write JavaScript in the style used by modern frontend projects and React.

Topics:
- ES modules: `import` and `export`.
- File organization.
- npm basics.
- Vite or another simple dev setup.
- Browser DevTools debugging.
- Linting/formatting basics.
- Naming, readability, and refactoring.

Exercises:
- Split a todo app into separate modules.
- Create `api.js`, `state.js`, `render.js`, and `events.js`.
- Install and use a small npm package.
- Debug with breakpoints instead of only `console.log`.
- Review an AI-generated file and write a short improvement list.

Definition of done:
- I can work in a project structure similar to what React uses later.

### Phase 6 - Frontend Project Mastery Before React

Goal:
Build enough plain JS projects that React feels like a helpful tool, not magic.

Projects:
- Interactive dashboard with cards, filters, sorting, and charts or simple summaries.
- Product listing page with cart and local storage.
- Habit tracker or study planner.
- Notes app with search, edit, delete, pin, and persistence.
- API-powered mini app with loading/error/empty states.
- Portfolio-ready landing page with one interactive section.

Definition of done:
- I can build a complete frontend feature without React.
- I can explain where plain JS becomes repetitive and why React helps.

### Phase 7 - AI-Assisted Coding Mastery

Goal:
Use AI as a powerful assistant while still understanding and controlling the code.

Topics:
- How to ask AI for small scoped changes.
- How to read AI-generated code.
- How to test generated code manually.
- How to find bugs by tracing data flow and events.
- How to ask for refactors without losing behavior.
- How to define requirements clearly before generating code.

Exercises:
- Give AI a feature request, then inspect the generated code line by line.
- Break the code intentionally and fix it.
- Ask AI for three implementation options and choose one.
- Convert vague feature ideas into clear acceptance criteria.
- Build a small app mostly with AI, but write a "what this code does" note for each file.

Definition of done:
- I can direct AI, catch wrong assumptions, repair bugs, and improve the final result.

Use this structure for each learning day so your notes stay consistent.

## Day Number and Topic

Objective:
Write the goal of the day in simple English.

Concepts:
- List 3 to 5 ideas you practiced.

Syntax:
```js
// Add the important syntax here.
```

Snippet:
```js
// Add your own short working code here.
```

Example:
Explain what your code does in your own words.

Definition of done:
- [ ] Add each exercise requirement here.
- [x] Mark completed work like this, or write "done" beside it.

Self-evaluation:
Write whether your exercise matches the definition of done.
Mention what worked, what confused you, and what you want to try next.

## JavaScript Exercise File Structure

For JavaScript practice files, use repeated instruction comments followed by a work section.
This makes each exercise separate and easy to solve one by one.

Exercise writing rules:
- The "Syntax to use" section should show a general pattern, not the full solution for the current task.
- Prefer placeholders such as `element`, `value`, `handler`, `class-name`, or `someVariable` instead of exact final variable names from the exercise.
- When possible, show 2 short usage patterns instead of 1 almost-complete answer.
- Do not reveal the full final event listener, final condition, or final function body unless the learner explicitly asks for the answer.
- Keep syntax examples short enough to guide memory, not short-circuit problem solving.
- If an exercise depends on updating earlier code, say clearly whether the learner should extend an existing function or replace a temporary earlier version.
- When giving syntax examples, add one line explaining what each pattern is for.

```js
/*
  Exercise 1: Short exercise name

  Goal:
  Write what this exercise teaches.

  Syntax to use:
  // Pattern 1:
  const someElement = document.getElementById("some-id");
  // Use this to select one existing element.

  // Pattern 2:
  someElement.textContent = someValue;
  // Use this to place a value into an element.

  Question:
  Write the task the learner must complete.

  Evaluation criteria:
  - State what the code must include.
  - State what should happen when the code runs.
*/

// Work section for Exercise 1:


/*
  Exercise 2: Short exercise name

  Goal:
  Write the next learning goal.

  Syntax to use:
  // Put the next syntax here.

  Question:
  Write the next task.

  Evaluation criteria:
  - State how to know this part is correct.
*/

// Work section for Exercise 2:
```

Recommended beginner HTML tags:
- `h1`, `h2`, `h3`
- `p`
- `ul`, `ol`, `li`
- `div`
- `button`

Avoid using unfamiliar tags in early exercises unless the note explains them first.
