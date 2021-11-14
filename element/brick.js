export class Brick{
        constructor(type, x, y, stageWidth, stageHeight, balls, brick_touch){
            this.type = type;
            this.x = x;
            this.y = y;
            this.stageWidth = stageWidth;
            this.stageHeight = stageHeight;
            this.brick_width = stageWidth/24;
            this.brick_height = stageHeight/20;
            this.border= stageWidth/1600;
        }
        draw(ctx, balls, brick_touch){
            this.brickCollision(balls, brick_touch);
            if(this.type ==1){
                ctx.fillStyle = 'brown';
                ctx.fillRect(this.x, this.y, this.brick_width, this.brick_height);
                ctx.fillStyle = 'red';
                ctx.fillRect(this.x+this.border, this.y+this.border, this.brick_width-this.border*2, this.brick_height-this.border*2);
            }
            if(this.type ==2){
                ctx.fillStyle = 'rgba(40, 71, 109)';
                ctx.fillRect(this.x, this.y, this.brick_width, this.brick_height);
                ctx.fillStyle = 'blue';
                ctx.fillRect(this.x+this.border, this.y+this.border, this.brick_width-this.border*2, this.brick_height-this.border*2);
            }
            if(this.type ==3){
                ctx.fillStyle = 'rgba(66, 86, 34)';
                ctx.fillRect(this.x, this.y, this.brick_width, this.brick_height);
                ctx.fillStyle = 'green';
                ctx.fillRect(this.x+this.border, this.y+this.border, this.brick_width-this.border*2, this.brick_height-this.border*2);
            }
        }
        //brick 타입: 1 = 불 / 2 = 물 / 3 = 식물
        brickCollision(balls, brick_touch){
            for(let i=0; i<balls.length; i++){
                let ballX = balls[i].x;
                let ballY = balls[i].y;
                let ballR = balls[i].radius;
                let minX = ballX - ballR;
                let maxX = ballX + ballR;
                let minY = ballY + ballR;
                let maxY = ballY - ballR;
                let minBX = this.x;
                let maxBX = this.x + this.brick_width;
                let maxBY = this.y+this.brick_height;
                let minBY = this.y 
                let ball_type = balls[i].type;
                //볼 타입 체크
                if((ball_type == 1 && this.type ==2) || (ball_type ==2 && this.type ==3) || (ball_type ==3 && this.type ==1)){
                    this.ball_meet = true;
                }
                //Y에 대해서
                if(this.type == ball_type){
                if(((minY >= minBY && maxY <= maxBY) && (ballX >= minBX && ballX <= maxBX))){
                    brick_touch = true;
                    this.type =0;
                }
                //X에 대해서
                if((maxX > minBX && minX < maxBX) && (ballY >= minBY && ballY <= maxBY)){
                    brick_touch =true;
                    this.type =0;
                   }
                }
            else if((ball_type == 1 && this.type ==2) || (ball_type ==2 && this.type ==3) || (ball_type ==3 && this.type ==1)){
                if(((minY >= minBY && maxY <= maxBY) && (ballX >= minBX && ballX <= maxBX))){
                    balls[i].vy *= -0.75;
                    brick_touch = true;
                    this.type =0;
                }
                if((maxX > minBX && minX < maxBX) && (ballY >= minBY && ballY <= maxBY)){
                    balls[i].vx *= -0.75;
                    brick_touch =true;
                    this.type =0;
                   }
                }
                else if((ball_type == 1 && this.type ==3) || (ball_type ==2 && this.type ==1) || (ball_type ==3 && this.type ==2)){
                    if(((minY >= minBY && maxY <= maxBY) && (ballX >= minBX && ballX <= maxBX))){
                        balls[i].ball_meet =true;
                    }
                    if((maxX >= minBX && minX <= maxBX) && (ballY >= minBY && ballY <= maxBY)){
                        balls[i].ball_meet =true;
                       }
                    }
            }
            }
}