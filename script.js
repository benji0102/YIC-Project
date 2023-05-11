
// A function to generate a quiz to test the user on their knowledge.

function displayQuiz() {

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

// A function to grade the quiz and display the score.

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
  
    // compare user's answers to correct answers. If correct, highlight green. If incorrect, highlight red.
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
 
function boxGame() {

    console.log("box called");

      // Define the canvas and context
      const canvas = document.querySelector('#canvas');
      const ctx = canvas.getContext('2d');

      // Define the boxes and floor
      const box1 = {
        x: 100,
        y: canvas.height / 2 - 25,
        mass: 1,
        velocity: 0,
        momentum: 0,
        color: 'red'
      };

      const box2 = {
        x: canvas.width - 100,
        y: canvas.height / 2 - 25,
        mass: 1,
        velocity: 0,
        momentum: 0,
        color: 'blue'
      };

      const floor = {
        x: 0,
        y: canvas.height / 2 + 25,
        width: canvas.width,
        height: 1,
        color: 'black'
      };

      // Define the function to update the boxes
      function update() {
  // Move the boxes
  box1.x += box1.velocity;
  box2.x += box2.velocity;

  // Check for collision
  if (box1.x + 50 >= box2.x) {
    const totalMass = box1.mass + box2.mass;
    const box1Momentum = box1.mass * box1.velocity;
    const box2Momentum = box2.mass * box2.velocity;
    const totalMomentum = box1Momentum + box2Momentum;

    box1.velocity = -1* ((totalMomentum - box2Momentum) / totalMass);
    box2.velocity = -1* ((totalMomentum - box1Momentum) / totalMass);

    collision = true;
  }

  // Check for off-screen
  if (box1.x > canvas.width || box2.x < 0) {
    // Reset the game
    box1.x = 100;
    box1.velocity = 0;
    box2.x = canvas.width - 100;
    box2.velocity = 0;
  }

  // Calculate momentum
  box1.momentum = box1.mass * box1.velocity;
  box2.momentum = box2.mass * box2.velocity;
}

      // Define the function to draw the boxes
      function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Set the background color of the canvas to white
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set the border of the canvas to black
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Draw the floor
        ctx.fillStyle = floor.color;
        ctx.fillRect(floor.x, floor.y, floor.width, floor.height);
        
        // Draw the boxes
        ctx.fillStyle = box1.color;
        ctx.fillRect(box1.x, box1.y, 50, 50);

        ctx.fillStyle = box2.color;
        ctx.fillRect(box2.x, box2.y, 50, 50);

        // Display the resulting momentums upon collision
        if (collision) {
          ctx.fillStyle = 'black';
          ctx.font = '20px Arial';

          // Display velocities
          ctx.fillText(`Box 1 velocity: ${box1.velocity.toFixed(2)}m/s`, 50, 130);
          ctx.fillText(`Box 2 velocity: ${box2.velocity.toFixed(2)}m/s`, 50, 160);


          // Display momentums
          ctx.fillText(`Box 1 momentum: ${box1.momentum.toFixed(2)}kgm/s`, 50, 50);
          ctx.fillText(`Box 2 momentum: ${box2.momentum.toFixed(2)}kgm/s`, 50, 80);

          // Display total momentum
          ctx.fillText(`Total momentum: ${(box1.momentum + box2.momentum).toFixed(2)}kgm/s`, 50, 300);

      }
    }

      // Define the function to start the game
      function start() {
        // Get the initial velocities from the user
        box1.velocity = Number(document.getElementById('box1-velocity').value);
        box2.velocity = -1*(Number(document.getElementById('box2-velocity').value));
        box1.mass = Number(document.getElementById('box1-mass').value);
        box2.mass = Number(document.getElementById('box1-mass').value);

        // Start the game loop
        setInterval(() => {
          update();
          draw();
        }, 10);
      }

      // Start the game
      start();
}




/* The following script was an attempt at a laser game when the website was designed to address Optics, another area of Physics.
Summarised, the game drew a canvas on screen within which was a laser generator in the bottom left corner, emitting a laser beam. 
The user could place mirrors on the canvas by left-clicking and remove the mirrors by right-clicking. The mirrors
could be rotated by clicking on them. The goal of the game was to place the mirrors in such a way that the laser would hit a target
in the top right corner of the canvas. Problems ensued when rendering the game within
a HTML container and in the placement and removal of the mirrors. The game was not completed due to time constraints.
*/

/*

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

*/