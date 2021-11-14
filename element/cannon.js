let img_cannon = new Image();
        img_cannon.src = 'image/wizard.png';
let img_cannon2 = new Image();
        img_cannon2.src = 'image/wizard2.png';
export class Cannon{
    constructor(stageWidth, stageHeight){
        this.cannon_width = stageWidth/15;
        this.cannon_height = stageHeight/5;
        this.wheel_height = stageHeight/40;
        this.x = stageWidth/3; 
        this.y = stageHeight - (this.cannon_height + this.wheel_height + stageHeight/20);

    }
    draw(ctx, onLeft){
        if(onLeft == false){
        ctx.drawImage(img_cannon,this.x,this.y, this.cannon_width, this.cannon_height);}
        if(onLeft == true){
            ctx.drawImage(img_cannon2,this.x,this.y, this.cannon_width, this.cannon_height);}
    }


}