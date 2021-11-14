export class Mana{
    constructor(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.width = stageWidth*8/9;
        this.height = stageHeight/19;
        this.x = (this.stageWidth-this.width)/2;
        this.y = this.stageHeight/80;
        //깜빡거리는 타이머
        this.timer_gap = 40;
        this.timer = 0;
    }

    draw(ctx, mana_now, on_gauge, mana_consumption){
        if(mana_now == 100){
            this.mana_past = mana_now;
        }
        if(mana_now < this.mana_past && this.mana_past>0){
            this.mana_past -= 0.2;
        }
        //마나를 나타내기 위한 비율
        let ratio = this.mana_past/100;
        let width_changing = ratio*this.width;
        let glitterX = this.x+(mana_now-mana_consumption)*this.width/100;
        let glitterWidth = (mana_consumption/100)*this.width

        if(this.timer <= this.timer_gap){
            this.timer ++;
        }
        if(this.timer == this.timer_gap){ this.timer =0;}

        ctx.fillStyle = 'rgba(87,131,207, 0.9)';
        ctx.fillRect(this.x, this.y, width_changing, this.height);
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(87,131,207)';
        ctx.lineWidth = '4';
        ctx.setLineDash([0]);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.closePath();   
        if(on_gauge == true && this.timer>this.timer_gap/2){
            ctx.clearRect(glitterX, this.y+2, glitterWidth, this.height-4);
        }
    }
}