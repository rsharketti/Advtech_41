// JavaScript Document


var myCanvas = document.getElementById("myCanvas");
//choose the rendering context and its built-in drawing function. 
var ctx = myCanvas.getContext("2d");
//store the starting position of the coordinate:
//var x = 100; 
//var y = 100;
		


//periodically call the function that draws on particle
setInterval( drawParticle, 1000/30);

//make an empty array for the particles.
var p_array = [];
//put 50 particles into it, each invokeing the particle class
for(var i=0; i<50; i++){
	//make a particle object and push it into the array.
	p_array.push(new Particle());	
}//end loop

/**
 *This class is the blue print for a particle with its own x, y
 *velocity and direction, radius (size), and color
 */
 
function Particle(){
	//random x, y position for each particle 
	this.x = Math.random()*500;
	this.y = Math.random()*500;
	//subtracting 10 from the velocity means it will be between -10 and 10
	this.vx = Math.random()*20-10;
	this.vy = Math.random()*20-10;
	//each gets a size radius between 20 and 40
	this.radius = Math.random()*20+20;
	
	//random color using random red, random green, random blue
	var r = Math.random()*255>>0;
	var g = Math.random()*255>>0;
	var b = Math.random()*255>>0;
	this.color="rgba("+r+","+g+","+b+",1)";
}//end Particle class


		/*
		 *this method makes a circular particle.
		 */
function drawParticle(){
	ctx.globalCompositeOperation = "source-over";
	//paint the canvas with a black rectangle.
	ctx.fillStyle = "rgba(0, 0, 0, .5)";
	ctx.fillRect(0,0,500,500);
	//now blend the particles with the background:
	ctx.globalCompositeOperation = "lighter";
	
	//loop through all the particles in the array, draw and move each.
	for (var t=0; t<p_array.length;t++){
		//var to refer to the current particle the loop is working on
		var p = p_array[t];
			//begin a path that will be a circle 
			ctx.beginPath();
			
			//define a gradient with 4 color stops
			var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
			gradient.addColorStop(0, "white");//at center of gradient, its white.
			gradient.addColorStop(0.4, "white");//whiteness ends 40% of the way out.
			gradient.addColorStop(0.4, p.color);//then it abruptly becomes the random color.
			gradient.addColorStop(1, "black");
			
			ctx.fillStyle = gradient;
			//make a circle 
			ctx.arc(p.x, p.y, p.radius, Math.PI*2, false);
			ctx.fill();//applies the filStyle we specified above.
			
			//move this particle a little so its seems to move with each redraw.
			p.x+= p.vx;
			p.y+= p.vy;
			
			//keep them in play. if the particle is off edge of canvas, 
			//reset the x, y, to just off the opposite edge.
			if(p.x < -50) p.x = 550;
			if(p.x > 550) p.x = -50;
			if(p.y < -50) p.y = 550;
			if(p.y > 550) p.y = -50;
	}//close the for loop that says what to do to each particle.
};//end drawParticle()

