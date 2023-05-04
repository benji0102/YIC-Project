function displayQuiz(divID) {

    console.log("displayQuiz called");

    // get a reference to the quiz container div
    var quizContainer = document.getElementById("quizboxNewton");

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
                '<button class="submit" onclick="gradeQuiz()">Submit Answers</button>' +
                '<div id="score"></div>';

    // set the HTML content of the quiz container div
    quizContainer.innerHTML = quizHtml;
}

function gradeQuiz() {
    var correctAnswers = ["4", "Paris", "Harper Lee", "Mercury", "Joe Biden"];
    var userAnswers = [];
    var numCorrect = 0;
  
    // get the user's answers
    userAnswers.push(document.getElementById("q1").value);
    userAnswers.push(document.getElementById("q2").value);
    userAnswers.push(document.getElementById("q3").value);
    userAnswers.push(document.getElementById("q4").value);
    userAnswers.push(document.getElementById("q5").value);
  
    // compare user's answers to correct answers
    for (var i = 0; i < correctAnswers.length; i++) {
      var answerField = document.getElementById("q" + (i+1));
      if (userAnswers[i] === correctAnswers[i]) {
        answerField.style.backgroundColor = "green";
        numCorrect++;
      } else {
        answerField.style.backgroundColor = "red";
      }
    }
  
    // display the score
    var scoreDiv = document.getElementById("score");
    scoreDiv.innerHTML = "You got " + numCorrect + " out of " + correctAnswers.length + " correct.";
  }
 
function displayGame(divID) {

    console.log("displayGame called");

    // Define the canvas element
    const canvas = document.getElementById('gameboxOptics');

    // Set the canvas dimensions to fill the screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Get the context for the canvas
    const ctx = canvas.getContext('2d');

    // Define the game state
    const gameState = {
    mirrors: [],
    };

    // Define the laser beam
    const laserBeam = {
    x: canvas.width - 100,
    y: canvas.height - 50,
    width: 100,
    height: 3,
    color: 'red',
    };

    // Define the laser generator
    const laserGenerator = {
    x: canvas.width - 50,
    y: canvas.height -50,
    width: 50,
    height: 50,
    color: 'grey',
    };

    // Define the mirror object
    class Mirror {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 40;
        this.angle = 0;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = 'silver';
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    rotate(angle) {
        this.angle += angle;
        this.angle %= 2 * Math.PI;
    }
    }

    // Add event listener for mouse click
    canvas.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;

    // Create a new mirror object and add it to the game state
    const newMirror = new Mirror(x, y);
    gameState.mirrors.push(newMirror);
    });

    // Render function
    function render() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the laser beam
    ctx.fillStyle = laserBeam.color;
    ctx.fillRect(laserBeam.x, laserBeam.y, laserBeam.width, laserBeam.height);

    // Draw the laser generator
    ctx.fillStyle = laserGenerator.color;
    ctx.fillRect(laserGenerator.x, laserGenerator.y, laserGenerator.width, laserGenerator.height);

    // Draw the mirrors
    gameState.mirrors.forEach((mirror) => {
        mirror.draw();
    });

    // Request the next frame
    requestAnimationFrame(render);
    }

    // Call the render function to start the game loop
    render();
}