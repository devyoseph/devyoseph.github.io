export class Ball{
    constructor(onLeft, cannonWidth,type, magnitude, gauge_transfer,cannonX, cannonY, angle, stageWidth, stageHeight){
        //좌우 판별
        this.onLeft = onLeft;
        this.cannonWidth = cannonWidth;
        //공의 타입에 따라 세기가 달라진다
        this.g = 9.81;
        this.magnitude = magnitude;
        this.gauge_transfer = gauge_transfer;
        this.angle = angle;
        this.stageWidth =stageWidth;
        this.stageHeight = stageHeight;
        //brick과 부딪힐 때 사용
        this.ball_meet = false;
        
        if(onLeft == true){
        this.cannonX = cannonX;
        this.cannonY = cannonY;
        this.x = this.cannonX;
        this.y = this.cannonY;
    }    
        if(onLeft == false){
        this.cannonX = cannonX;
        this.cannonY = cannonY;
        this.x = this.cannonX+this.stageWidth/13;
        this.y = this.cannonY;    
    }

        switch(type){
            case 1: this.type = 1; break;
            case 2: this.type = 2; break;
            case 3: this.type = 3; break;
        }
        switch(this.magnitude){
            case 1:  this.mass = 10;
                     this.radius = this.stageWidth/80;
                     break;
            case 2:  this.g = 6.5;
                     this.radius = this.stageWidth/35;
                     break;
            case 3:  this.g = 4.8;
                     this.radius = this.stageWidth/15;
                     break;
        }
        this.diameter = this.radius*2;
        this.speed = (this.stageWidth/60)*this.gauge_transfer;
        this.vx = this.speed * Math.cos(angle);
        this.vy = -this.speed * Math.sin(angle);

    }
    draw(ctx, stageWidth, stageHeight, onBoss){
        //중력가속도
        this.vy += this.g/160;
        this.x += this.vx;
        this.y += this.vy;
        //포탄을 배열에서 회수하기위한 스피드 변수 측정
        this.speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
        this.bounceWindow(stageWidth,stageHeight);
        if(this.type == 1){
        ctx.fillStyle = 'blue';
        }else if(this.type == 2){
        ctx.fillStyle = 'green';    
        }else if(this.type == 3){
        ctx.fillStyle = 'red';
        }else{
        ctx.fillStyle = 'rgba(217,239,169,0.7)';
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
    }

    bounceWindow(stageWidth,stageHeight){
        const minX = this.radius;
        const maxX = stageWidth-this.radius;
        const minY = this.radius;
        const maxY = stageHeight-this.radius;

        //벽에 부딪힐 때 속도 감소
        if(this.x <= minX || this.x >= maxX){
            this.vx *= -0.90;
            this.vy *= 0.87;
            this.x += this.vx;
        //바닥
        } else if(this.y >= maxY){
            this.vy *= -0.75;
            this.vx *= 0.7; 
            this.y += this.vy;
        //천장
        } else if(this.y <= minY){
            this.vy *= -0.97;
            this.vx *= 0.9; 
            this.y += this.vy;
        }
    }

    bounceBrick(brick){
        if(this.y-this.radius >= brick.y){
            this.y *= -1;
        }
    }

}