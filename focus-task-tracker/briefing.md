# Focus Task Tracker Briefing

## Goal

Build a small interactive task tracker using vanilla JavaScript, with task creation, completion, deletion, summary counts, and empty-state handling.

## What This Demonstrates

- Reading and validating input with `.value` and `.trim()`.
- Enabling and disabling buttons based on input state.
- Storing tasks in an array of objects.
- Creating task objects with `id`, `text`, and `completed`.
- Rendering an array into the DOM with `forEach()`.
- Creating multiple DOM elements per task.
- Marking completed tasks with classes.
- Finding a specific task with `findIndex()`.
- Removing tasks with `splice()`.
- Updating derived values: total, completed, and remaining.
- Showing and hiding an empty message with `.hidden`.

## Files To Review

- `index.html` - app layout, input, controls, summary, and task list.
- `style.css` - complete app styling and completed-task state.
- `script.js` - task state, event listeners, rendering, complete/delete behavior, and summary updates.

## How To Run

Open `index.html` in a browser. Add a task, complete it, delete it, and watch the summary values update.

## Definition Of Done

- A user can type a task and add it to the list.
- Empty input cannot be submitted.
- Each task appears as a rendered list item.
- Each task can be completed or deleted.
- Summary counts stay accurate.
- The empty message appears only when there are no tasks.

## Recruiter Signal

This is the strongest project in the repository so far. It shows the practical frontend loop: collect user input, update state, render the UI, and keep feedback accurate.

