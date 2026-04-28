/*
  JavaScript Learning Day 1

  Main goal:
  Learn how JavaScript can create, fill, place, remove, and change HTML tags
  while the page is running in the browser.

  Important words:
  - Element/tag: an HTML item, such as h1, div, button, p, img, or li.
  - Attribute: extra information on a tag, such as id, class, src, href, or type.
  - DOM: the browser's live version of your HTML page.
*/


/*
  Exercise 1: Select an existing element

  Goal:
  Select the div tag from the page so JavaScript can work with it.

  Syntax to use:
  const practiceArea = document.getElementById("practice-area");

  Question:
  Create a variable named practiceArea and store the element with the id
  "practice-area" inside it.

  Evaluation criteria:
  - Your code uses document.getElementById().
  - Your code selects the div tag, not the button or h1.
*/

// Work section for Exercise 1:

const practiceArea = document.getElementById("practice-area");



/*
  Exercise 2: Create a new element

  Goal:
  Create a new HTML tag using JavaScript.

  Syntax to use:
  const newParagraph = document.createElement("p");

  Question:
  Create a new paragraph element and store it in a variable.

  Evaluation criteria:
  - Your code uses document.createElement().
  - Your new element is a p tag.
*/

// Work section for Exercise 2:

const newParagraph = document.createElement("p");



/*
  Exercise 3: Fill the new element with data

  Goal:
  Add text into the new paragraph so it is not empty.

  Syntax to use:
  newParagraph.textContent = "I was created using JavaScript.";

  Question:
  Put your own sentence inside the paragraph using textContent.

  Evaluation criteria:
  - Your code uses textContent.
  - Your paragraph has readable text inside it.
*/

// Work section for Exercise 3:

newParagraph.textContent = "I love You, Hehehehe!";



/*
  Exercise 4: Put the new element on the live site

  Goal:
  Add the paragraph into the div tag so it appears in the browser.

  Syntax to use:
  practiceArea.appendChild(newParagraph);

  Question:
  Place your new paragraph inside the practiceArea element.

  Evaluation criteria:
  - Your code uses appendChild().
  - The paragraph becomes visible inside the main area.
*/

// Work section for Exercise 4:

// innitially wrote: newParagraph.appendChild(practiceArea);
// corrected but need explanation inside chat
practiceArea.appendChild(newParagraph);


/*
  Exercise 5: Change an element's attribute

  Goal:
  Add or change an attribute on your paragraph.

  Syntax to use:
  newParagraph.setAttribute("class", "created-message");

  Question:
  Give your paragraph a class attribute named created-message.

  Evaluation criteria:
  - Your code uses setAttribute().
  - The paragraph has a class attribute after the code runs.
*/

// Work section for Exercise 5:

newParagraph.setAttribute("class", "created-message");



/*
  Exercise 6: Remove an element

  Goal:
  Remove an element from the live page using JavaScript.

  Syntax to use:
  newParagraph.remove();

  Question:
  Remove the paragraph from the page after you have added it.
  You can test this directly, or put the remove code inside a button click later.

  Evaluation criteria:
  - Your code uses .remove().
  - The selected element disappears from the page.
*/

// Work section for Exercise 6:

const mybtn = document.getElementById('action-button');

// dont understand why this failed:
mybtn.onclick = () => {
  newParagraph.remove();
};





/*
  Final definition of done:
  - You created one new element using document.createElement().
  - You added text or data to that element.
  - You placed it inside the div tag on the page.
  - You removed one element from the page.
  - You changed at least one attribute using setAttribute().
  - You can explain each step in your own words.

  Self-evaluation:
  After writing your code, explain what happened in learning progress.md.
*/
