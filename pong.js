var ball_interval;

document.getElementById("start").addEventListener("click",ball_interval=window.setInterval(move_ball,16));
document.getElementById("reset").addEventListener("click",reset);

var canvas=document.getElementById("canvas");
canvas.setAttribute("width",screen.width);
canvas.setAttribute("height",screen.height);
var left_pad=document.getElementById("left");
var right_pad=document.getElementById("right");
var ball=document.getElementById("ball");
var p1_score=document.getElementById("p1_score");
var p2_score=document.getElementById("p2_score");
left_pad.setAttribute("width",canvas.getAttribute("width")/18);
right_pad.setAttribute("width",canvas.getAttribute("width")/18);
left_pad.setAttribute("height",canvas.getAttribute("height")/7);
right_pad.setAttribute("height",canvas.getAttribute("height")/7);

var ball_x;
var ball_y;
var ball_interval;
reset();
function reset(){
    ball.setAttribute("cx",canvas.getAttribute("width")/2);
    ball.setAttribute("cy",canvas.getAttribute("height")/2);
    left_pad.setAttribute("x",20);
    left_pad.setAttribute("y",(screen.height/2)-(left_pad.getAttribute("height")/2));
    right_pad.setAttribute("x",screen.width-20);
    right_pad.setAttribute("y",(screen.height/2)-(right_pad.getAttribute("height")/2));
    p1_score.innerHTML ="0";
    p2_score.innerHTML ="0";
    ball_x=1;
    ball_y=1;		   
}

function random_neg(){
    if (Math.random()<0.5)
	return -1;
    else
	return 1;
}

function move_ball(){
    console.log("x before: "+ball.getAttribute("cx"));
    ball.setAttribute("cx",parseInt(ball.getAttribute("cx"))+ball_x);
    console.log("x after: "+ball.getAttribute("cx"));
    ball.setAttribute("cy",parseInt(ball.getAttribute("cy"))+ball_y);
}    
