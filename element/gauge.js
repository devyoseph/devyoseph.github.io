export class Gauge{
    constructor(cannon, stageHeight){
        this.x = cannon.x;
        this.y = cannon.y - stageHeight/20;
    }
    draw(ctx, ball_type,cannon,on_gauge, gauge_percent, stageWidth, stageHeight){
        this.width = stageWidth/16;
        this.height = stageHeight/80;
        this.on_gauge = on_gauge;
        this.ball_type = ball_type;
        //총 계산식
        this.present_gauge = gauge_percent*0.01*this.width;
        
        if(this.on_gauge == true){
        ctx.fillStyle = 'ivory';
        ctx.fillRect(cannon.x, this.y, this.width, this.height);
        
        if(ball_type ==1){
        ctx.fillStyle = 'blue';
        ctx.fillRect(cannon.x, this.y, this.present_gauge, this.height);}
        if(ball_type ==2){
            ctx.fillStyle = 'green';
            ctx.fillRect(cannon.x, this.y, this.present_gauge, this.height);}
        if(ball_type ==3){
            ctx.fillStyle = 'red';
            ctx.fillRect(cannon.x, this.y, this.present_gauge, this.height);}
    }    
    }
}