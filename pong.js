var ball_interval;

document.getElementById("start").addEventListener("click",start_ball);
document.getElementById("reset").addEventListener("click",reset);

var canvas=document.getElementById("canvas");
//Set canvas width and height to screen
canvas.setAttribute("width",window.innerWidth*.7);
canvas.setAttribute("height",window.innerHeight*.6);
var left_pad=document.getElementById("left");
var right_pad=document.getElementById("right");
var ball=document.getElementById("ball");
var p1_score=document.getElementById("p1_score");
var p2_score=document.getElementById("p2_score");
//Set dimensions and x coordinates of paddles
left_pad.setAttribute("width",canvas.getAttribute("width")/30);
right_pad.setAttribute("width",canvas.getAttribute("width")/30);
left_pad.setAttribute("height",canvas.getAttribute("height")/5);
right_pad.setAttribute("height",canvas.getAttribute("height")/5);

var ball_x;
var ball_y;
var up;
var ball_interval;

var keys = [];

reset();
function reset(){
    clearInterval(ball_interval);
    var height = canvas.getAttribute("height");
    var width = canvas.getAttribute("width");
    //Return paddles and ball to original locations 
    ball.setAttribute("cx",width/2);
    ball.setAttribute("cy",height/2);
    left_pad.setAttribute("y",(height/2)-(left_pad.getAttribute("height")/2));
    right_pad.setAttribute("y",(height/2)-(right_pad.getAttribute("height")/2));
    left_pad.setAttribute("x",20);
    right_pad.setAttribute("x",width-20-right_pad.getAttribute("width"));
    //Reset score
    p1_score.innerHTML ="0";
    p2_score.innerHTML ="0";
    //Set new ball speed
    ball_x=-7;
    ball_y=-7;
    up=true;
    left=true;
    if (ball_y >0)
	up=false;
    if (ball_x > 0)
	left=false;
    //Reset the key booleans
    keys =[];
}

//Javascript can be difficult sometimes. I wish I could figure out how to get rid of this function
function start_ball(){
    clearInterval(ball_interval);
    ball_interval=window.setInterval(move_ball,16);
}
/*
//Return random number velocity multipled by sign
function random_num(sign){
    return ((Math.random()*5)+2)*sign;
}

function random_neg(){
    if (Math.random()<0.5)
	return -1;
    else
	return 1;
}
*/

