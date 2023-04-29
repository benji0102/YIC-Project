function displayQuiz(divId) {
// get a reference to the quiz container div
var quizContainer = document.getElementById("quizBoxNewton");

// create the quiz HTML code as a string
var quizHtml = '<h2>Quiz</h2>' +
               '<p>Question 1: What is 2+2?</p>' +
               '<input type="text" id="q1">' +
               '<p>Question 2: What is the capital of France?</p>' +
               '<input type="text" id="q2">' +
               '<p>Question 3: Who wrote the novel "To Kill a Mockingbird"?</p>' +
               '<input type="text" id="q3">' +
               '<p>Question 4: Which planet is closest to the sun?</p>' +
               '<input type="text" id="q4">' +
               '<p>Question 5: Who is the current president of the United States?</p>' +
               '<input type="text" id="q5">' +
               '<button onclick="gradeQuiz()">Submit</button>' +
               '<div id="score"></div>';

// set the HTML content of the quiz container div
quizContainer.innerHTML = quizHtml;
}