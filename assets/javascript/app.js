$(document).ready(function () {

    //initialize variables
    var questionNumb = 0;
    var time = 20;
    var wins = 0;
    var losses = 0;

    //array of questions and answers
    var questions = [
        {
            question: "In Standard, what is each player's starting life total?",
            options: ["10", "20", "30", "40"],
            answer: "20",
            image: "<img src='assets/images/d20.JPG'>"
        },
        {
            question: "Which of the following is NOT a color faction in Magic?",
            options: ["Green", "Black", "Red", "Yellow"],
            answer: "Yellow",
            image: "<img src='assets/images/colors.JPG'>"
        },
        {
            question: "What is a punt?",
            options: ["A concession of a match based solely on the opening hand.", "Flipping the table and all cards onto the floor in anger.", "Losing to a single-turn knockout.", "A loss resulting directly from player error"],
            answer: "A loss resulting directly from player error",
            image: "<img src='assets/images/punt.JPG'>"
        },
        {
            question: "When did Magic: the Gathering release its first set?",
            options: ["1993", "1997", "2001", "2011"],
            answer: "1993",
            image: "<img src='assets/images/1993.png'>"
        },
        {
            question: "Which of the below is the faction that combines White and Black mana?",
            options: ["Azorious", "Orzhov", "Jeskai", "Rakdos"],
            answer: "Orzhov",
            image: "<img src='assets/images/orzhov.JPG'>"
        },
        //THIS QUESTION ISN'T WORKING FOR SOME REASON
        {
            question: "How much damage does Lightning Bolt do?",
            options: ["1", "3", "5", "It depends on the target"],
            answer: "3",
            image: "<img src='assets/images/bolt.png'>"
        },
        {
            question: "Which of the below is the highest converted mana cost?",
            options: ["(10)(G)(G)", "(X)(U)(G)", "(W)(U)(B)(R)(G)", "(G)(G)(G)(G)(G)(G)(G)(G)"],
            answer: "(10)(G)(G)",
            image: "<img src='assets/images/ghalta.JPG'>"
        },
        {
            question: "What is the most expensive Magic card in terms of US Dollars?",
            options: ["Jace, the Mindsculptor", "Emrakul, the Aeons Torn", "Black Lotus", "Nicol Bolas, the Ravager"],
            answer: "Black Lotus",
            image: "<img src='assets/images/lotus.png'>"
        },
        {
            question: "Which of the below is NOT a Magic: the Gathering rule set?",
            options: ["Modern", "Legacy", "Limited", "Unrestricted"],
            answer: "Unrestricted",
            image: "<img src='assets/images/formats.png'>"
        },
        {
            question: "What does FNM stand for?",
            options: ["Friday Night Magic", "Frontier's New Magic", "Forfeit No Match", "Forge Nemesis Magic"],
            answer: "Friday Night Magic",
            image: "<img src='assets/images/fnm.JPG'>"
        }
    ];

    //start game

    $("#start").on("click", function () {
        $("#game").html("<p class='timer'>Time remaining: <span  id='timer'>" + time + "</span></p>");
        questionGen();
        userTime();
        timer();
    });



    //generate question and answers on page
    function questionGen() {
        $("#game").append("<p class='question'>" + questions[questionNumb].question + "</p>" +
            "<p class='options'>" + questions[questionNumb].options[0] + "</p>" +
            "<p class='options'>" + questions[questionNumb].options[1] + "</p>" +
            "<p class='options'>" + questions[questionNumb].options[2] + "</p>" +
            "<p class='options'>" + questions[questionNumb].options[3] + "</p>");
    };



    //timer function
    function timer() {
        clock = setInterval(countDown, 1000);
        function countDown() {
            if (time < 1) {
                clearInterval(clock);
                userTime();
            }
            else if (time > 0) {
                time--;
            }
            $("#timer").html(time);
        }
    }

    //checks user guesses
    $("#game").on("click", ".options", (function () {
        var userGuess = $(this).text();
        if (userGuess === questions[questionNumb].answer) {
            clearInterval(clock);
            userWin();
        }
        else {
            clearInterval(clock);
            userLoss();
        }
    }))

    //correct guess
    function userWin() {
        $("#game").html("<h3>Great Job! You are correct!</h3>");
        //increment wins
        wins++;
        //display correct answer
        $("#game").append("<p class='correctAnswer'>The correct answer is: <span class='answer'>" + questions[questionNumb].answer + "</span></p>" +
            //display image
            questions[questionNumb].image);
        //wait five seconds then move to next question
        setTimeout(nextQuestion, 1000 * 5);
        //Moves to next question
        questionNumb++;
    }

    //incorrect guess
    function userLoss() {
        $("#game").html("<h3>Oh no, that isn't right...</h3>");
        //increment losses
        losses++;
        //display correct answer
        $("#game").append("<p class='correctAnswer'>The correct answer is: <span class='answer'>" + questions[questionNumb].answer + "</span></p>" +
            //display image
            questions[questionNumb].image);
        //wait five seconds then move to next question
        setTimeout(nextQuestion, 1000 * 5);
        //Moves to next question
        questionNumb++;

    }

    //out of time
    function userTime() {
        if (time < 1) {
            $("#game").html("<h3>Times up!</h3>");
            //increment losses
            losses++;
            //display correct answer
            $("#game").append("<p class='correctAnswer'>The correct answer is: <span class='answer'>" + questions[questionNumb].answer + "</span></p>" +
                //display image
                questions[questionNumb].image);
            //wait five seconds then move to next question
            setTimeout(nextQuestion, 1000 * 5);
            //Moves to next question
            questionNumb++;
        }
    }

    function nextQuestion() {
        if (questionNumb < questions.length) {
            time = 20;
            $("#game").html("<p class='timer'>Time remaining: <span id='timer'>" + time + "</span></p>");
            questionGen();
            timer();
            userTime();
        }
        else {
            results();
        }
    }



    //score screen
    function results() {
        if (wins === questions.length) {
            var feedback = "Congratulations, you're a hypernerd. Let's draft!"
        }
        else if (wins > 7) {
            var feedback = "Pretty good! Let's brew!"
        }
        else if (wins > 4) {
            var feedback = "Hm you did okay. Maybe try netdecking."
        }
        else {
            var feedback = "Do you even play this game?"
        }
        $("#game").html("<h3>" + feedback + "<h3>" + "<p>You scored " + wins + " out of " + questions.length);
        $("#game").append("<h2 id='start'>Play Again?</h2>");
        reset();
        $("#start").click(nextQuestion);
    }



    //reset game
    function reset() {
        questionNumb = 0;
        wins = 0;
        losses = 0;
        time = 20;
    }

    




})