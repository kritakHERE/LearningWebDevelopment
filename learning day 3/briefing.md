# Day 3 Briefing - Arrays, Objects, And Rendering State

[Back to README](../README.md) | [Previous: Focus Task Tracker](../focus-task-tracker/briefing.md) | [Next: Learning Progress](../learning%20progress.md)

## Goal

Practice the core data-to-UI pattern behind frontend development: store data in an array of objects, filter it, update it, and render the current state into the DOM.

## What This Demonstrates

- An array of topic objects with `id`, `name`, and `completed`.
- `forEach()` for rendering each visible topic.
- `filter()` for showing all, completed, or remaining topics.
- `findIndex()` for finding the first incomplete topic.
- `splice()` for removing an item from the array.
- `createElement()`, `textContent`, and `appendChild()` for building list items.
- `classList.add()` for completed visual state.
- `.hidden` for empty-state display logic.
- Button event listeners that change state and re-render.

## Files To Review

- `index.html` - summary panel, action buttons, filter buttons, and topic list.
- `style.css` - topic list layout and completed-topic styling.
- `script.js` - array state, filtering, rendering, completion, removal, and event listeners.

## How To Run

Open `index.html` in a browser. Click **Render Topics**, test the filter buttons, complete the first remaining topic, and remove topics from the list.

## Definition Of Done

- The page renders topics from the JavaScript array.
- Summary counts show total, completed, and remaining topics.
- Filter buttons switch between all, completed, and remaining topics.
- Complete First changes only one incomplete topic at a time.
- Remove Last removes one topic from the array.
- The UI updates after each state change.
- The empty message appears when no visible topics remain.

## Recruiter Signal

This folder shows early React-style thinking without a framework: the array is the source of truth, and the UI is rebuilt from the current state.

[Back to README](../README.md) | [Previous: Focus Task Tracker](../focus-task-tracker/briefing.md) | [Next: Learning Progress](../learning%20progress.md)
