// console.log(gsap);
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.querySelector("#scoreEl");
const startGameBtn = document.querySelector("#startGameBtn");
const modalEl = document.querySelector("#modalEl");
const bigScoreEl = document.querySelector("#bigScoreEl");

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
let name = localStorage.getItem('name');
const display = document.getElementById('display');

document.getElementById("name_2").innerHTML = `Hey, ${name}`;


class Player{
    constructor(x,y,radius,color){

        this.x =x ;
        this.y = y;
        this.radius = radius;
        this.color = color;
        
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI *2,false);
        c.fillStyle = this.color;
        c.fill();
    }
    leftRight(){
        if(this.x < canvas.width)
        this.x +=  10;
    }
    rightLeft(){
        if(this.x > 0)
        this.x -= 10;
    }
    upDown(){
        if(this.y > 0)
        this.y -= 10;
    }
    downUp(){
        if(this.y < canvas.height)
        this.y += 10;
    }
    currentPosition(){
        return [this.x,this.y];
    }
}

class Projectile{
    constructor(x,y,radius,color,velocity){
        this.x =x ;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI *2,false);
        c.fillStyle = this.color;
        c.fill();
    }
    upadate(){
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y; 
    }
}
// let power = 1.1;
class Enemy{
    constructor(x,y,radius,color,velocity){
        this.x =x ;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI *2,false);
        c.fillStyle = this.color;
        c.fill();
    }
    upadate(){
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y; 
        // this.velocity.x *= power; 
        // this.velocity.y *= power; 
    }
}
class Bonus{
    constructor(x,y,radius,color,velocity){
        this.x =x ;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI *2,false);
        c.fillStyle = this.color;
        c.fill();
    }
    upadate(){
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y; 
        // this.velocity.x *= power; 
        // this.velocity.y *= power; 
    }
}
const fraction = 0.99;
class Particle{
    constructor(x,y,radius,color,velocity){
        this.x =x ;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }
    draw(){
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI *2,false);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }
    upadate(){
        this.draw();
        this.velocity.x *= fraction;
        this.velocity.y *= fraction; 
        this.x += this.velocity.x;
        this.y += this.velocity.y; 
        this.alpha -= 0.01; 
    }
}

let x = canvas.width/2;
let y = canvas.height/2;
let player = new Player(x,y,10,'antiquewhite');


let projectiles = [];
let enemies = [];
let particles = [];

