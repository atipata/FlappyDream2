
const canvas =document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");
//bulr
const gameContain=document.getElementById("contain");

const sheep = new Image();
sheep.src="asset/sheep2.PNG";


const shspeed =-3;
const shwidth=64; const shheight=64;

const pipe = new Image();
pipe.src="asset/pipe.PNG";
const pipewidth =64;
const pipeheight=512;

const star= new Image();
star.src="asset/star.png";
const moutain= new Image();
moutain.src="asset/moutain.png";

let x=32; let y = 32;
let velo=0;
let acc=0.1;

let pipex=960;
let pipey=canvas.height-160;
let pipegap=90;

let pipex2=640;
let pipey2=canvas.height-160;
let pipegap2=90;

let mx=0; let my=0;
let sx=0; let sy=0;

let mx2=640; let my2=0;
let sx2=640; let sy2=0;

let score=0;
let highscore=0;

let scorediv=document.getElementById('point');

let rebtn = document.getElementById('butn');
let stbtn = document.getElementById('stbtn');

let plus=false;
let plus2=false;


let sound =true;
const openSound = new  Audio();
openSound.src="asset/sound.mp3";
let sbtn = document.getElementById('button');
const openSound2 = new  Audio();
openSound2.src="asset/sound2.mp3";

//sheep sound
let sheepbtn = document.getElementById('buttonsheep');
const sheepSound = new  Audio();
sheepSound.src="asset/sheepAudio.mp3";
//jump sound
const jSound = new  Audio();
jSound.src="asset/pop.mp3";
function baa() {
    sheepSound.play();
}
sheepbtn .addEventListener('click', baa);


//event
document.body.onkeyup = function(e){
    if(e.code=="Space"){
        jSound.play();
        velo=shspeed * 8;
    }
}
function handleScreenClick() {
    jSound.play();
    velo=shspeed * 8;   
}
document.addEventListener('click', handleScreenClick);

function showconsole(){
    hidemenu();
    reset();
    loop();
    return;
}
rebtn.addEventListener('click',showconsole);

//score
function updateScore(newScore) {
    localStorage.setItem('hscore', newScore);
}
function getScore() {
    const score = localStorage.getItem('hscore');
    return score ? parseInt(score) : 0;
}
highscore =getScore();
//sound
function playSound() {
    var z=Math.floor(Math.random() * 2);
    if(z===0){
        openSound.play();
        openSound.addEventListener('ended', function() {
            // When the audio ends, replay it by setting the current time to 0 and calling the play() method again.
            this.currentTime = 0;
            this.play();
        });
    }else{
        openSound2.play();
        openSound2.addEventListener('ended', function() {
            // When the audio ends, replay it by setting the current time to 0 and calling the play() method again.
            this.currentTime = 0;
            this.play();
        });
    }
    
}
function stopSound(){
    openSound.pause();
    openSound.currentTime = 0;
    openSound2.pause();
    openSound2.currentTime = 0;
}
function sss() {
    if(sound){
        sound=false;
        stopSound();
        document.getElementById('soundimg').src="asset/sound2.png";
    }else{
        sound=true;
        playSound();
        document.getElementById('soundimg').src="asset/sound1.png"
    }
}
sbtn.addEventListener('click', sss);
function plusscore(){
    if(x<pipex+pipewidth&&plus){
        score++;  
        plus=false;

    }
    if(x<pipex+pipewidth&&plus2){
        score++;  
        plus2=false;

    }
    
    scorediv.innerHTML=score;
 }
