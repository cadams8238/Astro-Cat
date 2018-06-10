const GRID = 50;

let cat;
let stars;
let lowerRows = [];
let upperRows = [];

/*
---------------------------------------------------------
setup() only executes once. Elements such as the back-
ground are placed here so they don't execute over and over
unnecessarily.
---------------------------------------------------------
*/

function setup() {
  
 createCanvas(650, 650);
	cat = new Cat(width/2-GRID, height-GRID, GRID, GRID);
	stars = new Stars();

	//Row(verticalPosition, numOfObstacles, speed, spacingBetween, widthOfObject, direction)
	
	//lower half obstacles
	for(let i = 2; i < height/GRID/2; i++) {
		const yPosition = height-GRID*i;
		const speed = randomNumInRange(1, 3.5);
		const spacingBetween = randomNumInRange(200, 400);
		const direction = randomDirection(0,1);

		if(i % 2 === 0) {
			lowerRows.push(new Row(yPosition, 3, speed, spacingBetween, GRID, direction));
		} else {
			lowerRows.push(new Row(yPosition, 2, speed, spacingBetween, GRID*2, direction));
		}
	}

	//upper half obstacles
	for(let i = Math.floor(height/GRID/2+2); i < height/GRID; i++) {
		const yPosition = height-GRID*i;
		const speed = randomNumInRange(1, 3);
		const spacingBetween = randomNumInRange(200, 400);
		const direction = randomDirection(0,1);

		if(i % 2 === 0) {
			upperRows.push(new Row(yPosition, 2, speed, spacingBetween, GRID*2, 1));
		}
		upperRows.push(new Row(yPosition, 2, speed, spacingBetween, GRID*2, direction));
	}
}

/*
---------------------------------------------------------
draw() will continuously run unless it's stopped.
It's responsible for drawing each iteration of the game
---------------------------------------------------------
*/

function draw() {
	createBackground();
	cat.show();
	upperRows.forEach(row => {
		row.show();
		row.move();
	});

	lowerRows.forEach(row => {
		row.show();
		row.move();
	});
}

/*
---------------------------------------------------------
keyPressed()
---------------------------------------------------------
*/

function keyPressed() {
	//console.log('key pressed!');

	if (keyCode === LEFT_ARROW) {
		cat.move(-1,0,'left');
	}
	else if (keyCode === RIGHT_ARROW) {
		cat.move(1,0,'right');
	}
	else if (keyCode === UP_ARROW) {
		cat.move(0,-1,'up');
	}
	else if (keyCode === DOWN_ARROW) {
		cat.move(0,1,'down');
	}

}

/*
---------------------------------------------------------
createBackground() draws out the background for the game.
This includes the outline for the gameboard, the lighter
black box at the bottom of gameboard, and the stars
all packed neatly in their own functions
---------------------------------------------------------
*/

function createBackground() {

	 	background(0);
	 	drawOutline();
	 	drawMilkyWay();
		stars.draw(); 


}

/*
---------------------------------------------------------
drawOutline() creates outline around gameboard
---------------------------------------------------------
*/

function drawOutline() {

	stroke('#EBEBD3');
  strokeWeight(4);
  noFill();	//noFill needed so that the black background will show through
  rect(0,0,width,height);

}

/*
---------------------------------------------------------
drawMilkyWay() creates "Milky way", lighter black box at 
bottom of gameboard
---------------------------------------------------------
*/

function drawMilkyWay() {

	const border = 2;

	fill('#1F2223');
  noStroke();
  rect(border, 300, width-border*2, 348); //values take outer stroke into consideration and don't cover it up, stroke = 2 px (approx)

}

/*
---------------------------------------------------------
<object> creates a very basic framework for any object 
used in the game. It's reused to create the Cat and 
obstacles
---------------------------------------------------------
*/

class GameObject {

	constructor(x,y,w,h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	// intersects(obstacle) {
	// 	return !(this.left > obstacle.right || this.right < obstacle.left ||
	// 					 this.top > obstacle.bottom || this.bottom < obstacle.top);
	// }
}

/*
---------------------------------------------------------
<Cat> creates...you guessed it, our delightful little
 protagonist, the cat! It extends all the functionality
 of the <Object> class and then of course adds it's own
 unique traits.
---------------------------------------------------------
*/

class Cat extends GameObject {

	show() {
		fill('white');
		rect(this.x, this.y, this.w, this.h);

	}

	move(x,y, directionKey) {
		if(this.x <= GRID/2 && directionKey === 'left') 									this.x = GRID/2;
		else if(this.x >= width-GRID/2-GRID && directionKey === 'right') 	this.x = width-GRID/2-GRID;
		else if(this.y <= 0 && directionKey === 'up')											this.y = 0;
		else if(this.y >= height-GRID && directionKey === 'down')					this.y = height-GRID;

		else {
			this.x += x * GRID;
			this.y += y * GRID;
		}
	}
}


class Obstacle extends GameObject{

	constructor(x,y,w,h,speed,direction) {
		super(x,y,w,h); 
		this.speed = speed;
		this.direction = direction;

		if(direction === 1) {
			this.x = width;
		} 
	}

	show() {
		fill('grey');
		rect(this.x, this.y, this.w, this.h);
	}

	move() {
		if(this.direction === 1) {
			if(this.x > width) {
				this.x = -(GRID*2);	//just an offset when car goes off the gameboard
			}
			this.x += this.speed;
		}
		else {
			if(this.x < -this.w) {
				this.x = width+GRID*2;
			}
			this.x -= this.speed;
		}
		
	}
}




class Row {

	constructor(verticalPosition, numOfObstacles, speed, spacingBetween, widthOfObject, direction) {
		this.position = verticalPosition;
		this.numOfObstacles = numOfObstacles;
		this.speed = speed;
		this.spacing = spacingBetween;
		this.objWidth = widthOfObject;
		this.direction = direction;


		this.obstaclesInRow = [];

		for(let i = 0; i < numOfObstacles; i++) {
			const x = i * this.spacing;
			this.obstaclesInRow.push(new Obstacle(x, this.position, this.objWidth, GRID, this.speed, this.direction));
		}
	}

	show() {
		for(let i = 0; i < this.obstaclesInRow.length; i++) {
			this.obstaclesInRow[i].show();
		}
	}

	move() {
		for(let i = 0; i < this.obstaclesInRow.length; i++) {
			this.obstaclesInRow[i].move();
		}
	}



}





class Stars {

	constructor() {
  	this.starData = [];

		for (let i = 0; i < 150; i++) {
			let x = random(1,width),
	  			y = random(1,height),
	  			diameter = random(1,3);
	  			
	  	this.starData.push({x: x, y: y, diameter: diameter});
  	}
  }


	draw() {
		for (let i = 0; i < this.starData.length; i++) {

	  	fill('#EBEBD3');
	  	noStroke();
	  	ellipse(this.starData[i].x, this.starData[i].y, this.starData[i].diameter);
	  }
	}
}



function randomNumInRange(min, max) {
	return Math.random() * (max - min) + min;
}

function randomDirection() {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}





















