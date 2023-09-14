const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

const circleRadius = 150; // Radius of the circle
const graphScale = 0.6; // Adjust the scale of the graph to make it slower
const graphWidth = canvas.width;

let points = []; // Store the plotted points

function updateSimulation() {
    // Calculate the position of the moving point
    const currentTime = performance.now() * 0.001; // Convert to seconds for smoother animation
    const angle = (currentTime * graphScale) % (Math.PI * 2);
    const pointX = canvas.width / 2 + Math.cos(angle) * circleRadius;
    const pointY = canvas.height / 2 + Math.sin(angle) * circleRadius;

    // Draw the circle
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, circleRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "gray";
    ctx.stroke();
    ctx.closePath();

    // Draw the moving point with both fill and stroke
    ctx.beginPath();
    ctx.arc(pointX, pointY, 5, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.strokeStyle = "blue"; // Adjust stroke color
    ctx.lineWidth = 1; // Adjust stroke width
    ctx.stroke();
    ctx.closePath();

    // Plot the point on the graph with fill and stroke
    const graphX = (angle / (Math.PI * 2)) * graphWidth;
    const graphY = canvas.height / 2 - Math.sin(angle) * circleRadius;
    const point = { x: graphX, y: graphY };
    points.push(point);

    ctx.fillStyle = "aqua";
    ctx.fillRect(graphX, graphY, 3, 3);
    ctx.strokeStyle = "blue"; // Adjust stroke color
    ctx.lineWidth = 1; // Adjust stroke width

    // Draw the trail of points on the graph
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    ctx.closePath();

    // Draw a line connecting the moving point and the graph point
    ctx.beginPath();
    ctx.moveTo(pointX, pointY);
    ctx.lineTo(graphX, graphY);
    ctx.stroke();
    ctx.closePath();

    requestAnimationFrame(updateSimulation);
}

updateSimulation();
