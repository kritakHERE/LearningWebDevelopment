# Learning Progress

Updated: 2026-05-01

## Current Level

I am learning browser JavaScript for frontend web development. I am no longer only practicing single lines of syntax; I am starting to connect user actions, JavaScript state, DOM updates, and small app behavior.

Current status:
- Day 1 DOM basics completed.
- Day 2 counter project completed.
- Focus Task Tracker mini project built with add, complete, delete, summary, empty-state, and disabled-button behavior.
- Day 3 lesson folder prepared for arrays, objects, filtering, and rendering from state.
- Main next topic: understand array methods more deeply, especially `forEach()`, `findIndex()`, `splice()`, and `filter()`, then clean up the task tracker code.

## Day 1 - JavaScript DOM Basics

Objective:
Learn how JavaScript can create, fill, place, remove, and change HTML elements on a live page.

Practice files:
- `learning day 1/index.html`
- `learning day 1/style.css`
- `learning day 1/script.js`

Concepts learned:
- The DOM is the browser's live version of the HTML page.
- JavaScript can select existing HTML using `document.getElementById()`.
- JavaScript can create new HTML elements using `document.createElement()`.
- `textContent` puts safe text inside an element.
- `parent.appendChild(child)` puts the child element inside the parent element.
- `setAttribute()` changes or adds an HTML attribute.
- `.remove()` deletes an element from the live page.
- A button click can run JavaScript code.

Important correction:
`practiceArea.appendChild(newParagraph)` means "put the paragraph inside the practice area".

`newParagraph.appendChild(practiceArea)` is reversed. It tries to put the whole practice area inside the paragraph.

Syntax practiced:

```js
const practiceArea = document.getElementById("practice-area");

const newParagraph = document.createElement("p");
newParagraph.textContent = "I was created using JavaScript.";
newParagraph.setAttribute("class", "created-message");

practiceArea.appendChild(newParagraph);

const button = document.getElementById("action-button");

button.onclick = () => {
  newParagraph.remove();
};
```

Definition of done:
- [x] Select an existing element.
- [x] Create one new element.
- [x] Fill that element with text.
- [x] Put that element inside another element using `appendChild()`.
- [x] Change an attribute using `setAttribute()`.
- [x] Remove an element using `.remove()`.
- [x] Use a button click to trigger code.

Self-evaluation:
Day 1 is complete. I practiced the basic DOM life cycle: select, create, fill, append, modify, and remove. The biggest mental model learned was that `appendChild()` is written as parent first, child second.

## Day 2 - Events, State, Text Changes, and Class Control

Objective:
Learn how JavaScript responds to user actions and updates the page without creating everything from scratch.

Practice files:
- `learning day 2/index.html`
- `learning day 2/style.css`
- `learning day 2/script.js`

Concepts learned:
- An event is something the user or browser does, such as clicking a button.
- `addEventListener()` connects an event to a function.
- State means data JavaScript remembers while the page is running.
- A variable declared with `let` can change over time.
- A function can keep repeated UI updates in one place.
- `textContent` can update text that already exists on the page.
- `classList.add()` and `classList.remove()` can change styling based on state.
- `.disabled` can prevent invalid button actions.
- `if`, `else if`, and `else` can choose different UI states.

Syntax practiced:

```js
const counterDisplay = document.getElementById("counter-display");
const decreaseButton = document.getElementById("decrease-button");
const resetButton = document.getElementById("reset-button");
const increaseButton = document.getElementById("increase-button");

let count = 0;

function updateCounter() {
  counterDisplay.textContent = count;

  if (count > 0) {
    counterDisplay.classList.add("positive");
    counterDisplay.classList.remove("negative", "neutral");
  } else if (count < 0) {
    counterDisplay.classList.add("negative");
    counterDisplay.classList.remove("positive", "neutral");
  } else {
    counterDisplay.classList.add("neutral");
    counterDisplay.classList.remove("positive", "negative");
  }

  decreaseButton.disabled = count === 0;
}

increaseButton.addEventListener("click", () => {
  count += 1;
  updateCounter();
});

decreaseButton.addEventListener("click", () => {
  if (count > 0) {
    count -= 1;
    updateCounter();
  }
});

resetButton.addEventListener("click", () => {
  count = 0;
  updateCounter();
});
```

