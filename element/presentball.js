export class PresentBall{
    constructor(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.width = this.stageWidth/3;
        this.height = this.stageHeight/7;
        this.x = this.stageWidth - this.width;
        this.y = this.stageHeight - this.height;
    }

    draw(ctx, ball_type, ball_magnitude){
        this.ball_magnitude = ball_magnitude;
        this.ball_type = ball_type;
        let corner_radius = this.stageWidth/40;
        let small_width = this.width/4;
        let gap = (this.width-small_width*3)/4;
        //y값은 모두 같다
        let center_Y = this.y + this.height/2;
        let center_X1 = this.x + gap + small_width/2;
        let center_X2 = this.x + 2*gap + 3/2*small_width;
        let center_X3 = this.x + 3*gap + 5/2*small_width;

        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.clearRect(this.x, this.y, corner_radius, corner_radius);
        
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.arc(this.x+corner_radius, this.y+corner_radius, corner_radius, Math.PI, 3/2*Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.moveTo(this.x+corner_radius, this.y);
        ctx.lineTo(this.x+corner_radius, this.y+corner_radius);
        ctx.lineTo(this.x, this.y+corner_radius);
        ctx.lineTo(this.x+corner_radius, this.y);
        ctx.closePath();
        ctx.fill();

        if(this.ball_magnitude == 1){
            ctx.fillStyle = 'rgba(0,0,245,0.5)';
            ctx.beginPath();
            ctx.arc(center_X1, center_Y, this.stageWidth/120, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = 'rgba(55,126,34,0.5)';
            ctx.beginPath();
            ctx.arc(center_X2, center_Y, this.stageWidth/120, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = 'rgba(234,51,35,0.5)';
            ctx.beginPath();
            ctx.arc(center_X3, center_Y, this.stageWidth/120, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();
        }

        if(this.ball_magnitude == 2){
            ctx.fillStyle = 'rgba(0,0,245,0.5)';
            ctx.beginPath();
            ctx.arc(center_X1, center_Y, this.stageWidth/60, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = 'rgba(55,126,34,0.5)';
            ctx.beginPath();
            ctx.arc(center_X2, center_Y, this.stageWidth/60, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = 'rgba(234,51,35,0.5)';
            ctx.beginPath();
            ctx.arc(center_X3, center_Y, this.stageWidth/60, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();
        }

        if(this.ball_magnitude == 3){
            ctx.fillStyle = 'rgba(0,0,245,0.5)';
            ctx.beginPath();
            ctx.arc(center_X1, center_Y, this.stageWidth/30, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = 'rgba(55,126,34,0.5)';
            ctx.beginPath();
            ctx.arc(center_X2, center_Y, this.stageWidth/30, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = 'rgba(234,51,35,0.5)';
            ctx.beginPath();
            ctx.arc(center_X3, center_Y, this.stageWidth/30, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();
        }

        switch(ball_type){
            case 1: ctx.strokeStyle = 'rgba(230,222,203,0.2)';
                    ctx.beginPath();
                    ctx.setLineDash([0]);
                    ctx.lineWidth = "5";
                    ctx.strokeRect(center_X1-small_width/2,center_Y-this.height/2, small_width, this.height);
                    ctx.closePath();
                    break;
            case 2: ctx.strokeStyle = 'rgba(230,222,203,0.2)';
                    ctx.beginPath();
                    ctx.setLineDash([0]);
                    ctx.lineWidth = "5";
                    ctx.strokeRect(center_X2-small_width/2,center_Y-this.height/2, small_width, this.height);
                    ctx.closePath();
                    break;
            case 3: ctx.strokeStyle = 'rgba(230,222,203,0.2)';
                    ctx.beginPath();
                    ctx.setLineDash([0]);
                    ctx.lineWidth = "5";
                    ctx.strokeRect(center_X3-small_width/2,center_Y-this.height/2, small_width, this.height);
                    ctx.closePath();
                    break; 
        }
    }
}