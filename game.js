const GRID = 50;

let cat;
let stars;


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





