Definition of done:
- [x] Create a counter number that starts at `0`.
- [x] Add an Increase button that adds `1` to the counter.
- [x] Add a Decrease button that subtracts `1` from the counter.
- [x] Add a Reset button that changes the counter back to `0`.
- [x] Show the counter value on the page using `.textContent`.
- [x] Use `addEventListener()` for all button clicks.
- [x] Use `classList.add()` for the positive counter state.
- [x] Use `classList.add()` for the negative counter state.
- [x] Use `classList.remove()` when switching states.
- [x] Disable the Decrease button when the counter is `0`, then enable it when the counter becomes greater than `0`.

Self-evaluation:
Day 2 is complete. I can now explain this flow: user clicks a button, the event listener runs, JavaScript changes the `count` state, and `updateCounter()` renders the new state back into the DOM.

Note:
The negative class exists in the code, but the current counter prevents going below `0`, so the negative state is mostly syntax practice unless the guard is removed later.

## Mini Project - Focus Task Tracker

Objective:
Build a small task app using DOM selection, events, state, element creation, arrays, objects, rendering, classes, and summary counts.

Practice files:
- `focus-task-tracker/index.html`
- `focus-task-tracker/style.css`
- `focus-task-tracker/script.js`

Concepts learned:
- Use an array to store many related items.
- Use an object to represent one task with `id`, `text`, and `completed`.
- Read input text using `.value`.
- Use `.trim()` so empty spaces do not count as real input.
- Use the `input` event to react while the user types.
- Disable the Add Task button when input is empty.
- Add new task objects into an array using `push()`.
- Render an array into the DOM by looping over it.
- Use `forEach()` to run code once for every task.
- Create multiple elements for each task: `li`, `span`, Complete button, Delete button.
- Use `appendChild()` to build each task item.
- Use `classList.add()` to visually mark completed tasks.
- Use `findIndex()` to find the position of the task that was clicked.
- Use `splice()` to remove one task from the array.
- Use `.hidden` to show or hide the empty-list message.
- Keep derived summary values: total, completed, and remaining.

Syntax practiced:

```js
const tasks = [];

function updateAddButton() {
  const value = taskInput.value.trim();
  addTaskButton.disabled = value === "";
}

taskInput.addEventListener("input", updateAddButton);

addTaskButton.addEventListener("click", () => {
  const inputText = taskInput.value.trim();

  if (inputText === "") {
    return;
  }

  const task = {
    id: Date.now(),
    text: inputText,
    completed: false
  };

  tasks.push(task);
  taskInput.value = "";
  updateAddButton();
  renderTasks();
});
```

Rendering syntax:

```js
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    const textSpan = document.createElement("span");
    const completeButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    textSpan.textContent = task.text;
    completeButton.textContent = task.completed ? "Undo" : "Mark Complete";
    deleteButton.textContent = "Delete";

    if (task.completed) {
      item.classList.add("completed");
    }

    item.appendChild(textSpan);
    item.appendChild(completeButton);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
  });
}
```

Find and remove syntax:

```js
const index = tasks.findIndex((item) => item.id === task.id);

if (index !== -1) {
  tasks.splice(index, 1);
}
```

What this means:
- `findIndex()` checks each item in the array until it finds the one with the matching `id`.
- `(item) => item.id === task.id` is an arrow function callback.
- `item` is the current array element being checked.
- `task.id` is the id of the task connected to the button that was clicked.
- `index !== -1` means "only continue if the task was actually found".
- `splice(index, 1)` means "start at this index and remove 1 item".

Definition of done:
- [x] Select all required DOM elements.
- [x] Store tasks in an array.
- [x] Disable Add Task when the input is empty.
- [x] Enable Add Task when the user types real text.
- [x] Create task objects with `id`, `text`, and `completed`.
- [x] Add task objects to the `tasks` array.
- [x] Render tasks using JavaScript-created elements.
- [x] Add Complete and Delete buttons for each task.
- [x] Toggle a task between complete and incomplete.
- [x] Delete only the selected task.
- [x] Update total, completed, and remaining counts.
- [x] Show an empty message when there are no tasks.
- [x] Hide the empty message when tasks exist.

