export class BossAttack{
    constructor(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.timer = 0;
        this.pattern = 0;
        this.radius = this.stageWidth/40;
        //튕기는 공
        this.radius_b = this.radius/2;
        this.vx = this.stageWidth/20;
        this.vy = this.stageWidth/20;

        //배열에 값 넣기 변수
        this.push = false;
    }

    draw(ctx, boss){
        this.x = boss.movingX+this.stageWidth/11;
        this.y = boss.movingY;
        this.ballX += this.vx;
        this.ballY += this.vy;
        if(this.pattern == 0){
            this.timer ++;
        
        if(this.timer >= 150){
            this.radius = this.stageWidth/40;
            ctx.fillStyle = 'rgba(217,239,169,0.2)';
            if(this.timer >= 160){
                this.radius = this.stageWidth/35;
                ctx.fillStyle = 'rgba(217,239,169,0.3)';}
            if(this.timer >= 170){
                this.radius = this.stageWidth/30;
                ctx.fillStyle = 'rgba(217,239,169,0.4)';}
            if(this.timer >= 180){
                this.radius = this.stageWidth/25;
                ctx.fillStyle = 'rgba(217,239,169,0.5)';}
            if(this.timer >= 190){
                this.radius = this.stageWidth/20;
                ctx.fillStyle = 'rgba(217,239,169,0.6)';}
            if(this.timer >= 200){
                this.radius = this.stageWidth/15;
                ctx.fillStyle = 'rgba(217,239,169,0.6)';}
            if(this.timer >= 200 && this.timer%3 ==0){
                this.radius = this.stageWidth/13;
                ctx.clearRect(0,0,this.stageWidth, this.stageHeight);}
            if(this.timer >= 300){
                this.radius = this.stageWidth/10;
                ctx.fillStyle = 'rgba(217,239,169,0.7)';}
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2 );
            ctx.fill();
            ctx.closePath();
            
            if(this.timer ==330){
                this.timer = 0;
                this.push = true;
            }}}
           
            }
            
        

        }
