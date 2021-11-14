let img_boss = new Image();
    img_boss.src = './image/boss.png';
export class Boss{
    constructor(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight =stageHeight;
        this.x = this.stageWidth*5/7;
        this.y = this.stageHeight*5/16;
        this.width = this.stageWidth*3/8;
        this.height = this.stageHeight*3/4;
        
        this.move_radius = this.stageWidth/40;
        this.move = 0;
    }

    draw(ctx){  
        this.move += Math.PI/80;
        this.movingX = this.x + this.move_radius*Math.cos(this.move);
        this.movingY = this.y + this.move_radius/4*Math.sin(this.move);
        ctx.drawImage(img_boss, this.movingX, this.movingY, this.width, this.height);
        
    }
}