function hitted(){
    const sheepbox={
        sx:x,
        sy:y,
        swidth:shwidth,
        sheight:shheight
    }
    //pipe1
    const topPipebox={
        px:pipex,
        py:pipey-pipegap,
        pwidth:pipewidth,
        pheight:pipeheight
    }
    const downPipebox={
        px:pipex,
        py:pipey+pipegap,
        pwidth:pipewidth,
        pheight:pipeheight
    }
    if(sheepbox.sx+sheepbox.swidth-8>topPipebox.px &&
        sheepbox.sx+8<topPipebox.px +topPipebox.pwidth&&
        sheepbox.sy<topPipebox.py-4){
        return true;
    }
    if(sheepbox.sx+sheepbox.swidth-8>downPipebox.px &&
        sheepbox.sx+8<downPipebox.px +downPipebox.pwidth&&
        sheepbox.sy+sheepbox.sheight-4>downPipebox.py){
        return true;
    }
    //pipe2
    const topPipebox2={
        px:pipex2,
        py:pipey2-pipegap2,
        pwidth:pipewidth,
        pheight:pipeheight
    }
    const downPipebox2={
        px:pipex2,
        py:pipey2+pipegap2,
        pwidth:pipewidth,
        pheight:pipeheight
    }
    if(sheepbox.sx+sheepbox.swidth-8>topPipebox2.px &&
        sheepbox.sx+8<topPipebox2.px +topPipebox2.pwidth&&
        sheepbox.sy<topPipebox2.py-4){
        return true;
    }
    if(sheepbox.sx+sheepbox.swidth-8>downPipebox2.px &&
        sheepbox.sx+8<downPipebox2.px +downPipebox2.pwidth&&
        sheepbox.sy+sheepbox.sheight-4>downPipebox2.py){
        return true;
    }
    if(y<-64||y+shheight>canvas.height+32){
        return true;
    }
    return false;
}
//end menu pop-unpop when died
function hidemenu(){
    if(sound){playSound();}
    document.getElementById("end").style.display="none";
    gameContain.classList.remove("bulr");

}
function reset(){
    
    x = 32;  
    y = 32;
    velo=0;
    acc=0.1;
    pipex=960;
    pipey=canvas.height-160;
    pipegap=90;
    /*
    let mx=0; let my=0;
    let sx=0; let sy=0;

    let mx2=640; let my2=0;
    let sx2=640; let sy2=0;
    */
    pipex2=640;
    pipey2=canvas.height-160;
    pipegap2=90;
    
    score=0;

    document.body.onkeyup = function(e){
        if(e.code=="Space"){
            jSound.play();
            velo=shspeed * 8;
        }
    }
    
    document.addEventListener('click', handleScreenClick);
    
}
function endmenu(){
    if(sound){
        stopSound();
    }
    document.getElementById("end").style.display="block";
    gameContain.classList.add("bulr");
    
    document.getElementById("endscore").innerHTML=score;
    if(highscore<score){
        highscore=score;
        updateScore(score);
    }
    document.getElementById("bestscore").innerHTML=highscore;

    document.body.onkeyup = function(x){
        if(x.code=="KeyR"){ 
            hidemenu();
            reset();
            loop();
        }
    }
    

}
function hidconsole(){
    playSound();
    document.getElementById("start").style.display="none";
    document.body.onkeyup = function(e){
        if(e.code=="Space"){
            jSound.play();
            velo=shspeed * 8;
        }
    }
    loop();
}
let lastUpdateTime = performance.now();
const updateInterval = 1000 / 30;

function loop(currentTime){
    //reset
    const deltaTime = currentTime - lastUpdateTime;
    //console.log(currentTime);

    if (deltaTime >= updateInterval) {
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    scorediv.innerHTML=score;
    //drawbg
    ctx.drawImage(star,sx,sy);
    ctx.drawImage(star,sx2,sy2);

    ctx.drawImage(moutain,mx,my);
    ctx.drawImage(moutain,mx2,my2);
    //drawSheep
    ctx.drawImage(sheep,x,y);
    //pipe
    ctx.drawImage(pipe,pipex,pipey-512-pipegap,pipewidth,pipeheight);  
    ctx.drawImage(pipe,pipex,pipey+pipegap,pipewidth,pipeheight);  

    ctx.drawImage(pipe,pipex2,pipey2-512-pipegap2,pipewidth,pipeheight);  
    ctx.drawImage(pipe,pipex2,pipey2+pipegap2,pipewidth,pipeheight);   
        //move
        if(pipex<-64){
            plus=true;
            pipex=640;
            if(pipegap>=70){pipegap-=1; }
            pipey=Math.floor(Math.random() * (canvas.height));
            if(pipey<pipegap){
                pipey+=pipegap;
            }else if(pipey>(canvas.height-pipegap)){
                pipey-=pipegap;
            }
            
        }
        if(pipex2<-64){
            pipex2=640;
            plus2=true;
            if(pipegap2>=70){ pipegap2-=2;}
            pipey2=Math.floor(Math.random() * (canvas.height));
            if(pipey2<pipegap2){
                pipey2+=pipegap2;
            }else if(pipey2>(canvas.height-pipegap2)){
                pipey2-=pipegap2;
            }
        }
    
        if(sx<= -640){
            sx=640;
        }if(sx2<= -640){
            sx2=640;
        }
    
        if(mx<=-640){
            mx=640;
        }if(mx2<= -640){
            mx2=640;
        }
        //collisionCheck
        if(hitted()){
            endmenu();
            return;
        }
        plusscore();
        //sheepFly
        
        //console.log(velo);
        if(velo>0){
            sheep.src="asset/sheep2.PNG";
        }else{
            sheep.src="asset/sheep1.PNG";
        }
        pipex-=1.5 * 8;
        pipex2-=1.5 * 8;
        mx-=0.2 * 8;
        mx2-=0.2 * 8;
        sx-=0.1 * 8;
        sx2-=0.1 * 8;
        velo+=acc * 8;
        y+=velo * 8;
    lastUpdateTime = currentTime;
    }
    /*
    pipex-=1.5;
    pipex2-=1.5;
    mx-=0.2;
    mx2-=0.2;
    sx-=0.1;
    sx2-=0.1;
    velo+=acc;
    y+=velo;
    */
    requestAnimationFrame(loop);

}
function soundsheep(){
    hidemenu();
    reset();
    loop();
    return;
}
rebtn.addEventListener('click',showconsole);
//st

stbtn.addEventListener('click',hidconsole);
document.body.onkeyup = function(e){
    if(e.code=="KeyS"){
        hidconsole();
        
    }
}
