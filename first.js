import{Boss}from'./element/boss.js';
import{Withboss}from'./element/withboss.js';
import{BossAttack}from'./element/bossattack.js';
import{Ball}from'./element/ball.js';
import{Gauging}from'./element/gauging.js';
let balls = [];
class First{
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.canvas.className = 'first';
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
        window.requestAnimationFrame(this.animate.bind(this));
        this.boss = new Boss(this.stageWidth, this.stageHeight);
        this.bossAttack = new BossAttack(this.stageWidth,this.stageHeight);
        this.withBoss = new Withboss(this.stageWidth, this.stageHeight);
        this.gauging = new Gauging(this.stageWidth, this.stageHeight);
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        this.canvas.width = this.stageWidth*2;
        this.canvas.height = this.stageHeight*2;
        this.ctx.scale(2,2);
    }

    animate(t){
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0,this.stageWidth, this.stageHeight);
        this.bossAttack.draw(this.ctx, this.boss);
        this.boss.draw(this.ctx);
        this.withBoss.draw(this.ctx);

        if(this.bossAttack.push == true){
            for(let i=0; i<12; i++){
                var ball = new Ball(true, this.stageWidth/10, 4, 2, 2.5,this.bossAttack.x+this.bossAttack.radius_b*Math.cos(Math.PI*i/6), this.bossAttack.y+this.bossAttack.radius_b*Math.sin(Math.PI*i/6), Math.PI*i/6, this.stageWidth, this.stageHeight)
            balls.push(ball);
            }
            this.bossAttack.push = false;
        }
        balls.forEach((ball_each, i, o) =>{
            ball_each.draw(this.ctx, this.stageWidth, this.stageHeight, true);
            if(ball_each.speed < 15 || ball_each.ball_meet == true){
                o.splice(i,1);}
        })

        this.gauging.draw(this.ctx, true, this.withBoss.movingX, this.withBoss.movingY, 4, 2);
    }

}

window.onload = () =>{
    new First();
}