export class Button{
    constructor(stageWidth, stageHeight){
        this.stageHeight=stageHeight;
        this.stageWidth=stageWidth;
        this.radius=stageWidth/40;

        this.x1 = stageWidth/15;
        this.y1 = stageHeight*3/4;
       
        this.x2 = this.x1+stageWidth/6;
        this.y2 = this.y1;

        this.x3 = (this.x1+this.x2)/2;
        this.y3 = this.y1+(this.x1-this.x2)/2;

        this.x4 = (this.x1+this.x2)/2;
        this.y4 = this.y1-(this.x1-this.x2)/2;

        this.x5 = (this.x1+this.x2)/2;
        this.y5 = (this.y3+this.y4)/2;

        this.fireX = 4*stageWidth/5;
        this.fireY = 3*stageHeight/5;
        this.fireWidth = stageWidth-this.fireX;
        this.fireHeight = 6*stageHeight/7 - this.fireY;
    }

    draw(ctx){
        ctx.fillStyle = 'rgba(255,55,0,0.1)';
        ctx.fillRect(this.fireX, this.fireY, this.fireWidth, this.fireHeight);

        ctx.font = "20px gothic";
        ctx.textAlign = "center";
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillText("fire",(this.fireX+this.fireWidth/2), (this.fireY+this.fireHeight/2));



        ctx.fillStyle = 'rgba(0,0,0,0.23)';
        ctx.beginPath();
        ctx.arc(this.x1, this.y1, this.radius, 0, 2*Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x2, this.y2, this.radius, 0, 2*Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x3, this.y3, this.radius, 0, 2*Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x4, this.y4, this.radius, 0, 2*Math.PI);
        ctx.fill();

        ctx.fillStyle = 'rgba(241,215,91, 0.2)';
        ctx.beginPath();
        ctx.arc(this.x5, this.y5, this.radius/2, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.fill();
    }
}