export class Text{
    constructor(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight =stageHeight;
        this.timer = 0;
        this.wait = true;
    }
    draw(ctx, wait_timer, type, stage_level){
        //type 1은 시작, 2는 종료
        if(wait_timer >=130){
              this.wait = false;
        }
        if(type ==1){
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillRect(0,0,this.stageWidth,this.stageHeight);

            ctx.font = "100px gothic";
            ctx.textAlign = "center";
            ctx.fillStyle = 'rgba(241,215,91, 0.8)';
            ctx.fillText("",this.stageWidth/2, this.stageHeight/2);
            
            if(stage_level == 1){
                ctx.fillText("STAGE 1",this.stageWidth/2, this.stageHeight/2);
            }
            if(stage_level == 2){
                ctx.fillText("STAGE 2",this.stageWidth/2, this.stageHeight/2);
            }
            if(stage_level == 3){
                ctx.fillText("STAGE 3",this.stageWidth/2, this.stageHeight/2);
            }
            if(stage_level >= 4){
                ctx.fillText("STAGE ∞",this.stageWidth/2, this.stageHeight/2);
            }
        }
        if(type ==2){
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.fillRect(0,0,this.stageWidth,this.stageHeight);

            ctx.font = "100px gothic";
            ctx.textAlign = "center";
            ctx.fillStyle = 'rgba(241,215,91, 0.8)';
            ctx.fillText("CLEAR",this.stageWidth/2, this.stageHeight/2);

            }
        
        
        
        
    }
}