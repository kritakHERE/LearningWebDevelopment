/*
  JavaScript Learning Day 3

  Main goal:
  Understand how arrays and objects become UI.

  Today connects directly to the Focus Task Tracker. Before adding bigger
  features, practice the data methods that made that project feel confusing:
  forEach(), findIndex(), splice(), and filter().

  Mental model:
  Data array -> render function -> visible HTML
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
  - totalCount
  - completedCount
  - remainingCount
  - filterLabel
  - emptyMessage
  - topicList
  - renderButton
  - completeFirstButton
  - removeLastButton
  - showAllButton
  - showCompletedButton
  - showRemainingButton

  Evaluation criteria:
  - Your code uses document.getElementById().
  - Each variable selects the matching element from index.html.
*/

// Work section for Exercise 1:

const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const remainingCount = document.getElementById("remaining-count");
const filterLabel = document.getElementById("filter-label");
const emptyMessage = document.getElementById("empty-message");
const topicList = document.getElementById("topic-list");
const renderButton = document.getElementById("render-button");
const completeFirstButton = document.getElementById("complete-first-button");
const removeLastButton = document.getElementById("remove-last-button");
const showAllButton = document.getElementById("show-all-button");
const showCompletedButton = document.getElementById("show-completed-button");
const showRemainingButton = document.getElementById("show-remaining-button");



/*
  Exercise 2: Create an array of objects

  Goal:
  Store multiple learning topics in JavaScript data.

  Syntax to use:
  const items = [
    { id: 1, name: "Example", completed: false },
    { id: 2, name: "Example 2", completed: true }
  ];
  // Use an array when you need many items.
  // Use objects when each item has multiple properties.

  Question:
  Create a variable named topics.
  It should be an array with at least 5 topic objects.
  Each object should have:
  - id
  - name
  - completed

  Suggested topic names:
  - DOM selection
  - Event listeners
  - Arrays
  - Objects
  - Rendering from state

  Evaluation criteria:
  - topics is an array.
  - Each topic is an object.
  - Each topic has id, name, and completed.
*/

// Work section for Exercise 2:

const items = [
  { id: 1, name: "DOM slection", completed: false },
  { id: 2, name: "Event listeners", completed: true },
  { id: 3, name: "Arrays", completed: true},
  { id: 4, name: "Objects", completed: false },
  { id: 5, name: "Rendering from state", completed: false },
];


/*
  Exercise 3: Create filter state

  Goal:
  Store which topics should currently be visible.

  Syntax to use:
  let currentFilter = "all";
  // Use let because this value will change when the user clicks filter buttons.

  Question:
  Create a variable named currentFilter and set it to "all".

  Evaluation criteria:
  - The variable uses let.
  - The starting value is "all".
*/

// Work section for Exercise 3:

let currentFilter = "all"; // other filter being: completed and remaining


/*
  Exercise 4: Render the summary

  Goal:
  Update total, completed, and remaining counts from the topics array.

  Syntax to use:
  const total = items.length;

  let done = 0;
  items.forEach((item) => {
    if (item.completed) {
      done += 1;
    }
  });

  element.textContent = total;
  // Use forEach() to count completed items.
  // Use textContent to show the numbers on the page.

  Question:
  Create a function named renderSummary.
  It should update:
  - totalCount
  - completedCount
  - remainingCount

  Evaluation criteria:
  - The total count matches topics.length.
  - Completed count matches topics where completed is true.
  - Remaining count is total minus completed.
*/

// Work section for Exercise 4:
let total = 0;

let remaining =0;
function renderSummery(){
  total = items.length;
  let completed = 0;
  items.forEach((item) =>{
    if (item.completed === true){
      completed += 1;
    }
  });
  remaining = total - completed;

  totalCount.textContent = total;
  completedCount.textContent = completed;
  remainingCount.textContent = remaining;
}


/*
  Exercise 5: Get visible topics

  Goal:
  Return a filtered version of the topics array.

  Syntax to use:
  const results = items.filter((item) => item.completed === true);
  // filter() creates a new array containing only matching items.

  Question:
  Create a function named getVisibleTopics.
  It should:
  - return all topics when currentFilter is "all"
  - return only completed topics when currentFilter is "completed"
  - return only incomplete topics when currentFilter is "remaining"

  Evaluation criteria:
  - The function returns an array.
  - The returned array changes based on currentFilter.
  - The original topics array is not destroyed.
*/

// Work section for Exercise 5:

function getVisibleTopics(){
  let result = [];
  if (currentFilter === "all"){
    result = items;
  }
  else if (currentFilter === "completed"){
    result = items.filter((item) => item.completed === true);
  }
  else{
    result = items.filter((item) => item.completed === false);
  }
  return result;
}


