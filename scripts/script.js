const canvas = document.getElementById("gamecanvasforlevel");
const ctx = canvas.getContext("2d");
canvas.width = 1400;
canvas.height = 600;

let bird = {
    x: 385, y: 355, radius: 45, color: 'red', vx: 0, vy: 0, isMoving: false,
    image: new Image(),
    resetPosition: function () {
        this.x = 385;
        this.y = 355;
        this.vx = 0;
        this.vy = 0;
        this.isMoving = false;
    },
};
bird.image.src = "../assets/sprites/ball.jpg";

let slingShot = { x: 350, y: 350, isDragging: false, pullStart: { x: 0, y: 0 }, image: new Image() };
slingShot.image.src = "../assets/sprites/Slingshot.jpg";

const gravity = 0.4;
const friction = 0.99;

canvas.addEventListener("mousedown", (e) => {
    const distance = Math.hypot(e.offsetX - bird.x, e.offsetY - bird.y)
    if (distance <= bird.radius) {
        slingShot.isDragging = true
        slingShot.pullStart = { x: e.offsetX, y: e.offsetY }
    }
});  

let gameOver = false;

let score = 0;
const scoreElement = document.getElementById("score");

function updateScore() {
    scoreElement.innerText = `Score: ${score}`;
}


let walls = [
    {
        x: 1000,
        y: 550,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1000,
        y: 510,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1000,
        y: 470,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1081,
        y: 550,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1081,
        y: 510,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1081,
        y: 470,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1000,
        y: 430,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1081,
        y: 430,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1000,
        y: 390,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1081,
        y: 390,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1081,
        y: 390,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1081,
        y: 350,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1000,
        y: 350,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1081,
        y: 310,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1000,
        y: 310,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1081,
        y: 270,
        width: 80,
        height: 40,
        color: 'brown'
    },
    {
        x: 1000,
        y: 270,
        width: 80,
        height: 40,
        color: 'brown'
    },
   
];

const wallImage = new Image();
wallImage.src = "../assets/sprites/wall.jpg";

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

canvas.addEventListener("mouseup", () => {
    if (slingShot.isDragging) {
        const dx = slingShot.x - bird.x;
        const dy = slingShot.y - bird.y;

        bird.vx = dx * 0.2;
        bird.vy = dy * 0.2;
        bird.isMoving = true;

        slingShot.isDragging = false;
        bird.x = slingShot.x;
        bird.y = slingShot.y;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key == 'r') {
        bird.resetPosition();
    }
})


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(slingShot.image, slingShot.x, slingShot.y, 100, 150);

    ctx.drawImage(slingShot.image, slingShot.x, slingShot.y, 100, 150);
    updateScore();

    if(gameOver)
    {
        alert(`game over with score ${score}`)
        return;
    }

    if (slingShot.isDragging) {
        ctx.beginPath();
        ctx.moveTo(bird.x, bird.y);
        ctx.lineTo(slingShot.pullStart.x, slingShot.pullStart.y);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
    }

    ctx.drawImage(bird.image , bird.x , bird.y , bird.radius, bird.radius);

    for (let i = walls.length - 1; i >= 0; i--) {
        const wall = walls[i];
        ctx.drawImage(wallImage, wall.x, wall.y, wall.width, wall.height);

        if (detectCollision(bird, wall)) {
            walls.splice(i, 1);

            // Bounce back the bird
            if (bird.x < wall.x || bird.x > wall.x + wall.width) {
                bird.vx = -bird.vx * 0.7;
            }
            if (bird.y < wall.y || bird.y > wall.y + wall.height) {
                bird.vy = -bird.vy * 0.7;
            }

            score += 10;
            updateScore();
        }
    }

 
    if (bird.isMoving) {
        bird.vy += gravity;
        bird.vx *= friction;
        bird.vy *= friction;

        bird.x += bird.vx;
        bird.y += bird.vy;

        
        if (Math.abs(bird.vx) < 0.1 && Math.abs(bird.vy) > 0.1) {
            bird.isMoving = false;
            gameOver = true;
            bird.resetPosition();
        }
    }

    if (bird.y + bird.radius > canvas.height) {
        bird.y = canvas.height - bird.radius;
        bird.vy *= -0.7;
    }

    if (bird.y - bird.radius < 0) {
        bird.y = bird.radius;
        bird.vy *= -0.7;
    }


    if (bird.x + bird.radius > canvas.width || bird.x - bird.radius < 0) {
        bird.vx *= -1;
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();
