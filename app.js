import{Ball}from './element/ball.js';
import {Brick} from './element/brick.js';
import{Cannon}from './element/cannon.js';
import{Stage}from './element/stage.js';
import{Gauge}from './element/gauge.js';
import{Guideline}from './element/guideline.js';
import{PresentBall}from './element/presentball.js';
import { Teleport } from './element/teleport.js';
import { Mana } from './element/mana.js';
import{Text} from './element/text.js';
import{Gauging} from './element/gauging.js';
//대기
let wait_timer = 0;
let wait_load = false;
//각도 사용을 위한 PI 변수화
const PI = Math.PI;
//공 배열과 공 발사 변수
var balls = [];
var fire_ball = false;
//공의 타입과 속도
var ball_type = 1;
var ball_angle = PI/4;
var ball_magnitude = 1;
let on_aim  = false;
let angle_timer = 0;
let present_angle = 1;
let last_angle = 1;
//stage의 벽돌 배치 walls, stage레벨
let stage_clear = true; //처음에 true값을 주어 시작
let stage_level = 1;
var walls = []; //로드용
//벽돌
var bricks = [];
//게임이 진행중인가, 벽이 부서졌는가
let onGame= true;
let brick_touch = false;
//게이지
let on_gauge = false;
let gauge_full = false;
let gauge_percent = 0;
let gauge_transfer = 0;
//마법사의 움직임 통제
let cannon_angle = 0; 
let cannonFixY = 0;
let cannonFlyHeight = 0;
let onLeft = false;
//각도 방향유지를 위한 방향
let past_move = 1;
let present_move = 1;
//텔레포트(x)
let on_teleport = false;
let teleports = [];
let teleportX = 0;
//마나
let mana_now = 100;
let mana_consumption =0;
class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize(); //리사이즈가 이벤트를 거치지 않아도 발동하기 위함

        //대포 관련
        this.cannon = new Cannon(this.stageWidth, this.stageHeight);
        cannonFixY = this.cannon.y;
        cannonFlyHeight = this.stageHeight/150;
        document.addEventListener('keydown', this.cannonMove.bind(this), false);
        document.addEventListener('keydown', this.cannonAiming.bind(this), false);    
        //텔레포트
        document.addEventListener('keydown',this.teleportMove.bind(this), false);
        //공 관련
        document.addEventListener('keydown', this.fire_before.bind(this), false);
        document.addEventListener('keyup', this.fire_after.bind(this), false);
        document.addEventListener('keydown', this.shiftBallType.bind(this));
        document.addEventListener('keydown', this.shiftBallMagnitude.bind(this));
        //게이지모으기
        this.gauging = new Gauging(this.stageWidth, this.stageHeight);
        //가이드라인
        this.gauge = new Gauge(this.cannon, this.stageHeight);
        this.guideline = new Guideline(this.stageWidth, this.stageHeight);
        document.addEventListener('keydown', this.angleTurn.bind(this), false);
        window.requestAnimationFrame(this.animate.bind(this));
        //정보창
        this.present_ball = new PresentBall(this.stageWidth, this.stageHeight);
        this.mana = new Mana(this.stageWidth, this.stageHeight);
        this.text = new Text(this.stageWidth, this.stageHeight);
    }
    
    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        //캔버스는 두 배
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight *2;
        this.ctx.scale(2,2); //ctx scale 모두 두 배 주의
    }

    animate(t){
        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
        if(stage_clear === true){
                //시작화면 켜기
                    wait_load = true;
                //스테이지 로드
                this.stage = new Stage(stage_level, this.stageWidth, this.stageHeight);
                this.walls = this.stage.walls;
                this.walls_hor_X = this.stage.walls_hor_X;
                this.walls_hor_Y = this.stage.walls_hor_Y;
                
                //벽돌 배열 생성
                for(let i = 0; i < this.walls.length; i++){
                    for(let j = 0; j < this.walls[i].length; j++){
                        var brick = new Brick(this.walls[i][j],this.walls_hor_X[i][j],this.walls_hor_Y[i][j],
                                    this.stageWidth,this.stageHeight, balls, brick_touch);
                    bricks.push(brick);
                    }
                }
            mana_now = 100;
            stage_clear = false;
        }
            
        if(onGame == true){
        //상하운동
        if(on_gauge == false){
            cannon_angle += Math.PI/45;
            this.cannon.y = cannonFixY + cannonFlyHeight*Math.sin(cannon_angle) ;}
        //에임 가속도
        if(on_aim == true){
            angle_timer ++;
            on_aim =false;
        }
        //정보창
        this.present_ball.draw(this.ctx, ball_type, ball_magnitude);

        //게이지
        this.gauge.draw(this.ctx, ball_type,this.cannon,on_gauge,gauge_percent, this.stageWidth, this.stageHeight);
        if(on_gauge === true){
            cannon_angle = 0;
            this.guideline.draw(this.ctx, onLeft, ball_type,this.cannon, ball_angle, on_gauge);
            this.manaConsumption(ball_magnitude);
            this.gaugeMove();
        }
        
        if(on_gauge ==true){
            this.gauging.draw(this.ctx, onLeft,this.cannon.x, this.cannon.y, ball_type, ball_magnitude);
        }

        //마나창을 일부러 게이지 뒤로 뺀다
        this.mana.draw(this.ctx, mana_now, on_gauge, mana_consumption);
        //스테이지
        bricks.forEach((brick_each,i , o)=>{
            brick_each.draw(this.ctx, balls, brick_touch)
            
            if(brick_each.type == 0){
                o.splice(i,1);
            }
        })
        //공을 발사
        if(fire_ball === true){
            var ball =  new Ball(onLeft, this.cannon.cannon_width,ball_type, ball_magnitude, gauge_transfer,this.cannon.x, this.cannon.y, ball_angle, this.stageWidth, this.stageHeight);
            this.manaConsumption(ball_magnitude);
            mana_now -= mana_consumption;
            balls.push(ball);
            fire_ball = false;
            angle_timer = 0;
        } 
        balls.forEach((ball_each, i, o) =>{
            ball_each.draw(this.ctx, this.stageWidth, this.stageHeight);
            if(ball_each.speed < 0.2 || ball_each.ball_meet == true){
                o.splice(i,1);}
        })
        //텔레포트
        if(on_teleport == true){
            var teleport = new Teleport(this.stageWidth, this.stageHeight);
            teleports.push(teleport);
            on_teleport = false;
        }
        teleports.forEach((tele_each, i, o) =>{
            tele_each.draw(this.ctx, teleportX, this.cannon.x, this.cannon.y, this.cannon.cannon_width, this.cannon.cannon_height);
            if(tele_each.teleport_timer >= 21){
                o.splice(i,1);}
        })
        this.preventOut(this.cannon.x, this.cannon.cannon_width);


        //마법사: 최대한 뒤에 배치해 공이 뒤로 그려지도록 했다
        this.cannon.draw(this.ctx, onLeft);
        
        //시작 화면
        if(wait_load == true){
           wait_timer++;
           this.text.draw(this.ctx, wait_timer,1,stage_level);
           if(this.text.wait == false){
               wait_load = false;
               wait_timer = 0;
              this.text.wait = true;
          }
        }
        //클리어시 화면
        if(bricks.length == 0){
            wait_timer++;
           this.text.draw(this.ctx, wait_timer,2);
           if(this.text.wait == false){
               stage_clear = true;
               stage_level++;
               balls = [];
               wait_timer = 0;
               this.text.wait = true; 
          }
        }   
     }
    }
    cannonFly(cannonY, timer_angle  ){
        cannonY += Math.sin(timer_angle);
    }
    cannonMove(e){
        if(e.code === 'ArrowLeft' && onGame ==true){
            this.cannon.x -= this.stageWidth/100;
        }
        if(e.code === 'ArrowRight' && onGame ==true){
            this.cannon.x += this.stageWidth/100;
        }
    }
    teleportMove(e){
        if(e.code === 'KeyX' && present_move == 1){
            on_teleport = true;
            teleportX = this.cannon.x
            this.cannon.x += this.stageWidth/6;
        }
        if(e.code === 'KeyX' && present_move == -1){
            on_teleport = true;
            teleportX = this.cannon.x
            this.cannon.x -= this.stageWidth/6;
        }      
    }
    angleTurn(e){
        if(e.code === 'ArrowLeft' && onGame ==true){
            onLeft = true;
            past_move = present_move;
            present_move = -1;  
            if(past_move == 1 && present_move == -1){
            ball_angle = Math.PI - ball_angle;}
        }
        if(e.code === 'ArrowRight' && onGame ==true){
            onLeft = false;
            past_move = present_move;
            present_move = 1;
            if(past_move == -1 && present_move == 1){
            ball_angle = Math.PI - ball_angle;}
        }
    }

    cannonAiming(e){
        if(e.code === 'ArrowUp' && onGame ==true){
            last_angle = present_angle;
            present_angle = 1;
            if(last_angle*present_angle==1){
                on_aim =  true;}
            if(last_angle*present_angle==-1){
                angle_timer = 0;}
            ball_angle += PI/180;
            
            if(angle_timer >=3 ){
                ball_angle += PI/90;
            }
            if(angle_timer >=6 ){
                ball_angle += PI/45;
            }
            if(angle_timer >=9 ){
                ball_angle += PI/20;
            }
        }
        if(e.code === 'ArrowDown' && onGame ==true){
            last_angle = present_angle;
            present_angle = -1;
            if(last_angle*present_angle==1){
            on_aim =  true;}
            if(last_angle*present_angle==-1){
                angle_timer = 0;}
            ball_angle -= PI/180;
            
            if(angle_timer >=3 ){
                ball_angle -= PI/90;
            }
            if(angle_timer >=6 ){
                ball_angle -= PI/45;
            }
            if(angle_timer >=9 ){
                ball_angle -= PI/20;
            }
        }
    }

    fire_before(e){
        if(e.code === 'Space' && onGame ==true){
            on_gauge = true;
        }
    }
    fire_after(e){
        if(e.code === 'Space' && onGame ==true){
            on_gauge = false;
            fire_ball = true;
            gauge_transfer = gauge_percent*0.01;
            gauge_percent=0;
        }
    }

    shiftBallType(e){
        if(e.key === 'Shift' && onGame ==true){      
            switch(ball_type){
                case 1: ball_type++; break;
                case 2: ball_type++; break;
                case 3: ball_type = 1; break;
            }
        }
    }

    shiftBallMagnitude(e){
        if(e.code === 'KeyZ' && onGame ==true){
            switch(ball_magnitude){
                case 1: ball_magnitude++; break;
                case 2: ball_magnitude++; break;
                case 3: ball_magnitude = 1; break;
            }
        }
    }

    gaugeMove(){
        if(gauge_percent == 100 && onGame ==true){
            gauge_full = true;
        }else if(gauge_percent == 0 && onGame ==true){
            gauge_full = false;
        }

        let full = gauge_full;
        if(!full && onGame ==true){
            gauge_percent++;
        }
        if(full && onGame ==true){
            gauge_percent--;
        }
    }

    manaConsumption(magnitude){
        switch(magnitude){
            case 1: mana_consumption=2; break;
            case 2: mana_consumption=4;break;
            case 3: mana_consumption=10;break;   }
    }

    preventOut(cannonX, cannonWidht){
        if(cannonX<=0){
            this.cannon.x = 0;}
        if(cannonX +cannonWidht>=this.stageWidth){  
            this.cannon.x = this.stageWidth-cannonWidht;
        }
    }

    }


window.onload = () =>{
    new App();
}