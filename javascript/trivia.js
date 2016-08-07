/**
 * Created by radhabhambwani on 2015-06-13.
 */

/* Some of these trivia questions were gathered from online source: http://www.triviacafe.com/animal-trivia-questions */

/**
 * load event calling an anonymous function to load all global variable and array of questions
 */


window.addEventListener("load", function() {

    //array of 10 question objects - type determines input type of question, userAnswer initialized as null for every question
    var allQuestions = [
        {
            question: "Which of the following is true about a cat's whiskers?",
            type: "mc", //represents multiple choice - radio buttons
            choices: ["Unlike fur, they don't shed at all", "Defend against predators", "They work as sensors", "They serve no purpose at all"],
            correctAnswer: 2,
            userAnswer: null
        },
        {
            question: "Which of these is/are mammal(s)?",
            type: "checkbox", //represent checkbox type answer
            choices: ["fish", "dolphin", "pigeon", "cow"],
            correctAnswer: [false, true, false, true], //multiple correct answers
            userAnswer: null
        },
        {
            question: "Those beautiful peacocks, distinguished by their crested head, brilliant plumage, and long spotted back feathers, are always males.",
            type: "mc",
            choices: ["True", "False"],
            correctAnswer: 0,
            userAnswer: null
        },
        {
            question: "Cows have sweat glands in what part of their bodies?",
            type: "mc",
            choices: ["Their legs", "Their noses", "Their stomachs", "Their udders"],
            correctAnswer: 1,
            userAnswer: null
        },
        {
            question: "What insect provides food for humans?",
            type: "sa", //represents short answer - text input
            correctAnswer: "honeybee",
            choices: null,
            userAnswer: null
        },
        {
            question: "How many arms does an octopus have?",
            type: "number", //represents question with number format
            choices: null,
            correctAnswer: 8,
            userAnswer: null
        },
        {
            question: "A 'joey' is the baby of what animal?",
            type: "sa",
            choices: null,
            correctAnswer: "kangaroo",
            userAnswer: null
        },
        {
            question: "Mosquitoes prefer to bite which of the following:",
            type: "mc",
            choices:["Women", "Men", "Both men and women equally"],
            correctAnswer: 0,
            userAnswer: null
        },
        {
            question: "What kind of snake can grow up to 20 feet in length and kill its prey by coiling around and suffocating?",
            type: "mc",
            choices: ["Rattlesnake", "Cornsnake", "Anaconda", "Python"],
            correctAnswer: 3,
            userAnswer: null
        },
        {
            question: "Which animal has the longest gestation period, (about 645 days almost 2 years)?",
            type: "sa",
            choices: null,
            correctAnswer: "elephant",
            userAnswer: null
        }
    ];

    /**
     * some variables initialized at load - will constantly be resued throughout the program
     *
     */
    //array length
    var len = allQuestions.length;

    //track number of current question
    var pos = 0;

    //track current score
    var score = 0;

    //total score will be shown at the end of the quiz
    var totalScore = 0;


    /**
     * grab elements to reuse
     */
    //will be used to update question
    var question = document.getElementById("ques");

    //will be used to update choices
    var choices = document.getElementById("choices");

    //will be used to update navigation buttons
    var navButton = document.getElementById("navbutton");

    //will be used to update page - make the quiz visible/hidden
    var quiz = document.getElementById("quiz");

    //used for register/login page - make container visible/invisible
    var container = document.getElementById("container");

    //start div that will appear after user had logged in or registered
    var start = document.getElementById("start");

    //startQuiz targetting the start Quiz button
    var startQuizBtn = document.getElementById("startQuiz");

    //grab elements for buttons
    var enterButton = document.getElementById("enter");
    var nextButton = document.getElementById("next");
    var submitButton = document.getElementById("submit");

    //registration page for new users
    var regPage = document.getElementById("regPage");

    //grab question bar to update it accordingly
    var bar = document.getElementsByClassName("bar");

    //question bar
    var questionBar = document.getElementById("questionBar");

    //timer msg
    var timerMsg = document.getElementById("timer");

    //quiz wrapper
    var wrapper = document.getElementById("wrapper");

    //try again div
    var tryAgain = document.getElementById("tryAgain");

    //restart btn
    var restart = document.getElementById("restart");



    //when user clicks "click to register", direct used to the registration page
    document.getElementById("clickToRegister").addEventListener("click", displayRegisterPage);

    /**
     * will make registration page appear for new users only
     *
     */
    function displayRegisterPage() {
        document.getElementById("login").style.display = "none";
        regPage.style.visibility = "visible";
    }


    //allow user to register when register button has been clicked
    document.getElementById("register").addEventListener("click", registerUser);


    /**
     * User registration process to validate all fields when user registers
     */
    function registerUser() {

        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var selectedUsername = document.getElementById("selUsername").value;
        var setPass = document.getElementById("setPw").value;
        var confirmPass = document.getElementById("confirmPw").value;
        var acceptedUn = /^[a-z][\w\.]{5,9}$/i;
        var acceptedPw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,14}$/;

        //ensure user enters all fields
        if (!firstName || !lastName || !selectedUsername || !setPass || !confirmPass) {
            alert("All fields are required");
        }

        // otherwise ensure user pass checks for all fields
        else {
            var existingUsername = localStorage.getItem('username');

            //check if username already exists in the system
            if (selectedUsername === existingUsername) {
                alert("This username is taken, please choose another");
                return;
            }

            //make sure password and confirm password fields match
            if (setPass !== confirmPass) {
                alert("Please ensure your passwords match");
                return;
            }

            //ensure username field matches all requirements
            var usernameResult = selectedUsername.match(acceptedUn);
            if (usernameResult === null) {
                alert("Please choose a username that is between 6 to 10 characters, starts with a letter and may include numbers, '_' and '.'");
                return;
            }

            //ensure password field match all requirements
            var passwordResult = setPass.match(acceptedPw) || confirmPass.match(acceptedPw);
            if (passwordResult === null) {
                alert("Your password must contain alphabets, numbers and special characters, and must be between 6 to 14 characters long");
                return;
            }

            //store username, firstname and password in the browser
            localStorage.username = selectedUsername;
            localStorage.firstname = firstName;
            localStorage.password = confirmPass;

            //clear register page and display start quiz page
            container.innerHTML = "";
            start.style.visibility = "visible";
        }
    }


    //for existing users - if user clicks login, start login process
    document.getElementById("loginButton").addEventListener("click", startLogin);


    /**
     * ensure user with the the right username and password has logged in
     */
    function startLogin() {
        var checkUser = localStorage.username;
        var username = document.getElementById("username").value;
        var checkPass = localStorage.password;
        var password = document.getElementById("password").value;

        if (username != checkUser || password != checkPass) {
            alert("Please re-renter your username and/or password");
        }


        //display start quiz if validation passed
        else {
            container.style.display = "none";
            restart.style.visibility = "hidden";
            start.style.visibility = "visible";

        }
    }


    /**
     * when quiz starts display a bar that tells the user what question they are on,
     * display quiz and show user the first question
     * enable navigation buttons
     *
     */
    function startQuiz() {
        start.style.visibility = "hidden";
        questionBar.style.display = "block";
        quiz.style.visibility = "visible";
        switchQuestion();
        navButton.style.visibility = "visible";
    }

    //start quiz when user clicks start button
    start.addEventListener("click", startQuiz);





    /**
     * set time out function to stop the user from proceeding with quiz after 2 minutes
     * 
     * @type {number}
     */
    function timeOutQuiz() {
        timer = setTimeout(function timeOut() {
            wrapper.style.display = "none";
            timerMsg.innerHTML = "Oops, your time is up!";
            restart.style.visibility = "visible";

        }, 120000);
    }





    //call time out on click
    startQuizBtn.addEventListener("click", timeOutQuiz);


    //restart.addEventListener("click", startLogin);
    /**
     * switch question by fading out previous question and choices
     * and fading in next question and choices
     */
    function switchQuestion() {
        $("#ques").fadeOut("fast", function () {
            $("#ques").empty();
            createQuestion();
        });

        $("p").fadeOut("fast", function () {
            $("p").empty();
            createChoices();
        });

    }

    /**
     * create questions and show the current question number
     */
    function createQuestion() {
        var currentQuestion = allQuestions[pos].question;
        $("#ques").fadeIn("fast", function () {
            question.innerHTML = currentQuestion;
        });

        bar[pos].innerHTML = pos + 1;
    }


    /**
     * Create input types for different type of questions
     */
    function createChoices() {

        //multiple choice
        if (allQuestions[pos].type === "mc") {
            for (var i = 0; i < allQuestions[pos].choices.length; i++) {
                var choice = document.getElementsByClassName("mcq")[i];
                var option = "<input id='ans" + i + "' type='radio' name='choice' value='" + i + "'";

                option += "/>" + allQuestions[pos].choices[i];

                choice.innerHTML = option;
                choice.style.display = "block";
            }

        }

        //checkbox
        else if (allQuestions[pos].type === "checkbox") {
            for (var i = 0; i < allQuestions[pos].choices.length; i++) {
                var choice = document.getElementsByClassName("checkboxes")[i];
                var option = "<input id='answer" + i + "' type='checkbox' name='check' value='" + i + "'";

                option += "/>" + allQuestions[pos].choices[i];

                choice.innerHTML = option;
                choice.style.display = "block";

            }

        }

        //short answer
        else if (allQuestions[pos].type === "sa") {

            var answer = document.getElementById("shortAnswer");
            var input = document.createElement("input");
            input.type = "text";
            input.id = "shortAns" + pos;
            input.value = "";
            input.size = 30;
            input.maxlength = 30;
            answer.appendChild(input);
            answer.style.display = "block";

        }

        //number
        else if (allQuestions[pos].type === "number") {
            var answer = document.getElementById("numberAnswer");
            var input = document.createElement("input");
            input.type = "number";
            input.id = "numberAns" + pos;
            input.value = "";
            input.min = 3;
            input.max = 10;
            answer.appendChild(input);
            answer.style.display = "block";
        }

    }


    /**
     * enable submit button and next button depending on the question number
     */
    function enableButtons() {
        if (pos === len - 1) {
            submitButton.disabled = false;
        }
        nextButton.disabled = false;
    }


    //when enter button is clicked, run recordUserAnswer()
    enterButton.addEventListener("click", recordUserAnswer);

    /**
     * store user's answers in the userAnswer array for each question type.
     */
    function recordUserAnswer() {

        //short answer
        if (allQuestions[pos].type === "sa") {
            var userShortAnswer = document.getElementById("shortAns" + pos).value;
            if (userShortAnswer != "") {
                allQuestions[pos].userAnswer = userShortAnswer;
                enableButtons();
            }
        }

        //multiple choice
        else if (allQuestions[pos].type === "mc") {
            var options = document.getElementsByName("choice");
            for (var i = 0; i < options.length; i++) {
                if (options[i].checked) {
                    allQuestions[pos].userAnswer = options[i].value;
                    enableButtons();
                }
            }
        }

        //checkbox
        else if (allQuestions[pos].type === "checkbox") {
            var options = document.getElementsByName("check");
            allQuestions[pos].userAnswer = new Array();

            for (var i = 0; i < options.length; i++) {
                if (options[i].checked == true) {
                    allQuestions[pos].userAnswer[i] = options[i].checked;
                    enableButtons();
                } else {
                    allQuestions[pos].userAnswer[i] = false;
                }
            }
        }

        //number
        else if (allQuestions[pos].type === "number") {
            var userNumberAnswer = document.getElementById("numberAns" + pos).value;
            if (userNumberAnswer != "") {
                allQuestions[pos].userAnswer = userNumberAnswer;
                enableButtons();
            }
        }

    }


    /**
     * update score after every question
     */
    function calcScore() {


        //if short answer type question..
        if (allQuestions[pos].type === "sa") {
            if ((allQuestions[pos].userAnswer).toLowerCase() === allQuestions[pos].correctAnswer) {
                bar[pos].style.color = "green";
                score++;
            }
            else {
                bar[pos].style.color = "red";
            }
        }

        //otherwise if multiple choice type questions
        else if (allQuestions[pos].type === "mc") {
            if (allQuestions[pos].userAnswer == allQuestions[pos].correctAnswer) {
                bar[pos].style.color = "green";
                score++;
            }
            else {
                bar[pos].style.color = "red";
            }
        }

        //if checkbox type question
        //Note: each checkbox (true) answer is worth 0.5, any answer marked as false in the correct Answer array are worth 0
        else if (allQuestions[pos].type === "checkbox") {

            //count variable keeps track of score just for the checkbox type questions
            var count = 0;
            for (var i = 0; i < allQuestions[pos].userAnswer.length; i++) {
                if(allQuestions[pos].correctAnswer[i] == true && allQuestions[pos].correctAnswer[i] == allQuestions[pos].userAnswer[i]) {
                    count+=0.5;
                }

                else if(allQuestions[pos].correctAnswer[i] == false && allQuestions[pos].correctAnswer[i] != allQuestions[pos].userAnswer[i]) {
                    bar[pos].style.color = "red";
                    count-=0.5;
                }
            }

            //ensure that count does not go negative - as minimum score will be zero
            if(count != -0.5) {
                if(count == 0) {
                    bar[pos].style.color = "red";
                }
                //for partly correct answer, highlight question number in yellow
                else if(count == 0.5) {
                    bar[pos].style.color = "yellow";
                }
                else if(count == 1) {
                    bar[pos].style.color = "green";
                }

                //update score with count variable
                score += count;
            }
        }


        //if question is of number format type
        else if(allQuestions[pos].type === "number") {
            if(allQuestions[pos].userAnswer == allQuestions[pos].correctAnswer) {
                bar[pos].style.color = "green";
                score++;
            }
            else {
                bar[pos].style.color = "red";
            }
        }

        //store score in totalScore
        totalScore = score;
    }

    /**
     * update question and buttons
     */
    function updatePage() {

        if (pos < len) {
            switchQuestion();
        }
        if (pos === len - 1) {
            nextButton.style.display = "none";
            submitButton.style.visibility = "visible";
            submitButton.disabled = true;
        }
    }

    //submit quiz when user clicks on submit button
    submitButton.addEventListener("click", submitQuiz);


    /**
     * disable timer if quiz has been submitted
     * remove all quiz elements
     * calculate score and display to total score to the screen
     */
    function submitQuiz() {
        clearTimeout(timer);
        while (quiz.hasChildNodes()) {
            quiz.removeChild(quiz.lastChild);
        }
        calcScore();
        submitButton.style.visibility = "hidden";
        navButton.innerHTML = "Your total score: " + totalScore;
        showScoreDescription();
    }

    //update when user clicks next question
    nextButton.addEventListener("click", updateNext);

    /**
     * update score, question number and enable/disable certain buttons
     */
    function updateNext() {
        calcScore();
        nextButton.disabled = true;
        pos++;
        updatePage();
        enterButton.disabled = false;
    }


    /**
     * show different messages and color schemes for different score ranges
     */
    function showScoreDescription() {
        var lastPage = document.getElementById("lastPage");
        var showDesc = document.getElementById("scoreDescription");
        showDesc.style.color = "white";

        if(score >= 0 && score <= 4) {
            showDesc.innerHTML = "You suck!";
            lastPage.style.backgroundColor = "red";
        }
        else if(score >= 5 && score <= 7) {
            showDesc.innerHTML = "You could have done a lot better!";
            lastPage.style.backgroundColor = "yellow";
        }
        else {
            showDesc.innerHTML = "You're a genius!";
            lastPage.style.backgroundColor = "green";
        }

    }

});