Self-evaluation:
The Focus Task Tracker shows that I can now build a small interactive app, not just isolated exercises. The app connects input, state, rendering, event listeners, and derived summary values.

Cleanup notes:
- Rename `summery()` to `renderSummary()`.
- Prefer `const` and `let` instead of `var`.
- Remove accidental global variables.
- Separate the add-task logic into a `createTask()` function.
- Practice `findIndex()` and `splice()` until they feel natural.

## Day 3 - Arrays, Objects, and Rendering State

Objective:
Understand how an array of objects becomes visible UI, and practice the array methods that appeared in the Focus Task Tracker.

Practice files:
- `learning day 3/index.html`
- `learning day 3/style.css`
- `learning day 3/script.js`

Concepts to practice:
- Store multiple items in an array.
- Represent each item as an object with `id`, `name`, and `completed`.
- Use `forEach()` to render items into the DOM.
- Use `filter()` to show only matching items.
- Use `findIndex()` to locate one item that should be updated.
- Use `splice()` to remove one item from an array.
- Keep UI synced with data using render functions.

Definition of done:
- [ ] Select all needed DOM elements.
- [ ] Create an array of topic objects.
- [ ] Create a `renderSummary()` function.
- [ ] Create a `getVisibleTopics()` function using `filter()`.
- [ ] Create a `renderTopics()` function using `forEach()`.
- [ ] Use `findIndex()` to complete the first incomplete topic.
- [ ] Use `splice()` to remove the last topic.
- [ ] Connect all buttons with `addEventListener()`.
- [ ] Explain the flow: user click -> state changes -> render function updates the UI.

Self-evaluation:
Not started yet. This lesson is prepared as the next focused practice before building another full project.

## JavaScript Syntax I Have Learned So Far

DOM selection:

```js
const element = document.getElementById("some-id");
```

Create elements:

```js
const item = document.createElement("li");
const button = document.createElement("button");
```

Set text:

```js
element.textContent = "Some text";
element.textContent = count;
```

Add elements to the page:

```js
parent.appendChild(child);
```

Remove an element:

```js
element.remove();
```

Change attributes:

```js
element.setAttribute("class", "created-message");
```

Listen for events:

```js
button.addEventListener("click", () => {
  // code runs after click
});

input.addEventListener("input", updateFunction);
```

Change classes:

```js
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("completed");
```

Disable or enable buttons:

```js
button.disabled = true;
button.disabled = false;
button.disabled = count === 0;
```

Show or hide an element:

```js
emptyMessage.hidden = tasks.length > 0;
```

Read and clean input:

```js
const text = input.value.trim();
```

State variable:

```js
let count = 0;

count += 1;
count -= 1;
count = 0;
```

Function:

```js
function updateUI() {
  // update the page here
}
```

Conditionals:

```js
if (count > 0) {
  // positive state
} else if (count < 0) {
  // negative state
} else {
  // neutral state
}
```

Array:

```js
const tasks = [];
tasks.push(newTask);
```

Object:

```js
const task = {
  id: Date.now(),
  text: inputText,
  completed: false
};
```

Loop through an array:

```js
tasks.forEach((task) => {
  console.log(task.text);
});
```

Find an item index:

```js
const index = tasks.findIndex((item) => item.id === task.id);
```

Remove an item from an array:

```js
tasks.splice(index, 1);
```

## Mental Model Learned

For interactive frontend JavaScript, the pattern is:

1. Select the HTML elements JavaScript needs.
2. Store changing data in variables, arrays, or objects.
3. Listen for user events.
4. Change the state when an event happens.
5. Render the new state back into the DOM.

Short version:

```txt
User action -> event listener -> state change -> render UI
```

## Next Learning Targets

- Learn array methods more deeply: `forEach()`, `findIndex()`, `filter()`, `map()`, and `splice()`.
- Refactor Focus Task Tracker into clearer functions.
- Learn the difference between changing data directly and rendering the page from data.
- Add `localStorage` later so tasks stay after refresh.
- Start building toward React-style thinking: state first, UI rendered from state.
