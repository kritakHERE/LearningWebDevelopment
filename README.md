# JavaScript Frontend Learning Portfolio

This repository documents my practical path into frontend web development. It starts with browser JavaScript fundamentals and builds toward the way modern frontend frameworks think: state first, UI rendered from state, and user actions connected through event-driven code.

The work here is intentionally simple and transparent. Each folder shows a specific skill, the code is kept small enough to review quickly, and the progress notes explain what I learned while building.

## Portfolio Navigation

| Area | What it demonstrates | Open |
| --- | --- | --- |
| [Day 1 - DOM Basics](https://kritakhere.github.io/LearningWebDevelopment/learning%20day%201/briefing.html) | Selecting elements, creating elements, setting text, appending, changing attributes, removing elements | [Demo](https://kritakhere.github.io/LearningWebDevelopment/learning%20day%201/index.html) |
| [Day 2 - Events and State](https://kritakhere.github.io/LearningWebDevelopment/learning%20day%202/briefing.html) | Button events, changing state, rendering text updates, class changes, disabled button behavior | [Demo](https://kritakhere.github.io/LearningWebDevelopment/learning%20day%202/index.html) |
| [Focus Task Tracker](https://kritakhere.github.io/LearningWebDevelopment/focus-task-tracker/briefing.html) | A small interactive task app with input handling, task state, rendering, complete/delete actions, summary counts, and empty states | [Demo](https://kritakhere.github.io/LearningWebDevelopment/focus-task-tracker/index.html) |
| [Day 3 - Arrays and Rendering State](https://kritakhere.github.io/LearningWebDevelopment/learning%20day%203/briefing.html) | Array of objects, filtering, rendering lists, `forEach()`, `filter()`, `findIndex()`, `splice()`, and state-to-UI flow | [Demo](https://kritakhere.github.io/LearningWebDevelopment/learning%20day%203/index.html) |
| [Learning Progress](https://kritakhere.github.io/LearningWebDevelopment/learning-progress.html) | Written record of concepts, definitions of done, self-evaluation, and next learning goals | [Open notes](https://kritakhere.github.io/LearningWebDevelopment/learning-progress.html) |

## Guided Reading Path

Start here, then move through the linked briefings in order:

1. [Day 1 briefing - DOM basics](https://kritakhere.github.io/LearningWebDevelopment/learning%20day%201/briefing.html)
2. [Day 2 briefing - events and state](https://kritakhere.github.io/LearningWebDevelopment/learning%20day%202/briefing.html)
3. [Focus Task Tracker briefing - mini project](https://kritakhere.github.io/LearningWebDevelopment/focus-task-tracker/briefing.html)
4. [Day 3 briefing - arrays and rendering state](https://kritakhere.github.io/LearningWebDevelopment/learning%20day%203/briefing.html)
5. [Learning progress journal](https://kritakhere.github.io/LearningWebDevelopment/learning-progress.html)

For the published GitHub Pages view, open [the portfolio landing page](https://kritakhere.github.io/LearningWebDevelopment/).

## What Recruiters Can Look For

- I can build small browser-based interfaces with HTML, CSS, and vanilla JavaScript.
- I understand the DOM enough to create, update, append, hide, and remove elements.
- I can connect user actions to JavaScript with `addEventListener()`.
- I can store UI state in variables, arrays, and objects.
- I can render visible UI from data instead of manually hardcoding every state.
- I am practicing the same mental model used in React and other frontend frameworks: state changes, then the UI updates from that state.
- I keep written learning notes and definitions of done, which shows reflection and steady improvement.

## Current Technical Focus

The main pattern being practiced is:

```txt
User action -> event listener -> state change -> render function -> updated UI
```

This appears most clearly in the Focus Task Tracker and Day 3 exercises, where arrays of objects become visible lists on the page.

## Folder Briefings

Each learning or project folder includes a `briefing.md` source file and a `briefing.html` page for GitHub Pages with:

- the goal of the folder,
- the skills demonstrated,
- the files to review,
- how to run it locally,
- and what the exercise proves.

These briefings are meant to make the repository easy to scan during a portfolio or junior frontend candidate review.

## How To Run

No build step is required. Each exercise is a static browser project.

Open any demo page directly in a browser:

- [Day 1 demo](https://kritakhere.github.io/LearningWebDevelopment/learning%20day%201/index.html)
- [Day 2 demo](https://kritakhere.github.io/LearningWebDevelopment/learning%20day%202/index.html)
- [Focus Task Tracker demo](https://kritakhere.github.io/LearningWebDevelopment/focus-task-tracker/index.html)
- [Day 3 demo](https://kritakhere.github.io/LearningWebDevelopment/learning%20day%203/index.html)

## Learning Direction

Next steps are to keep strengthening JavaScript array methods, refactor the task tracker into clearer functions, add persistence with `localStorage`, and then move these same ideas into React components and state.
