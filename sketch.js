let agents = [];

function setup() {
  createCanvas(800, 600);

  // Initialize swarm agents
  for (let i = 0; i < 50; i++) {
    agents.push(new Agent(random(width), random(height), 'A'));
    agents.push(new Agent(random(width), random(height), 'B'));
  }
}

function draw() {
  background(240);

  // Draw a black X at the mouse pointer position
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    stroke(0);
    strokeWeight(2);
    line(mouseX - 5, mouseY - 5, mouseX + 5, mouseY + 5); // Diagonal line 1
    line(mouseX - 5, mouseY + 5, mouseX + 5, mouseY - 5); // Diagonal line 2
  }

  for (let agent of agents) {
    agent.update();
    agent.display();
  }
}

// Define the agent class with directional heading
class Agent {
  constructor(x, y, type) {
    this.pos = createVector(x, y);
    this.speed = 2;
    this.heading = random(TWO_PI);
    this.type = type;
  }

  update() {
    // Randomly change the heading slightly
    this.heading += random(-0.1, 0.1);

    // Adjust heading based on mouse position if within bounds
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
      let mousePos = createVector(mouseX, mouseY);
      let directionToMouse = p5.Vector.sub(mousePos, this.pos).heading(); // Angle to the mouse

      // Calculate the shortest angular difference
      let angleDifference;
      if (this.type === 'A') {
        angleDifference = directionToMouse - this.heading; // For attraction
      } else if (this.type === 'B') {
        angleDifference = directionToMouse + PI - this.heading; // For repulsion
      }

      // Normalize the angle difference to the range [-PI, PI]
      angleDifference = atan2(sin(angleDifference), cos(angleDifference));

      // Smoothly adjust the heading in the shortest direction
      this.heading += angleDifference * 0.05; // Adjust the 0.05 factor for smoother or faster turning
    }

    // Update position based on current heading
    let velocity = p5.Vector.fromAngle(this.heading).mult(this.speed);
    this.pos.add(velocity);

    // Reflect off walls
    if (this.pos.x > width || this.pos.x < 0) {
      this.heading = PI - this.heading; // Reverse horizontal direction
      this.pos.x = constrain(this.pos.x, 0, width); // Keep within bounds
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.heading = -this.heading; // Reverse vertical direction
      this.pos.y = constrain(this.pos.y, 0, height); // Keep within bounds
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);

    // Draw fish/arrow shape
    fill(this.type === 'A' ? 'red' : 'blue');
    noStroke();

    beginShape();
    vertex(10, 0);
    vertex(-10, 5);
    vertex(-6, 0);
    vertex(-10, -5);
    endShape(CLOSE);

    pop();
  }
}
