export class Teleport{
    constructor(stageWidth, stageHeight){
        this.stageWidth =stageWidth;
        this.stageHeight = stageHeight;
        this.teleport_timer = 0;
    }

    draw(ctx, teleportX, cannon_X,cannon_Y, cannon_W, cannon_H){
        this.width = cannon_W;
        this.height = cannon_H/2;
        this.x = teleportX + this.width/2;
        this.y = cannon_Y+this.height*5/6;
        this.cannon_X = cannon_X;
        
        if(this.teleport_timer <=7){
        ctx.beginPath();
        ctx.fillStyle = 'rgba(156,222,234,0.2)';
        ctx.arc(this.x, this.y, this.width, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        }
        
        if(this.teleport_timer<=14){
        ctx.beginPath();
        ctx.fillStyle = 'rgba(93,133,192,0.3)';
        ctx.arc(this.x, this.y, this.width*2/3, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        }

        if(this.teleport_timer <=21){
        ctx.beginPath();
        ctx.fillStyle = 'rgba(53,99,203,0.4)';
        ctx.arc(this.x, this.y, this.width*1/3, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        }
        this.teleport_timer++;
    }
}