/*
  Exercise 6: Render topics

  Goal:
  Display the visible topics on the page.

  Syntax to use:
  parent.innerHTML = "";

  items.forEach((item) => {
    const listItem = document.createElement("li");
    const name = document.createElement("span");

    name.textContent = item.name;
    listItem.appendChild(name);
    parent.appendChild(listItem);
  });
  // Clear old HTML first, then rebuild the list from data.

  Question:
  Create a function named renderTopics.
  It should:
  - clear topicList
  - call getVisibleTopics()
  - create one li for every visible topic
  - create a span for the topic name
  - create a span for the status text
  - add the completed class when topic.completed is true
  - update emptyMessage.hidden
  - call renderSummary()

  Evaluation criteria:
  - The list is built with createElement().
  - Text is added with textContent.
  - Elements are placed with appendChild().
  - The empty message only shows when no visible topics exist.
*/

// Work section for Exercise 6:

function renderTopics(){
  topicList.innerHTML = "";
  const displayTopicList = getVisibleTopics();
  displayTopicList.forEach((item) => {
    const topic = document.createElement("li");
    const topicName = document.createElement("span");
    const topicStatus = document.createElement("span");

    topic.classList.add("topic-item");
    topicName.classList.add("topic-name");
    topicStatus.classList.add("topic-status");

    topicName.textContent = item.name;

    if(item.completed){
      topic.classList.add('completed');
      topicStatus.textContent = "Completed"
    }
    else {
      topicStatus.textContent = "Remaining";
    }

    topic.appendChild(topicName);
    topic.appendChild(topicStatus);
    topicList.appendChild(topic);


  });

  emptyMessage.hidden = displayTopicList.length > 0;
  renderSummery();
}


/*
  Exercise 7: Complete the first incomplete topic

  Goal:
  Use findIndex() to locate one object, then update it.

  Syntax to use:
  const index = items.findIndex((item) => item.completed === false);

  if (index !== -1) {
    items[index].completed = true;
  }
  // findIndex() returns the position of the first matching item.
  // -1 means nothing was found.

  Question:
  Create a function named completeFirstIncomplete.
  It should:
  - find the first topic where completed is false
  - change that topic's completed value to true
  - call renderTopics()

  Evaluation criteria:
  - Only one incomplete topic changes per click.
  - Nothing breaks when all topics are already complete.
*/

// Work section for Exercise 7:

function completeFirstIncomplete(){
  const index = items.findIndex((item)=> item.completed === false);
  if (index !== -1){
    items[index].completed = true;
  }
  renderTopics();
}


/*
  Exercise 8: Remove the last topic

  Goal:
  Use splice() to remove one item from an array.

  Syntax to use:
  const index = items.length - 1;
  items.splice(index, 1);
  // splice(startIndex, deleteCount) changes the original array.

  Question:
  Create a function named removeLastTopic.
  It should:
  - stop early if topics is empty
  - remove the last topic from the topics array
  - call renderTopics()

  Evaluation criteria:
  - One topic disappears per click.
  - The summary numbers update.
  - The empty message appears when nothing is left to show.
*/

// Work section for Exercise 8:

function removeLastTopic(){
  const index = items.length - 1;
  if (index !== -1){
    items.splice(index, 1);
  }

  renderTopics();
}


/*
  Exercise 9: Connect the buttons

  Goal:
  Use event listeners to connect user actions to your functions.

  Syntax to use:
  button.addEventListener("click", functionName);

  button.addEventListener("click", () => {
    someVariable = "new value";
    someFunction();
  });
  // Use the first pattern when you already have a function.
  // Use the second pattern when you need to change state before rendering.

  Question:
  Add click event listeners:
  - renderButton should call renderTopics
  - completeFirstButton should call completeFirstIncomplete
  - removeLastButton should call removeLastTopic
  - showAllButton should set currentFilter to "all" and render
  - showCompletedButton should set currentFilter to "completed" and render
  - showRemainingButton should set currentFilter to "remaining" and render

  Evaluation criteria:
  - All buttons use addEventListener().
  - Filter buttons change the visible list.
  - Action buttons change the topics array.
*/

// Work section for Exercise 9:

renderButton.addEventListener('click', renderTopics);
completeFirstButton.addEventListener('click', completeFirstIncomplete);
removeLastButton.addEventListener('click', removeLastTopic);
showAllButton.addEventListener('click', ()=>{
  currentFilter = 'all';
  renderTopics();
});
showCompletedButton.addEventListener('click', ()=>{
  currentFilter = 'completed';
  renderTopics();
});
showRemainingButton.addEventListener('click', ()=>{
  currentFilter = 'remaining';
  renderTopics();
});

/*
  Final definition of done:
  - You selected all needed DOM elements.
  - You created an array of topic objects.
  - You used a renderSummary function to update counts.
  - You used filter() to choose visible topics.
  - You used forEach() to render topics.
  - You used findIndex() to find one incomplete topic.
  - You used splice() to remove one topic.
  - You used addEventListener() for all buttons.
  - You can explain this flow:
    user click -> state changes -> renderTopics() rebuilds the UI.
*/
