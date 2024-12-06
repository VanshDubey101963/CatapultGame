const canvas = document.getElementById("gamecanvas");
const ctx = canvas.getContext("2d");

const slingshotImg = new Image();
slingshotImg.src = "Slingshot.jpg"; // Path to the slingshot image

// Position of the slingshot
const slingshotX = 400; // Adjust X position
const slingshotY = 350; // Adjust Y position

slingshotImg.onload = () => {
    ctx.drawImage(slingshotImg, slingshotX, slingshotY, 100, 150); // Draw with specific width and height
};
