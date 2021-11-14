export class Start{
    constructor(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.width = this.stageWidth/3;
        this.height = this.stageHeight/10;
        this.x = (this.stageWidth-this.width)/2;
        this.y = (this.stageHeight-this.height)/2;
        this.centerX = this.x + this.width/2;
        this.centerY = this.y + this.height/2;
    }

    draw(ctx, onGame, start_hover){
        this.start_hover = start_hover;
        if(onGame == false){

        if(start_hover == false){
        ctx.fillStyle = 'ivory';
        ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
        
        ctx.fillStyle = 'gray';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.font = "120px gothic";
        ctx.textAlign = "center";
        ctx.verticalAlign = "end";
        ctx.strokeText("START", this.centerX, this.centerY);}
        if(start_hover == true){
            ctx.fillStyle = 'ivory';
            ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x, this.y, this.width, this.height);}

        }
    }

}