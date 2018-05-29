const GRID = 50;

let cat;



function preload() {

}


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
	const data = getStarsData();
	console.log(data.arrayOfStars);


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
		cat.move(-1,0);
	}
	else if (keyCode === RIGHT_ARROW) {
		cat.move(1,0);
	}
	else if (keyCode === UP_ARROW) {
		cat.move(0,-1);
	}
	else if (keyCode === DOWN_ARROW) {
		cat.move(0,1);
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
		drawStars(); 


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
drawStars() creates the stars in the game
---------------------------------------------------------
*/

function drawStars() {


	// const stars = new Stars();
	// console.log(stars);
	

	// for (let i = 0; i < stars.length; i++) {

  	fill('#EBEBD3');
  	noStroke();
  	// ellipse(stars[0].x, stars[0].y, stars[0].diameter);
  	// console.log(stars.arrayOfStars[0]);
  // }
}



function getStarsData() {

	return new Stars();
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


	move(x,y) {
		// if(this.x <= GRID/2) 					this.x = GRID/2;
		// if(this.x >= width-GRID/2) 		this.x = width-GRID/2;
		// if(this.y <= GRID/2)					this.y = GRID/2;
		// if(this.y >= height-GRID/2) 	this.y = height-GRID/2;

		// else {
			this.x += x * GRID;
			this.y += y * GRID;
		}
		

}





class Stars {

	constructor() {
		this.arrayOfStars = [];

		for (let i = 0; i < 150; i++) {
			let x = random(1,width),
	  			y = random(1,height),
	  			diameter = random(1,3);
	  			
	  	this.arrayOfStars.push(
	  		{ 
	  			x: x,
	  			y: y,
	  			diameter: diameter
	  		}
	  		);
	  }
	  //console.log(this.arrayOfStars);
	}
}





