//Moves ball and checks collisions
function move_ball(e){
    if (winner.innerHTML != "First to score 5 wins")
	winner.innerHTML = "First to score 5 wins";
       
    console.log("up: " + up+" left: "+left);
    //ball_x = ball_x%10;
    //ball_y = ball_y%10;
    var x=parseInt(ball.getAttribute("cx"));
    var y=parseInt(ball.getAttribute("cy"));
    var radius=parseInt(ball.getAttribute("r"));
    var height = parseInt(canvas.getAttribute("height"));
    var width = parseInt(canvas.getAttribute("width"));

    //Check for top wall
    if (y +ball_y <= radius && up){
	ball_y *= -1;
	up=false;
    }
    //Check for bottom wall
    if (y+radius +ball_y >= height && !up){
	ball_y *= -1;
	up=true;
    }
    //Check for left wall
    if (x + ball_x <= radius && left){
	left=false;
	ball_x=6;
	p2_score.innerHTML = parseInt(p2_score.innerHTML)+1;
	//original stuff
	ball.setAttribute("cx",width/2);
	ball.setAttribute("cy",height/2);
	left_pad.setAttribute("y",(height/2)-(left_pad.getAttribute("height")/2));
	right_pad.setAttribute("y",(height/2)-(right_pad.getAttribute("height")/2));
	left_pad.setAttribute("x",20);
	right_pad.setAttribute("x",width-20-right_pad.getAttribute("width"));
	//ball_x += -0.5;
	//ball_y += -0.5;
	clearInterval(ball_interval);
    }
    //Check for right wall
    if (x +radius +ball_x >= width && !left){
	left=true;
	ball_x=-6;
	p1_score.innerHTML = parseInt(p1_score.innerHTML)+1;
	//original stuff
	ball.setAttribute("cx",width/2);
	ball.setAttribute("cy",height/2);
	left_pad.setAttribute("y",(height/2)-(left_pad.getAttribute("height")/2));
	right_pad.setAttribute("y",(height/2)-(right_pad.getAttribute("height")/2));
	left_pad.setAttribute("x",20);
	right_pad.setAttribute("x",width-20-right_pad.getAttribute("width"));
	//ball_x += -0.5;
	//ball_y += -0.5;
	clearInterval(ball_interval);
   }
    var left_x=parseInt(left_pad.getAttribute("x"));
    var left_y=parseInt(left_pad.getAttribute("y"));
    var right_x=parseInt(right_pad.getAttribute("x"));
    var right_y=parseInt(right_pad.getAttribute("y"));
    var pad_width=parseInt(left_pad.getAttribute("width"));
    var pad_height=parseInt(left_pad.getAttribute("height"));
   
    //Checks for left pad Collision and increase speed
    var distX_left = Math.abs(x +ball_x - (left_x+(pad_width/2)));
    var distY_left = Math.abs(y +ball_y - (left_y+(pad_height/2)));
    
    if (distX_left <= (radius + pad_width/2) && distY_left <= (radius + pad_height/2)){
	if (y>left_y && !up){
	    ball_y *= -1;
	    up=true;
	}
	if (y<left_y && up){
	    ball_y *= -1;
	    up=false;
	}
	if (x>left_x && left){
	    left = false;
	    ball_x *= -1;
	}
    }
    
    //Checks for right pad Collision and increase speed
    var distX_right = Math.abs(x +ball_x- (right_x+(pad_width/2)));
    var distY_right = Math.abs(y +ball_y - (right_y+(pad_height/2)));
    
    if (distX_right <= (radius + pad_width/2) && distY_right <= (radius + pad_height/2)){
	if (y>right_y && !up){
	    ball_y *= -1;
	    up=true;
	}
	if (y<right_y && up){
	    ball_y *= -1;
	    up=false;
	}
	if (x < right_x && !left){
	    left = true;
	    ball_x *= -1;
	}
    }

    //Move ball
    ball.setAttribute("cx",parseInt(ball.getAttribute("cx"))+ball_x);
    ball.setAttribute("cy",parseInt(ball.getAttribute("cy"))+ball_y);
//Check if paddles are to be moved
    if (keys[87])
        move_left(-5);
    if (keys[83])
        move_left(5);
    if (keys[38])
        move_right(-5);
    if (keys[40])
	move_right(5);

    if (p1_score.innerHTML == 5){
	winner.innerHTML = "Player 1 wins!";
	reset();
    }
    if (p2_score.innerHTML == 5){
	winner.innerHTML = "Player 2 wins!";
	reset();
    }
}    

//Taken from https://www.kirupa.com/html5/keyboard_events_in_javascript.htm to handle simultaneus inputs
//Modified
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);
 
function keysPressed(e) {
    // store an entry for every key pressed
    keys[e.keyCode] = true;
}
 
function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
}

//Move left paddle by val amount
function move_left(val){
    if (parseInt(left_pad.getAttribute("y"))+val>=0 && parseInt(left_pad.getAttribute("y"))+val+parseInt(left_pad.getAttribute("height")) <= parseInt(canvas.getAttribute("height"))){
	left_pad.setAttribute("y",parseInt(left_pad.getAttribute("y"))+val);
    }
}

//Move right paddle by val amount
function move_right(val){
    if (parseInt(right_pad.getAttribute("y"))+val>=0 && parseInt(right_pad.getAttribute("y"))+val+parseInt(right_pad.getAttribute("height")) <= parseInt(canvas.getAttribute("height"))){
	right_pad.setAttribute("y",parseInt(right_pad.getAttribute("y"))+val);
    }
}
