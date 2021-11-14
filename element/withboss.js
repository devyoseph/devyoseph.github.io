//cannon부분을 가져왔다
let img_cannon = new Image();
        img_cannon.src = 'image/wizard.png';
export class Withboss{
    constructor(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.cannon_width = stageWidth/15;
        this.cannon_height = stageHeight/5;
        this.x = stageWidth/12; 
        this.y = stageHeight - (this.cannon_height  + stageHeight/20);
        this.angle = 0;
        this.radius = stageWidth/80;
    }

    draw(ctx){
        this.angle += Math.PI/40;
        this.movingX = this.x + this.radius*Math.cos(this.angle);
        this.movingY = this.y + this.radius/2*Math.sin(this.angle);        
        ctx.drawImage(img_cannon, this.movingX, this.movingY, this.cannon_width, this.cannon_height);
    }
}