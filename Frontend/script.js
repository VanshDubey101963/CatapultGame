const canvas = document.getElementById("gamecanvas");
const ctx = canvas.getContext("2d");

const slingshotImg = new Image();
slingshotImg.src = "Slingshot.jpg"; 


const slingshotX = 400; 
const slingshotY = 350; 

let isDragging = false;
let startX, startY;
let projectile = null;

slingshotImg.onload = () => {
    draw();
};

canvas.addEventListener("mousedown", (e) => {
    startX = e.clientX - canvas.offsetLeft;
    startY = e.clientY - canvas.offsetTop;
    if (isInsideSlingshot(startX, startY)) {
        isDragging = true;
        projectile = { x: slingshotX + 50, y: slingshotY + 150, radius: 10 }; 
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const currentX = e.clientX - canvas.offsetLeft;
        const currentY = e.clientY - canvas.offsetTop;
        draw(currentX, currentY);
    }
});

canvas.addEventListener("mouseup", (e) => {
    if (isDragging) {
        isDragging = false;
        const endX = e.clientX - canvas.offsetLeft;
        const endY = e.clientY - canvas.offsetTop;
        launchProjectile(startX, startY, endX, endY);
    }
});

function isInsideSlingshot(x, y) {
    
    return x >= slingshotX && x <= slingshotX + 100 && y >= slingshotY && y <= slingshotY + 150;
}

function draw(currentX, currentY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.drawImage(slingshotImg, slingshotX, slingshotY, 100, 150); 

    if (isDragging) {
       
        ctx.beginPath();
        ctx.moveTo(slingshotX + 50, slingshotY + 150); 
        ctx.lineTo(currentX, currentY); 
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    
    if (projectile) {
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
}

function launchProjectile(startX, startY, endX, endY) {
    const dx = endX - startX;
    const dy = endY - startY;
    const power = Math.sqrt(dx * dx + dy * dy); 

    projectile.velocityX = (dx / power) * 10; 
    projectile.velocityY = (dy / power) * 10; 
    projectile.x = slingshotX + 50; 
    projectile.y = slingshotY + 150;

    animateProjectile();
}

function animateProjectile() {
    if (projectile) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.drawImage(slingshotImg, slingshotX, slingshotY, 100, 150); 

        
        projectile.x += projectile.velocityX;
        projectile.y += projectile.velocityY;

        projectile.velocityY += 0.2; 

       
        ctx.beginPath();
        ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();

        if (projectile.y < canvas.height) {
            requestAnimationFrame(animateProjectile); 
        } else {
            projectile = null; 
        }
    }
}
