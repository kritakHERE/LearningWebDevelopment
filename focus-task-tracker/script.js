/*
  Focus Task Tracker

  Goal:
  Build a mini task app using DOM selection, events, state, element creation,
  classList, textContent, appendChild, and remove.
*/


/*
  Exercise 1: Select existing elements

  Goal:
  Select every HTML element that JavaScript must control.

  Syntax to use:
  const element = document.getElementById("some-id");
  // Use this to select one existing element by its id.

  Question:
  Create variables for:
  - taskInput
  - addTaskButton
  - taskList
  - emptyMessage
  - totalCount
  - completedCount
  - remainingCount

  Evaluation criteria:
  - Your code uses document.getElementById().
  - Each variable selects the correct element from index.html.
*/

// Work section for Exercise 1:
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
const emptyMessage = document.getElementById('empty-message');
const totalCount = document.getElementById('total-count');
const completedCount = document.getElementById('completed-count');
const remainingCount = document.getElementById('remaining-count');



/*
  Exercise 2: Create task state

  Goal:
  Store the tasks in JavaScript.

  Syntax to use:
  const tasks = [];
  // Use an array when you need to store multiple related items.

  Question:
  Create a variable named tasks and set it to an empty array.

  Evaluation criteria:
  - Your code creates an array.
  - The array starts empty.
*/

// Work section for Exercise 2:

const tasks = [];


/*
  Exercise 3: Update the Add Task button

  Goal:
  Disable the button when the input is empty.

  Syntax to use:
  const value = element.value.trim();
  button.disabled = value === "";

  Question:
  Create a function named updateAddButton.
  It should disable addTaskButton when taskInput is empty or spaces-only.

  Evaluation criteria:
  - Empty input disables the button.
  - Spaces-only input disables the button.
  - Real text enables the button.
*/

// Work section for Exercise 3:

function updateAddButton() {
  const value = taskInput.value.trim();
  addTaskButton.disabled = value === "";
}


/*
  Exercise 4: Listen for typing

  Goal:
  Run updateAddButton whenever the user types.

  Syntax to use:
  element.addEventListener("input", functionName);
  // The input event runs when the user changes text in an input field.

  Question:
  Add an input event listener to taskInput.

  Evaluation criteria:
  - Typing in the input updates the disabled state of the button.
*/

// Work section for Exercise 4:

taskInput.addEventListener('input', updateAddButton);


/*
  Exercise 5: Create one task object

  Goal:
  Convert the input text into data JavaScript can remember.

  Syntax to use:
  const item = {
    id: Date.now(),
    text: someText,
    completed: false
  };

  Question:
  Create a function named createTask.
  It should:
  - read taskInput.value
  - trim the text
  - stop early if the text is empty
  - create a task object with id, text, and completed
  - add that object to tasks

  Evaluation criteria:
  - Empty tasks are not added.
  - Valid tasks become objects.
  - New task objects are stored in the tasks array.
*/

// Work section for Exercise 5:

addTaskButton.addEventListener('click', () =>{
  const inputText = taskInput.value.trim();
  
  const item = {
    id: Date.now(),
    text: inputText,
    completed: false
  };
  if (inputText != ""){
    tasks.push(item);
    renderTasks();
  }
  taskInput.value = "";
  updateAddButton();
  
});



/*
  Exercise 6: Render the task list

  Goal:
  Display the tasks array on the page.

  Syntax to use:
  const item = document.createElement("li");
  item.textContent = someText;
  parent.appendChild(item);

  Question:
  Create a function named renderTasks.
  For each task, create:
  - an li element
  - a span for task text
  - a Complete button
  - a Delete button

  Evaluation criteria:
  - The list is built with document.createElement().
  - Task text uses textContent.
  - New elements are placed with appendChild().
*/

// Work section for Exercise 6:

