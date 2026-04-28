/*
  JavaScript Learning Day 2

  Main goal:
  Learn how JavaScript responds to user actions and updates existing page
  content while the page is running.

  Important words:
  - Event: something that happens on the page, such as a click or key press.
  - Event listener: code that waits for an event and then runs a function.
  - State: data JavaScript remembers while the page is running.
  - classList: a DOM tool for adding, removing, and toggling CSS classes.
*/


/*
  Exercise 1: Select existing elements

  Goal:
  Select the counter display and all three buttons.

  Syntax to use:
  const counterDisplay = document.getElementById("counter-display");

  Question:
  Create variables for:
  - counterDisplay
  - decreaseButton
  - resetButton
  - increaseButton

  Evaluation criteria:
  - Your code uses document.getElementById().
  - Each variable selects the correct element from index.html.
*/

// Work section for Exercise 1:
const counterDisplay = document.getElementById('counter-display');
const resetButton = document.getElementById('reset-button');
const decreaseButton = document.getElementById('decrease-button');
const increaseButton = document.getElementById('increase-button');



/*
  Exercise 2: Create state

  Goal:
  Store the counter number in JavaScript.

  Syntax to use:
  let count = 0;

  Question:
  Create a variable named count and set it to 0.

  Evaluation criteria:
  - Your code uses let because the number will change.
  - The starting value is 0.
*/

// Work section for Exercise 2:
let count = 0;
decreaseButton.disabled = count === 0;



/*
  Exercise 3: Display the current count

  Goal:
  Write one function that updates the counter text on the page.

  Syntax to use:
  counterDisplay.textContent = count;

  Question:
  Create a function named updateCounter.
  Inside it, show the current count in counterDisplay.

  Evaluation criteria:
  - Your code creates a function named updateCounter.
  - The function updates textContent.
*/

// Work section for Exercise 3:
// function updateCounter(){
//   counterDisplay.textContent = count;
// }
// updating counter value below, 




/*
  Exercise 4: Increase the counter

  Goal:
  Make the Increase button add 1 to the counter.

  Syntax to use:
  increaseButton.addEventListener("click", () => {
    count = count + 1;
    updateCounter();
  });

  Question:
  Add a click event listener to the Increase button.

  Evaluation criteria:
  - Your code uses addEventListener().
  - Clicking Increase changes the number on the page.
*/

// Work section for Exercise 4:

increaseButton.addEventListener('click', () => {
  count += 1;
  updateCounter();
});




/*
  Exercise 5: Decrease the counter

  Goal:
  Make the Decrease button subtract 1 from the counter.

  Syntax to use:
  count = count - 1;

  Question:
  Add a click event listener to the Decrease button.

  Evaluation criteria:
  - Your code uses addEventListener().
  - Clicking Decrease changes the number on the page.
*/

// Work section for Exercise 5:

decreaseButton.addEventListener('click', ()=> {
  if(count > 0){
  count -= 1;
  updateCounter();
  }
});




/*
  Exercise 6: Reset the counter

  Goal:
  Make the Reset button change the counter back to 0.

  Syntax to use:
  count = 0;

  Question:
  Add a click event listener to the Reset button.

  Evaluation criteria:
  - Your code uses addEventListener().
  - Clicking Reset shows 0 on the page.
*/

// Work section for Exercise 6:
resetButton.addEventListener('click', ()=>{
  count = 0;
  updateCounter();
});




/*
  Exercise 7: Change color using classList

  Goal:
  Change the counter color based on whether the number is positive, negative,
  or neutral.

  Syntax to use:
  counterDisplay.classList.add("positive");
  counterDisplay.classList.remove("negative");

  Question:
  Update your updateCounter function.
  - If count is greater than 0, add positive and remove negative/neutral.
  - If count is less than 0, add negative and remove positive/neutral.
  - If count is 0, add neutral and remove positive/negative.

  Evaluation criteria:
  - Your code uses classList.add().
  - Your code uses classList.remove().
  - The counter color changes correctly.
*/

// Work section for Exercise 7:

function updateCounter(){
  counterDisplay.textContent = count;
  if (count<0){
    counterDisplay.classList.add('negative');
    counterDisplay.classList.remove('positive','neutral');
  }
  else if (count>0){
    counterDisplay.classList.add('positive');
    counterDisplay.classList.remove('negative','neutral');
  }
  else {
    counterDisplay.classList.add('neutral');
    counterDisplay.classList.remove('positive','negative');
  }
  decreaseButton.disabled = count === 0;
};




/*
  Exercise 8: Disable the Decrease button at 0

  Goal:
  Prevent the counter from going below 0.

  Syntax to use:
  decreaseButton.disabled = count === 0;

  Question:
  Update your code so the Decrease button is disabled when count is 0.
  The button should become enabled again when count is greater than 0.

  Evaluation criteria:
  - The Decrease button starts disabled.
  - Increase enables the Decrease button.
  - Reset disables the Decrease button again.
*/

// Work section for Exercise 8:








/*
  Final definition of done:
  - You selected all needed elements.
  - You created a count variable.
  - You wrote one updateCounter function.
  - You used addEventListener for all three buttons.
  - You changed textContent when the count changes.
  - You used classList to change the visual state.
  - You used disabled to prevent invalid actions.
  - You can explain how user action changes state, and state changes UI.
*/
