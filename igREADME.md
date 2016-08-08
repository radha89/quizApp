# quizApp

This is a simple trivia game / quiz that I designed using HTML, CSS, JavaScript and jQuery Library. I finished this app as part of a final project for a 6-week online course at http://javascriptissexy.com/how-to-learn-javascript-properly/
The course may be updated recently. I finished this course in early 2013. 


# Key Concepts Demonstrated

•	Object Oriented Principles in JavaScript

•	Traversing through the DOM using jQuery & JavaScript

•	Using animations such as fadeIn and fadeout, setTimeOut, etc.

•	Regular Expressions for creation of new user accounts and strict requirement for password

•	HTML 5 Local Storage


# Design

There are different types of questions in this game such as:

•	Multiple choice – checkbox

•	Multiple choice – radio

•	Fill in the blank

•	Number – drop down list


The app starts off with login page that allows the user to login or create an account (in this case, user is directed to the register page). The login credentials are stored within and retrieved from local storage (see Desired Functionality).  Once logged in, the Start Quiz button appears and the user has 2 minutes to complete quiz on clicking the button. Once the time is up, the quiz disappears and a message is displayed to the screen “Oops your time is up!” 

Each question is displayed one at a time along with choices (if applicable). Once the user has chosen an answer, the user clicks “Enter Answer” button, which records the user’s answer. Once the answer has been entered, the user can click on the “Next Question” button, which fades out the previous question and fades in the new question. On top of each question there is a bar displayed that gives users some information about the question numbers. All the question numbers answered previously will be marked in either red or green whereas the unanswered ones are marked in black. Red question number shows that the user got that answer wrong and vice versa for green.  At the last question, the “Submit Quiz” button is clicked which leads to the final page displaying the score along with a customized message based on the score range. 

# Current Functionality

This object-oriented quiz app is designed dynamically so that it scalable to larger question sets or smaller question sets. All questions are stored in an array as objects. Each question object has the following properties:

•	Question – title of he question

•	Type – type of question (i.e. radio, checkbox or fill in the blank)

•	Choices 

•	Correct answer

•	User Answer – this is set to null for all questions by default

As each question is displayed one at a time, a counter variable is used to determine the question number. As each question is answered (by clicking the enter answer button), the user answer for that question is recorded by changing its value from null to the selected answer (within the array of objects). Once the user clicks on Next Question, the running score is updated. The running score is reflected on the bar above each question as colours of question numbers change to either red (wrong) or green (correct). 

Currently, the user’s login credentials are currently stored in and retrieved from the browser’s local storage (see Desired Functionality below). Validation checks are performed to ensure:

•	Correct format for username and passwords (using RegEx)

•	Unique username

•	All fields are required on registration page

After submitting the quiz, the final score is calculated and displayed on the screen. The final score is calculated by checking if the user answer matches the correct answer. Depending on the range the final score falls under, a customized message is displayed on the screen explaining the user’s score. 


# Desired Functionality

•	Use PHP and MySQL (as opposed to local storage) for User Registration / User Authentication

•	Improve on styles and formatting

•	Enable user to try again by clicking a button, if the timer runs out


# Bugs & Fixes

•	setTimeOut Function starting timer at login page instead of starting at click of start quiz button – fixed 08/06/2016.





