const canvas = document.getElementById("gamecanvas");
const ctx = canvas.getContext("2d");
canvas.width = 1400;
canvas.height = 600 ;

let bird = { x: 400, y: 360, radius: 20, color: 'red', vx: 0, vy: 0, isMoving: false };
let slingShot = {x: 350 , y: 350 , isDragging: false , pullStart: {x: 0 , y : 0}, image: new Image()}
slingShot.image.src = "../assets/sprites/Slingshot.jpg";

const gravity = 0.4;
const friction = 0.99;

canvas.addEventListener("mousedown", (e) => {
    const distance = Math.hypot(e.offsetX - bird.x , e.offsetY - bird.y)
    if(distance <= bird.radius)
    {
        slingShot.isDragging = true
        slingShot.pullStart = {x: e.offsetX , y: e.offsetY}
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (slingShot.isDragging) {
        const dx = e.offsetX - slingShot.x;
        const dy = e.offsetY - slingShot.y;
        const distance = Math.min(Math.hypot(dx, dy), 100); 
        const angle = Math.atan2(dy, dx);

        bird.x = slingShot.x + Math.cos(angle) * distance;
        bird.y = slingShot.y + Math.sin(angle) * distance;
    }
});

canvas.addEventListener("mouseup", (e) => {
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


function gameLoop() {
    ctx.clearRect(0,0,4000,600);
    ctx.drawImage(slingShot.image, slingShot.x , slingShot.y , 100, 150);

    if (slingShot.isDragging) {
        ctx.beginPath();
        ctx.moveTo(bird.x , bird.y);
        ctx.lineTo(slingShot.pullStart.x, slingShot.pullStart.y);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
    }

    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fillStyle = bird.color;
    ctx.fill();
    ctx.closePath();

    if (bird.isMoving) {
        bird.vy += gravity;
        bird.vx *= friction; 
        bird.vy *= friction;

        bird.x += bird.vx;
        bird.y += bird.vy;

        if (Math.abs(bird.vx) < 0.1 && Math.abs(bird.vy) < 0.1) {
            bird.isMoving = false;
            bird.x = slingShot.x;
            bird.y = slingShot.y;
        }
    }

    if (bird.y + bird.radius > canvas.height) {
        bird.y = canvas.height - bird.radius;
        bird.vy *= -0.7;
    }

    if (bird.x + bird.radius > canvas.width || bird.x - bird.radius < 0) {
        bird.vx *= -1;
    }

    requestAnimationFrame(gameLoop);
}


gameLoop();