
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const btn = document.getElementById('btn');
const inpTime = document.getElementById('time');

const fps = 50;
let clk = 1;
let timeInterval;

const getBall = () => ({
    x: 0,
    y: 0,
    w: 10,
    h: 10,
    time: 0,
    color: '#043532',
    direction: 'right',
    fw: 4,
    fh: 4,
    fx: 40,
    fy: 5,
    

    draw() {
        if(this.direction === 'right'){
            this.x++;
        }else if(this.direction === 'left'){
            this.x--;
        }else if(this.direction === 'top'){
            this.y--;
        }else if(this.direction === 'bottom'){
            this.y++;
        }

        /* if(this.x > canvas.width - 10) {
            this.direction = 'left';
        }else if(this.x < 0) {
            this.direction = 'right';
        }else if(this.y > canvas.height -10) {
            this.direction = 'top';
        }else if(this.y < 0) {
            this.direction = 'bottom';
        } */
        if(this.x > canvas.width - this.w  || 
            this.x < 0 || 
            this.y > canvas.height - this.h || 
            this.y < 0 || 
            this.x > canvas.width - (canvas.width * (75/100) + this.w) && 
            this.x < canvas.width - (canvas.width * (25/100)) && 
            this.y > canvas.height - (canvas.height * (75/100) + this.h) &&
            this.y < canvas.height - (canvas.height * (25/100) )
            ) {
            this.direction = '';
            canvas.style.backgroundColor = 'brown';
            clk = undefined;
            btn.style.display = 'block';
            /* inpTime.value = this.time; */
            clearInterval(timeInterval);
        }
        /* console.log(Math.floor(Math.random()*(canvas.height - this.fh)), Math.floor(Math.random()*(canvas.height * (25/100) - this.h))); */
        
        if(this.x <= this.fx && this.fx <= this.x+this.w && this.y <= this.fy && this.fy <= this.y+this.h  ) {
            this.w++;
            this.h++;
            this.fx = Math.floor(Math.random()* (canvas.width - this.fw));

            if(this.fx > canvas.width-canvas.width * (25/100) + this.fw || this.fx < canvas.width - canvas.width*(75/100)) {
                this.fy = Math.floor(Math.random()*(canvas.height - this.fh));
            }else{
                this.fy = Math.floor(Math.random()*(canvas.height * (25/100) - this.h));
            }
        }
        this.food();

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h)
    },
    food(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.fx, this.fy, this.fw, this.fh);
    },
    timer() {
        this.time++;
        inpTime.value = this.time;
    }
})

const ball = getBall();

ball.draw();
ball.food();

const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
}

setInterval(() => {
    requestAnimationFrame(update);
}, 400)

function timer() {
    timeInterval = setInterval(() => {
        ball.timer();
    }, 1000)
}
timer();

function reset() {
    ball.x = 0;
    ball.y = 0;
    ball.w = 10;
    ball.h = 10;
    ball.time = 0;
    ball.direction = 'right';
}

function direc(event) {
    var key = event.key;
    if(clk !== undefined){
        if(key === 'ArrowUp') ball.direction = 'top';
        else if(key === 'ArrowRight') ball.direction = 'right';
        else if(key === 'ArrowDown') ball.direction = 'bottom';
        else if(key === 'ArrowLeft') ball.direction = 'left';
    }
}

document.addEventListener("click", function() {
    clk++;
    if(clk === 1)ball.direction = 'right';
    else if(clk === 2)ball.direction = 'bottom';
    else if(clk === 3)ball.direction = 'left';
    else if(clk === 4)ball.direction = 'top';
    
    if(clk === 4) clk = 0;
})

btn.addEventListener("click", function() {
    clk = 0;
    reset();
    timer();
    canvas.style.backgroundColor = '';
    btn.style.display = '';
})
