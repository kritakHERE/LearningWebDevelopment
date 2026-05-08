# JavaScript Frontend Learning Portfolio

This repository documents my practical path into frontend web development. It starts with browser JavaScript fundamentals and builds toward the way modern frontend frameworks think: state first, UI rendered from state, and user actions connected through event-driven code.

The work here is intentionally simple and transparent. Each folder shows a specific skill, the code is kept small enough to review quickly, and the progress notes explain what I learned while building.

## Portfolio Navigation

| Area | What it demonstrates | Open |
| --- | --- | --- |
| [Day 1 - DOM Basics](learning%20day%201/briefing.md) | Selecting elements, creating elements, setting text, appending, changing attributes, removing elements | [Demo](learning%20day%201/index.html) |
| [Day 2 - Events and State](learning%20day%202/briefing.md) | Button events, changing state, rendering text updates, class changes, disabled button behavior | [Demo](learning%20day%202/index.html) |
| [Focus Task Tracker](focus-task-tracker/briefing.md) | A small interactive task app with input handling, task state, rendering, complete/delete actions, summary counts, and empty states | [Demo](focus-task-tracker/index.html) |
| [Day 3 - Arrays and Rendering State](learning%20day%203/briefing.md) | Array of objects, filtering, rendering lists, `forEach()`, `filter()`, `findIndex()`, `splice()`, and state-to-UI flow | [Demo](learning%20day%203/index.html) |
| [Learning Progress](learning%20progress.md) | Written record of concepts, definitions of done, self-evaluation, and next learning goals | [Open notes](learning%20progress.md) |

## Guided Reading Path

Start here, then move through the linked briefings in order:

1. [Day 1 briefing - DOM basics](learning%20day%201/briefing.md)
2. [Day 2 briefing - events and state](learning%20day%202/briefing.md)
3. [Focus Task Tracker briefing - mini project](focus-task-tracker/briefing.md)
4. [Day 3 briefing - arrays and rendering state](learning%20day%203/briefing.md)
5. [Learning progress journal](learning%20progress.md)

For the published GitHub Pages view, open [the portfolio landing page](index.html).

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

Each learning or project folder includes a `briefing.md` file with:

- the goal of the folder,
- the skills demonstrated,
- the files to review,
- how to run it locally,
- and what the exercise proves.

These briefings are meant to make the repository easy to scan during a portfolio or junior frontend candidate review.

## How To Run

No build step is required. Each exercise is a static browser project.

Open any demo page directly in a browser:

- [Day 1 demo](learning%20day%201/index.html)
- [Day 2 demo](learning%20day%202/index.html)
- [Focus Task Tracker demo](focus-task-tracker/index.html)
- [Day 3 demo](learning%20day%203/index.html)

## Learning Direction

Next steps are to keep strengthening JavaScript array methods, refactor the task tracker into clearer functions, add persistence with `localStorage`, and then move these same ideas into React components and state.
