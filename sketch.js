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

  // Draw walls
  stroke(0);
  noFill();
  rect(0, 0, width - 1, height - 1);

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

    // Update position based on current heading
    let velocity = p5.Vector.fromAngle(this.heading).mult(this.speed);
    this.pos.add(velocity);

    // Reflect off walls
    if (this.pos.x > width) {
      this.pos.x = width;
      this.heading = PI - this.heading;
    } else if (this.pos.x < 0) {
      this.pos.x = 0;
      this.heading = PI - this.heading;
    }

    if (this.pos.y > height) {
      this.pos.y = height;
      this.heading = TWO_PI - this.heading;
    } else if (this.pos.y < 0) {
      this.pos.y = 0;
      this.heading = TWO_PI - this.heading;
    }

    // Normalize heading
    this.heading = (this.heading % TWO_PI + TWO_PI) % TWO_PI;
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
