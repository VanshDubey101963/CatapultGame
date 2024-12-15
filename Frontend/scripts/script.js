const canvas = document.getElementById("gamecanvasforlevel");
const ctx = canvas.getContext("2d");
canvas.width = 1400;
canvas.height = 600;

let bird = {
<<<<<<< HEAD
    x: 385, y: 355, radius: 38, color: 'red', vx: 0, vy: 0, isMoving: false,
=======
    x: 385, y: 355, radius: 45, color: 'red', vx: 0, vy: 0, isMoving: false,
>>>>>>> c0df073 (added obstacles)
    image: new Image(),
    resetPosition: function () {
        this.x = 385;
        this.y = 355;
        this.vx = 0;
        this.vy = 0;
        this.isMoving = false;
    },
};
<<<<<<< HEAD
bird.image.src = "../assets/sprites/ball.jpg"

let slingShot = { x: 350, y: 350, isDragging: false, pullStart: { x: 0, y: 0 }, image: new Image() }
=======
bird.image.src = "../assets/sprites/ball.jpg";

let slingShot = { x: 350, y: 350, isDragging: false, pullStart: { x: 0, y: 0 }, image: new Image() };
>>>>>>> c0df073 (added obstacles)
slingShot.image.src = "../assets/sprites/Slingshot.jpg";

const gravity = 0.4;
const friction = 0.99;
<<<<<<< HEAD

canvas.addEventListener("mousedown", (e) => {
    const distance = Math.hypot(e.offsetX - bird.x, e.offsetY - bird.y)
    if (distance <= bird.radius) {
        slingShot.isDragging = true
        slingShot.pullStart = { x: e.offsetX, y: e.offsetY }
=======
let gameOver = false;

// Score
let score = 0;

// HTML Score Element
const scoreElement = document.getElementById("score"); // Ensure an element with id 'score' exists in your HTML

function updateScore() {
    scoreElement.innerText = `Score: ${score}`;
}

// Walls
let walls = [
    {
        x: 900,
        y: Math.random() * (canvas.height - 150) + 50,
        width: 80,
        height: 200,
        color: 'brown'
    }
];

const wallImage = new Image();
wallImage.src = "../assets/sprites/wall.jpg";

// Collision detection
function detectCollision(bird, wall) {
    return (
        bird.x + bird.radius > wall.x &&
        bird.x - bird.radius < wall.x + wall.width &&
        bird.y + bird.radius > wall.y &&
        bird.y - bird.radius < wall.y + wall.height
    );
}

// Mouse controls for slingshot
canvas.addEventListener("mousedown", (e) => {
    const distance = Math.hypot(e.offsetX - bird.x, e.offsetY - bird.y);
    if (distance <= bird.radius) {
        slingShot.isDragging = true;
        slingShot.pullStart = { x: e.offsetX, y: e.offsetY };
>>>>>>> c0df073 (added obstacles)
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (slingShot.isDragging) {
        const dx = e.offsetX - slingShot.x;
        const dy = e.offsetY - slingShot.y;
        const distance = Math.min(Math.hypot(dx, dy), 130);
        const angle = Math.atan2(dy, dx);

        bird.x = slingShot.x + Math.cos(angle) * distance;
        bird.y = slingShot.y + Math.sin(angle) * distance;
    }
});

<<<<<<< HEAD
canvas.addEventListener("mouseup", (e) => {
=======
canvas.addEventListener("mouseup", () => {
>>>>>>> c0df073 (added obstacles)
    if (slingShot.isDragging) {
        const dx = slingShot.x - bird.x;
        const dy = slingShot.y - bird.y;

        bird.vx = dx * 0.2;
        bird.vy = dy * 0.2;
        bird.isMoving = true;

        slingShot.isDragging = false;
<<<<<<< HEAD
        bird.x = slingShot.x;
        bird.y = slingShot.y;
=======
>>>>>>> c0df073 (added obstacles)
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key == 'r') {
        bird.resetPosition();
<<<<<<< HEAD
    }
})


function gameLoop() {
    ctx.clearRect(0, 0, 1400, 600);
    ctx.drawImage(slingShot.image, slingShot.x, slingShot.y, 100, 150);

=======
        score = 0;
        gameOver = false; // For restart
        updateScore();
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(slingShot.image, slingShot.x, slingShot.y, 100, 150);

    // Draw slingshot band
>>>>>>> c0df073 (added obstacles)
    if (slingShot.isDragging) {
        ctx.beginPath();
        ctx.moveTo(bird.x, bird.y);
        ctx.lineTo(slingShot.pullStart.x, slingShot.pullStart.y);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
    }

<<<<<<< HEAD
    ctx.drawImage(bird.image , bird.x , bird.y , bird.radius, bird.radius);

=======
    // Draw bird
    ctx.drawImage(bird.image, bird.x - bird.radius / 2, bird.y - bird.radius / 2, bird.radius, bird.radius);

    // Draw walls
    walls.forEach((wall) => {
        ctx.drawImage(wallImage, wall.x, wall.y, wall.width, wall.height);

        // Check collision
        if (detectCollision(bird, wall)) {
            score += 10;
            updateScore();
            bird.resetPosition(); // Reset bird's position after collision
        }
    });

    // Bird physics and motion
>>>>>>> c0df073 (added obstacles)
    if (bird.isMoving) {
        bird.vy += gravity;
        bird.vx *= friction;
        bird.vy *= friction;

        bird.x += bird.vx;
        bird.y += bird.vy;

<<<<<<< HEAD
        if (Math.abs(bird.vx) < 0.1 && Math.abs(bird.vy) > 0.1) {
=======
        // Stop bird if velocities are negligible
        if (Math.abs(bird.vx) < 0.1 && Math.abs(bird.vy) < 0.1) {
>>>>>>> c0df073 (added obstacles)
            bird.isMoving = false;
            bird.resetPosition();
        }
    }

<<<<<<< HEAD

    if (bird.y + bird.radius > canvas.height) {
        bird.y = canvas.height - bird.radius;
        bird.vy *= -0.7;
    }

=======
    // Prevent bird from falling through the ground
    if (bird.y + bird.radius > canvas.height) {
        bird.y = canvas.height - bird.radius;
        bird.vy *= -0.7; // Bounce effect
    }

    // Prevent bird from moving outside canvas boundaries
>>>>>>> c0df073 (added obstacles)
    if (bird.x + bird.radius > canvas.width || bird.x - bird.radius < 0) {
        bird.vx *= -1;
    }

<<<<<<< HEAD

    requestAnimationFrame(gameLoop);
}


gameLoop();
=======
    requestAnimationFrame(gameLoop);
}

gameLoop();
>>>>>>> c0df073 (added obstacles)