function init(){
    let mode = localStorage.getItem('theme');
    console.log(mode);
    if(mode == null){
        player = new Player(x,y,10,'antiquewhite');
        localStorage.setItem('theme','antiquewhite');
    }
    else{
        player = new Player(x,y,10,mode);
    }
    
    projectiles = [];
    enemies = [];
    particles = [];
    bonuses = [];
    score = 0;
    scoreEl.innerHTML = score;
    bigScoreEl.innerHTML = score;
}
function spawnEnemies(){
    setInterval(() => {
        p = player.currentPosition();
        const radius = Math.random() * (30 -6) + 6
        let x
        let y
        if(Math.random() < 0.5){
        const radius =  30
         x = Math.random() < 0.5 ? 0 - radius :canvas.width + radius;
         y = Math.random() * canvas.height;
        }
        else{
            x = Math.random() * canvas.width;
         y = Math.random() < 0.5 ? 0 - radius :canvas.height + radius;
        }
        const color = `hsl(${Math.random() * 360}, 50% , 50%)`
        const angle = Math.atan2(-y + p[1] ,-x + p[0])
    const velocity = {
        x:Math.cos(angle) *2*(1 + (score*0.002)),
        y:Math.sin(angle)*2*( 1 + (score*0.002)),
    }
        enemies.push(new Enemy(x,y,radius,color,velocity));
        // console.log(enemies);
    },1000)
}
// let time = 0;
function callBonus(){
    setInterval(() => {
        p = player.currentPosition();
        const radius = 15;
        let x
        let y
        if(Math.random() < 0.5){
        const radius =  30
         x = Math.random() < 0.5 ? 0 - radius :canvas.width + radius;
         y = Math.random() * canvas.height;
        }
        else{
            x = Math.random() * canvas.width;
         y = Math.random() < 0.5 ? 0 - radius :canvas.height + radius;
        }
        const color = `white`;
        const angle = Math.atan2(-y + p[1] ,-x + p[0])
        const velocity = {
            x:Math.cos(angle) *3*(1 + (score*0.002)),
            y:Math.sin(angle)*3*( 1 + (score*0.002)),
        }
        bonuses.push(new Bonus(x,y,radius,color,velocity));
    }, 4000 + Math.random()*1000);
}
let animationId;
let score = 0;
document.onkeydown = function(e){
    if(e.keyCode == 40){
        player.downUp();
    }
    if(e.keyCode == 39){
        player.leftRight();
    }
    if(e.keyCode == 38){
        player.upDown();
    }
    if(e.keyCode == 37){
        player.rightLeft();
    }
}
function animate(){
    animationId =  requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0,0,0,0.1)';
    c.fillRect(0,0,canvas.width,canvas.height);
    player.draw();
    particles.forEach((particle,index) =>{
        if(particle.alpha <= 0){
            particles.splice(index,1)
        }
        else{
            particle.upadate();
        }
        
    })
   projectiles.forEach((projectile,index) => {
       projectile.upadate()
       //remove form edges of screen
       if(projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y  + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height){
        setTimeout(() => {
            // enemies.splice(index,1);
            projectiles.splice(index,1);
        },0)
       }
   })
    bonuses.forEach((bonus,index) => {
       bonus.upadate()
       //remove form edges of screen
       if(bonus.x + bonus.radius < 0 || bonus.x - bonus.radius > canvas.width || bonus.y  + bonus.radius < 0 || bonus.y - bonus.radius > canvas.height){
        setTimeout(() => {
            // enemies.splice(index,1);
            bonuses.splice(index,1);
        },0)
       }
       const dist =  Math.hypot(player.x - bonus.x, player.y - bonus.y);
       if(dist - bonus.radius - player.radius < 1){
           score += 40;
           scoreEl.innerHTML = score;
           bonus.radius = 0;
           bonuses.splice(index,1); 
       }
   })
   enemies.forEach((enemy ,index) => {
       enemy.upadate();
       const dist =  Math.hypot(player.x - enemy.x, player.y - enemy.y)
       // end game
       if(dist - enemy.radius - player.radius < 1){
            cancelAnimationFrame(animationId);
            audiogo.play();
            setTimeout(() => {
                audiogo.pause();
                audio.pause();
            }, 1000);
            modalEl.style.display = 'flex';
            modalEl.style.backgroundColor = 'aliceblue';
            bigScoreEl.innerHTML = score;
            let hieghestScore = localStorage.getItem('score');
            // console.log(hieghestScore);
            if(hieghestScore != null){
                hieghestScore = JSON.parse(hieghestScore);
                
                let i = 0;
                while (i<hieghestScore.length) {
                    if(score > parseInt(hieghestScore[i])){
                        
                        if(i == 0){
                            if(hieghestScore.length == 1){
                                let p = hieghestScore[i];
                                hieghestScore[i] = score;
                                hieghestScore.push(p);
                                hieghestScore.push(0);
                            }
                            else if(hieghestScore.length == 2){
                                let  p = hieghestScore[i];
                                let q = hieghestScore[i+1];
                                hieghestScore[i] = score;
                                hieghestScore[i+1] = p;
                                hieghestScore.push(q);
                            }
                            else{
                                hieghestScore[i] = score;
                                let p = hieghestScore[i];
                                let q = hieghestScore[i+1];
                                hieghestScore[i] = score;
                                hieghestScore[i+1] = p;
                                hieghestScore[i+2] = q;
                            }
                        }
                        else if(i == 1){
                            if(hieghestScore.length == 2){
                                let p = hieghestScore[i];
                                hieghestScore[i] = score;
                                hieghestScore.push(p);
                            }
                            else{
                                hieghestScore[i] = score;
                            }
                        }
                        else if(i == 2){
                            hieghestScore[i] = score;
                        }
                        break;
                    }
                    i += 1; 
                }
                if(hieghestScore.length == 1){
                    hieghestScore.push(score);
                    hieghestScore.push(0);
                }
                else if(hieghestScore.length == 2){
                    hieghestScore.push(score);
                }
                localStorage.setItem('score',JSON.stringify(hieghestScore));
            }
            else{
                hieghestScore = [score,0,0];
                localStorage.setItem('score',JSON.stringify(hieghestScore));
            }
            // hieghestScore = localStorage.getItem('Score');
            // display.innerHTML = `Heighest socre is : ${hieghestScore}`;
       }
       projectiles.forEach((projectile,ProjectileIndex) => {
        const dist =  Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
        if(dist - enemy.radius - projectile.radius < 1){

            //increase the score 
            for (let i = 0; i < enemy.radius *2; i++) {
                particles.push(new Particle(projectile.x,projectile.y,Math.random() *2,enemy.color,
                    {
                        x:(Math.random() -0.5) * (Math.random() *5), 
                        y: (Math.random() -0.5) * (Math.random() *5) 
                    }))
            }
            if(enemy.radius - 10 > 5){
                // enemy.radius -= 10
                score += 5; 
                scoreEl.innerHTML = score;
                gsap.to(enemy,{
                    radius: enemy.radius -10
                })
                setTimeout(() => {
                    projectiles.splice(ProjectileIndex,1);
                },0)
            }
            else{
                //remove totally from the scene
                score += 10; 
                scoreEl.innerHTML = score;
                setTimeout(() => {
                    enemies.splice(index,1);
                    projectiles.splice(ProjectileIndex,1);
                },0)
            } 
        }
       })
   })
}

addEventListener('click',(event) => {
    p = player.currentPosition();
    const angle = Math.atan2(event.clientY - p[1],event.clientX - p[0])
    const velocity = {
        x:Math.cos(angle) * 3,
        y:Math.sin(angle) * 3,
    }
    
    // console.log(angle);
    // console.log(p);
    // console.log(canvas.width);
    // console.log(canvas.height);
    projectiles.push(new Projectile(p[0],p[1],5,"white",velocity))
    
})

startGameBtn.addEventListener('click',() =>{
    init();
    animate();
    spawnEnemies();
    callBonus();
    modalEl.style.display = 'none';
    setTimeout(() => {
        audio.play()
    }, 1000);
})
