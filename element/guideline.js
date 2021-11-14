export class Guideline{
    constructor(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.length = stageWidth/30;
    }

    draw(ctx, onLeft, ball_type,cannon, angle, on_gauge){
        //공 발사 위치
        if(onLeft == false){
        this.startX = cannon.x+this.stageWidth/13+ this.length*Math.cos(angle)*3/2;
        this.startY = cannon.y - this.length*Math.sin(angle)*3/2;
        this.arriveX = this.startX + this.length*Math.cos(angle)/2;
        this.arriveY = this.startY - this.length*Math.sin(angle)/2;
        this.sideX1 = cannon.x + this.stageWidth/13 + this.length*Math.cos(angle+Math.PI/6);
        this.sideY1 = cannon.y - this.length*Math.sin(angle+Math.PI/6);
        this.sideX2 = cannon.x + this.stageWidth/13 + this.length*Math.cos(angle-Math.PI/6);
        this.sideY2 = cannon.y - this.length*Math.sin(angle-Math.PI/6);}
        else if(onLeft ==true){
        this.startX = cannon.x + this.length*Math.cos(angle)*3/2;
        this.startY = cannon.y - this.length*Math.sin(angle)*3/2;
        this.arriveX = this.startX + this.length*Math.cos(angle)/2;
        this.arriveY = this.startY - this.length*Math.sin(angle)/2;
        this.sideX1 = cannon.x + this.length*Math.cos(angle-Math.PI/6);
        this.sideY1 = cannon.y - this.length*Math.sin(angle-Math.PI/6);
        this.sideX2 = cannon.x + this.length*Math.cos(angle+Math.PI/6);
        this.sideY2 = cannon.y - this.length*Math.sin(angle+Math.PI/6);
        }
       //위 삼각형
        if(ball_type ==1){
            ctx.fillStyle = 'rgba(14,39,168,0.6)';}
        if(ball_type ==2){
            ctx.fillStyle = 'rgba(49,79,63,0.6)';}
        if(ball_type ==3){
            ctx.fillStyle = 'rgba(177,57,37,0.6)';}
       
        ctx.beginPath();
        ctx.setLineDash([0]);
        ctx.lineJoin = 'round';
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.arriveX, this.arriveY);
        ctx.lineTo(this.sideX1, this.sideY1);
        ctx.lineTo(this.startX, this.startY);
        ctx.fill();
        ctx.closePath();
       //아래 삼각형
        if(ball_type ==1){
            ctx.fillStyle = 'rgba(14,39,168,0.3)';}
        if(ball_type ==2){
            ctx.fillStyle = 'rgba(49,79,63,0.3)';}
        if(ball_type ==3){
            ctx.fillStyle = 'rgba(177,57,37,0.3)';}
       
        ctx.beginPath();
        ctx.setLineDash([0]);
        ctx.lineJoin = 'round';
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.arriveX, this.arriveY);
        ctx.lineTo(this.sideX2, this.sideY2);
        ctx.lineTo(this.startX, this.startY);
        ctx.fill();
        ctx.closePath();
    }
}