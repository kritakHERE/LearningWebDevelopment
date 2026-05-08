# Day 2 Briefing - Events, State, And Class Control

## Goal

Practice user interaction by building a counter that responds to button clicks and updates the page from JavaScript state.

## What This Demonstrates

- `addEventListener()` for click events.
- A `let` state variable that changes over time.
- A render/update function that keeps the UI in sync with state.
- `.textContent` for updating visible values.
- `classList.add()` and `classList.remove()` for visual state changes.
- `.disabled` for preventing invalid actions.
- `if`, `else if`, and `else` for UI logic.

## Files To Review

- `index.html` - counter display and control buttons.
- `style.css` - visual states for positive, neutral, and negative values.
- `script.js` - event listeners, state changes, and UI updates.

## How To Run

Open `index.html` in a browser and use the Increase, Decrease, and Reset buttons.

## Definition Of Done

- The counter starts at `0`.
- Increase adds `1`.
- Decrease subtracts `1` when allowed.
- Reset returns the value to `0`.
- The visible number updates after each action.
- The correct class is applied for the current state.
- The Decrease button is disabled when the value is `0`.

## Recruiter Signal

This folder shows that I can connect user input to state changes and keep the interface updated through a reusable function.

