// Select the canvas element
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Resize the canvas to fit the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Gradient colors
const color1 = '#ff0000';
const color2 = '#0000ff';

// Initialize the gradient angle
let angle = 0;

// Function to draw the spinning gradient
function drawGradient() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate gradient coordinates based on the angle
    const x1 = Math.cos(angle) * canvas.width + canvas.width / 2;
    const y1 = Math.sin(angle) * canvas.height + canvas.height / 2;
    const x2 = canvas.width / 2 - Math.cos(angle) * canvas.width;
    const y2 = canvas.height / 2 - Math.sin(angle) * canvas.height;

    // Create the gradient
    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    // Fill the canvas with the gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update the angle for spinning effect
    angle += 0.02;

    // Request the next frame
    requestAnimationFrame(drawGradient);
}

// Start the animation
drawGradient();

// Adjust canvas size when the window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