function renderTasks(){
  taskList.innerHTML = "";
  tasks.forEach((task)=> {
    const item = document.createElement('li');
    const textSpan = document.createElement('span');
    const completedButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    item.classList.add("task-item");
    textSpan.classList.add("task-text");
    deleteButton.classList.add("delete-button");


    textSpan.textContent = task.text;
    deleteButton.textContent = "Delete";
    if (task.completed){
      completedButton.textContent = "Undo";
      item.classList.add("completed");
    }
    else {
      completedButton.textContent = "Mark Complete";
    }


    item.appendChild(textSpan);
    item.appendChild(completedButton);
    item.appendChild(deleteButton);

    taskList.appendChild(item);

    completedButton.addEventListener('click', () =>{
      const index = tasks.findIndex((item) => item.id === task.id);
      tasks[index].completed = !task.completed;
      renderTasks();

    });

    deleteButton.addEventListener('click', ()=>{
      const index = tasks.findIndex((item) => item.id === task.id); //need explanation of this, idk what this is, i just wrote it from ai, explain why each word are in the plance they are in.
      if (index !== -1) {
        tasks.splice(index, 1);
      } //also explain what this splice is i feel it shifts things, so i must first learn some array manipulation or what?
      renderTasks();
      
    });
  });
  renderSummary();
  emptyMessage.hidden = tasks.length > 0;
}


/*
  Exercise 7: Add complete and delete behavior

  Goal:
  Make each task interactive.

  Syntax to use:
  button.addEventListener("click", () => {
    // change data or remove data here
  });

  element.classList.add("class-name");
  element.classList.remove("class-name");

  Question:
  Inside renderTasks:
  - the Complete button should toggle task.completed
  - the Delete button should remove that task from tasks
  - completed tasks should use the completed class

  Evaluation criteria:
  - Complete changes the visual style.
  - Clicking Complete again returns the task to normal.
  - Delete removes only the selected task.
*/

// Work section for Exercise 7:




/*
  Exercise 8: Render the summary

  Goal:
  Keep total, completed, and remaining counts accurate.

  Syntax to use:
  element.textContent = number;

  Question:
  Create a function named renderSummary.
  It should update:
  - totalCount
  - completedCount
  - remainingCount

  Evaluation criteria:
  - Adding a task updates total and remaining.
  - Completing a task updates completed and remaining.
  - Deleting a task updates all summary numbers.
*/

// Work section for Exercise 8:
let totalTaskCount = 0;
let completedTaskCount = 0;
let remainingTaskCount = 0;

function renderSummary(){
  totalTaskCount = 0;
  completedTaskCount = 0;
  remainingTaskCount = 0;
  let totalTaskCount = tasks.length;
  completedTask = 0;
  tasks.forEach((task)=>{
    if (task.completed){
      completedTaskCount += 1;
    }
  });
  remainingTaskCount = totalTaskCount - completedTaskCount;

  completedCount.textContent = completedTaskCount;
  totalCount.textContent = totalTaskCount;
  remainingCount.textContent = remainingTaskCount;


}


/*
  Exercise 9: Connect the Add Task button

  Goal:
  Make the Add Task button create a task and refresh the UI.

  Syntax to use:
  button.addEventListener("click", functionName);

  Question:
  Add a click event listener to addTaskButton.
  After adding a task:
  - clear the input
  - disable the button again
  - render the tasks
  - render the summary

  Evaluation criteria:
  - Clicking Add Task creates a visible task.
  - The input clears.
  - The summary updates.
*/

// Work section for Exercise 9:




/*
  Exercise 10: Empty list message

  Goal:
  Show helpful UI when there are no tasks.

  Syntax to use:
  element.hidden = true;
  element.hidden = false;

  Question:
  Update renderTasks so emptyMessage is visible only when there are no tasks.

  Evaluation criteria:
  - "No tasks yet." shows when the list is empty.
  - The message disappears when at least one task exists.
*/

// Work section for Exercise 10:




/*
  Final definition of done:
  - The page has a clear title and task input.
  - The user can type a task name.
  - The Add Task button starts disabled when the input is empty.
  - Typing text enables the Add Task button.
  - Clicking Add Task creates a new task item on the page.
  - Each task item is created with JavaScript using document.createElement().
  - Each task is added to the list using appendChild().
  - Each task shows its own Complete button.
  - Each task shows its own Delete button.
  - Clicking Complete toggles a completed CSS class.
  - Clicking Complete again returns the task to incomplete.
  - Clicking Delete removes only that task.
  - The app shows total, completed, and remaining task counts.
  - The summary updates after adding, completing, uncompleting, or deleting a task.
  - Empty or spaces-only tasks cannot be added.
  - After adding a task, the input clears.
  - After adding a task, the Add Task button becomes disabled again.
  - All button clicks use addEventListener().
  - You can explain how user action changes state, and state updates the UI.
*/
