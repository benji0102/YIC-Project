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

    // Constants
    const canvasWidth = 600;
    const canvasHeight = 400;
    const laserGeneratorWidth = 20;
    const laserGeneratorHeight = 10;
    const laserColor = "red";
    const mirrorSize = 30;
    const mirrorRotationAngle = Math.PI / 4;

    // Variables
    let canvas, ctx, laserStart, mirrors = [];

    // Functions
    function drawLaser() {
    ctx.strokeStyle = laserColor;
    ctx.beginPath();
    ctx.moveTo(laserStart.x, laserStart.y);
    ctx.lineTo(canvasWidth, laserStart.y);
    ctx.stroke();
    }

    function drawMirror(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(mirrorRotationAngle);
    ctx.strokeRect(-mirrorSize / 2, -mirrorSize / 2, mirrorSize, mirrorSize);
    ctx.restore();
    }

    function update() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawLaser();
    mirrors.forEach(mirror => drawMirror(mirror.x, mirror.y));
    }

    // Initialization
    canvas = document.getElementById("game-canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");

    ctx.fillStyle = "gray";
    ctx.fillRect(0, canvasHeight - laserGeneratorHeight, laserGeneratorWidth, laserGeneratorHeight);
    laserStart = { x: laserGeneratorWidth / 2, y: canvasHeight - laserGeneratorHeight / 2 };

    drawLaser();

    // Event listeners
    canvas.addEventListener("mousedown", event => {
        if (event.button === 0) { // left click
            mirrors.push({ x: event.offsetX, y: event.offsetY });
        } else if (event.button === 2) { // right click
            mirrors.pop();
        }
        update();
    });

    canvas.addEventListener("click", event => {
        mirrors.forEach(mirror => {
            if (event.offsetX >= mirror.x - mirrorSize / 2 && event.offsetX <= mirror.x + mirrorSize / 2 &&
                event.offsetY >= mirror.y - mirrorSize / 2 && event.offsetY <= mirror.y + mirrorSize / 2) {
                mirrorRotationAngle += Math.PI / 4;
                update();
            }
        });
    });
}