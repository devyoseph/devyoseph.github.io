export class Gauging{
    constructor(stageWidht, stageHeight){
        this.stageWidht = stageWidht;
        this.stageHeight = stageHeight;
        this.angle = 0;
        this.angle_move = Math.PI/12;
        //공이 도는 반경
        this.radius = 0;
    }

    draw(ctx, onLeft,cannonX, cannonY, ball_type, ball_magnitude){
        //ball과 값 맞추기
         if(onLeft == false){
         this.x = cannonX + this.stageWidht/13;}
         if(onLeft == true){
         this.x = cannonX;
         }
         this.y = cannonY;
        //잔상 개수
         this.shadow = 10;

        if(ball_magnitude ==1){
            this.radius = this.stageWidht/80;
            
           for(let i=0; i<this.shadow; i++){
        switch(ball_type){
            case 1: ctx.fillStyle = 'rgba(48,86,149,0.2)'; break;
            case 2: ctx.fillStyle = 'rgba(69,135,77,0.2)'; break;
            case 3: ctx.fillStyle = 'rgba(124,31,24,0.2)'; break;
        }
            ctx.beginPath();
            ctx.arc(this.x+this.radius*Math.cos(this.angle+i*this.angle_move), this.y+this.radius*Math.sin(this.angle+i*this.angle_move), this.stageHeight/100, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
           }
        }

        if(ball_magnitude ==2){
            this.radius = this.stageWidht/45;
            
           for(let i=0; i<this.shadow; i++){
            switch(ball_type){
                case 1: ctx.fillStyle = 'rgba(48,86,149,0.2)'; break;
                case 2: ctx.fillStyle = 'rgba(69,135,77,0.2)'; break;
                case 3: ctx.fillStyle = 'rgba(124,31,24,0.2)'; break;
                case 4: ctx.fillStyle = 'rgba(255,255,255,0.1)'; break;
            }
            ctx.beginPath();
            ctx.arc(this.x+this.radius*Math.cos(this.angle+i*this.angle_move), this.y+this.radius*Math.sin(this.angle+i*this.angle_move), this.stageHeight/75, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
           }
        }

        if(ball_magnitude ==3){
            this.radius = this.stageWidht/20;
            
           for(let i=0; i<this.shadow; i++){
            switch(ball_type){
                case 1: ctx.fillStyle = 'rgba(48,86,149,0.2)'; break;
                case 2: ctx.fillStyle = 'rgba(69,135,77,0.2)'; break;
                case 3: ctx.fillStyle = 'rgba(124,31,24,0.2)'; break;
                case 4: ctx.fillStyle = 'rgba(255,255,255,0.1)'; break;
            }
            ctx.beginPath();
            ctx.arc(this.x+this.radius*Math.cos(this.angle+i*this.angle_move), this.y+this.radius*Math.sin(this.angle+i*this.angle_move), this.stageHeight/40, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
           }
        }

        
        this.angle += this.angle_move;
    }
}