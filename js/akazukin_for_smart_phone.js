enchant();

class Akazukin extends Sprite{
	constructor(x, y){
		super(x, y);
		this.vx = 6;
		this.vy = 0;
		this.jumpFlag = true;
		this.isGround = true;
		this.jumpCount = 0;
		this.alive = true;
		this.hp = 3;
		this.chicken = 0;
		this.star = false;
		this.starTime = 1000;
	}
}

window.onload = function() {
	var game = new Core(320,320); // ゲームの準備をし、表示領域の大きさを指定している
    game.preload('img/howToPlay.png', 'img/aka.png', 'img/map2.png', 'img/ground.png', 'img/needle.png', 'img/mochi.png', 'img/money.png', 'img/bg1.png', 'img/bg2.png', 'img/bg3.png','img/chicken.png', 'img/HPbar.png', 'img/HP.png'); 
    // ゲームに用いるリソース(画像)を読み込む
    //game.preload('snd/stage1.wav', 'snd/jump.wav', 'snd/money.wav', 'snd/apple.wav', 'snd/clear.wav', 'snd/GameFaild.wav', 'snd/chicken.wav', 'snd/damage.wav', 'snd/danger.wav');
    game.fps = 24;
    game.scale = 1;

    game.onload = function() {
//        var bgm = game.assets['snd/stage1.wav'];       
//        var jumpSound1 = game.assets['snd/jump.wav'];
//        var jumpSound2 = jumpSound1.clone();
//        var mochiSound = game.assets['snd/apple.wav'];
//        var moneySound = game.assets['snd/money.wav'];
//        var clearSound = game.assets['snd/clear.wav'];
//        var faildSound = game.assets['snd/GameFaild.wav'];
//        var damageSound = game.assets['snd/damage.wav'];
//        var dangerSound = game.assets['snd/danger.wav'];
        
//        var howToPlayScene = new Scene();
//        howToPlayScene.backgroundColor = 'rgba(0,0,0,0.5)';
//        var howToPlayImg = new Sprite(320, 400);
//		howToPlayImg.image = game.assets['img/howToPlay.png'];
//		howToPlayImg.x = 0;
//		howToPlayImg.y = 0;
//		howToPlayScene.addChild(howToPlayImg);        

        var createGameScene = function() {
        	var GROUND_LINE = 208;
        	var scene = new Scene();
        	scene.backgroundColor = '#00ff00';
        	
        	var frame = 0;
        	
        	// 背景
        	var bg1 = new Sprite(320,400);
        	bg1.image = game.assets['img/bg1.png'];
        	bg1.x = 0;
        	bg1.y = 0;
        	var bg2 = new Sprite(320,400);
        	bg2.image = game.assets['img/bg2.png'];
        	bg2.x = 320;
        	bg2.y = 0;
			var bg3 = new Sprite(320,400);
        	bg3.image = game.assets['img/bg3.png'];
        	bg3.x = 640;
        	bg3.y = 0;

        	// score
            var score = new ScoreLabel(10,10);
            score.score = 0;
        	
        	// HP
        	var hpb = new Sprite(62,18);
        	hpb.image = game.assets['img/HPbar.png'];
        	hpb.x = 320- 10 - hpb.width;
        	hpb.y = 10;
        	
        	var hp = new Array(3);
        	for(i = 0; i < 3; i++){
        	    hp[i] = new Sprite(20,16);
        	    hp[i].image = game.assets['img/HP.png'];
        	    hp[i].x = 320- 10 - hpb.width + 1 + i * 20;
        	    hp[i].y = 10 + 1;
        	}
        	
        	// トゲ
        	var needle = new Array(2);
        	for(j = 0; j < 2; j++){
        	    needle[j] = new Sprite(34,34);
        	    needle[j].image = game.assets['img/needle.png'];
        	    needle[j].x = -needle[j].width;
        	    needle[j].y = GROUND_LINE - needle[j].height;
        	}
        	
            // 鶏
            var chicken = new Array(3);
            var chickenSound = new Array(3);
            for(k = 0; k < 3; k++){
        	    chicken[k] = new Sprite(32,32);
        	    chicken[k].image = game.assets['img/chicken.png'];
        	    chicken[k].x = -chicken[k].width;
        	    chicken[k].y = GROUND_LINE - chicken[k].height;
//        	    if(k==0){
//        	        chickenSound[k] = game.assets['snd/chicken.wav'];
//        	    }
//        	    else{
//        	        chickenSound[k] = chickenSound[0].clone();
//        	    }
        	}
        	
        	// モチ
        	var mochi = new Sprite(32,32);
        	mochi.image = game.assets['img/mochi.png'];
        	mochi.x = -mochi.width;
        	mochi.y = GROUND_LINE - mochi.height;
        	       	
        	// 金
        	var money = new Sprite(32,32);
        	money.image = game.assets['img/money.png'];
        	money.x = -money.width;
        	money.y = GROUND_LINE - money.height;
            
        	var aka = new Akazukin(32, 64);
        	aka.image = game.assets['img/aka.png'];
        	aka.x = 80;
        	aka.y = GROUND_LINE - aka.height;
        	
        	var aka_hit = new Sprite(8,62);
        	aka_hit.x = aka.x + aka.width / 2 - 8 / 2;
        	aka_hit.y = aka.y + 2;
        	
//        	var firstTime = true;
        	
        	// ループ処理
        	scene.addEventListener('enterframe', function(){
//        	    if(firstTime == true){
//        	        bgm.play();
//        	        firstTime = false;
//        	    }
        	    
        		if(aka.alive == false){
        			aka.vx = 0;
        			aka.frame = 8;
//        			bgm.stop();
        			game.end(score.score, "スコア：" + score.score);
        		}
        		else{
//        		    if(bgm.currentTime  > 13.714){
//        		        bgm.play();
//        		    }
        			frame += 1;
        			if(aka.star == true){
        			    if(aka.starTime % 6 == 0){
        			        aka.frame = 10;
        			    }
        			    else if(aka.starTime % 6 == 3){
        			        aka.frame = 8;
        			    }
        			    if(aka.starTime >= 90){
        			        aka.star = false;
        			    }
        			    else{
        			        aka.starTime += 1;
        			    }
        			}
        			else if(aka.isGround == true && frame % 2 == 0){
        				aka.frame = (aka.frame + 1) % 3;
        			}
        			else if(aka.isGround == false){
        				aka.frame = 3;
        			}
        			if(frame % 450 == 0){
        				aka.vx += 0.5;
        			}
        		}
        		
        		//背景スクロール
        		bg1.x -= aka.vx;
        		bg2.x -= aka.vx;
				bg3.x -= aka.vx;
        		if(bg1.x <= -320){
        		    bg1.x = bg2.x + bg2.width * 2;
        		}
        		if(bg2.x <= -320){
        		    bg2.x = bg3.x + bg3.width * 2;
        		}
				if(bg3.x <= -320){
					bg3.x = bg1.x + bg1.width * 2;
				}
        		        		
        		//障害物制御
       			if(needle[0].x <= -needle[0].width){
       				if(Math.random() > 0.8){
       					needle[0].x = 320;
       					needle[0].y = GROUND_LINE - needle[0].height - Math.round((Math.random() * 5)) * 32;
       				}
       			}
       			if(needle[1].x <= -needle[0].width && needle[0].x <= 160 && needle[0].x > 140){
       			     if(Math.random() > 0.8){
       			         needle[1].x = 320;
       			         needle[1].y = GROUND_LINE - needle[1].height - Math.round((Math.random() * 5)) * 32;
       			     }
       			}
       			
       			for(j = 0; j < 2; j++){
       			     if(needle[j].x > -needle[j].width) {
       				     needle[j].x -= aka.vx;
       				     if(needle[j].intersect(aka_hit)){
       				         if(aka.star == false){
       				             aka.hp -= 1;
       				             aka.star = true;
       				             aka.starTime = 0;
       				             hp[aka.hp].x = -20;
       				         
       				             if(aka.hp <= 0){
       				                 aka.alive = false;
//       				                 faildSound.play();
       				             }
//       				             else if(aka.hp == 1){
//       				                 dangerSound.play();
//       				             }
//       				             else{
//       				                 damageSound.play();
//       				             }
       				         }
       			         }
       			     }
       			}
       			
       			if(frame % 300 == 150){
       				if(Math.random() > 0.5){
       					mochi.x = 320;
       					mochi.y = GROUND_LINE - mochi.height - (Math.random() * 3.5) * 32;
       				}
       			}
       			if(mochi.x > -mochi.width) {
       				 mochi.x -= aka.vx;
       				 if(mochi.intersect(aka_hit)){
       				     mochi.x = -mochi.width;
//       				     mochiSound.play();
       				     if(aka.hp != 3 && aka.alive == true){
       				         hp[aka.hp].x = 320 - 10 - hpb.width + 1 + aka.hp * 20;
       				         aka.hp += 1;
       				     }
       			     }
       			}

       			for(k = 0; k < 3; k++){
       			     if(chicken[k].x <= -chicken[k].width){
       				     if(Math.random() > 0.9){
       					     chicken[k].x = 320;
       					     chicken[k].y = GROUND_LINE - chicken[k].height - (Math.random() * 3.5) * 32;
       				     }
       			     }
       			     if(chicken[k].x > -chicken[k].width) {
       				     chicken[k].x -= aka.vx*(0.5 + k * 0.1);
       				     if(frame % 4 == 0){
       				         chicken[k].frame += 1;
       				         if(chicken[k].frame == 2){
       		 	    	         chicken[k].frame == 0;
       		     	 	     }
       		     		 }
       	 	    		 if(chicken[k].intersect(aka_hit)){
       	     			     score.score += 100;
           				     aka.chicken[k] += 1;
//         				     chickenSound[k].play();
          				     chicken[k].x = -chicken[k].width;
           			     }
           			}
       			}
       			
       			if(frame % 300 == 0){
       				money.x = 320;
       				money.y = GROUND_LINE - money.height - (Math.random() * 4) * 32;
       			}
       			if(money.x > -money.width) {
       				money.x -= aka.vx * 1.5;
       				if(money.intersect(aka_hit)){
       					score.score += 500;
//       					moneySound.play();
       					money.x = -money.width;
       				}
       			}
       			        						
				//空中制御
        		if(aka.vy >= 20){
        			aka.vy = 24;
        		}
        		else{
        			aka.vy += 3;
        		}
        		aka.y += aka.vy;
        		aka_hit.x = aka.x + aka.width / 2 - 8 / 2;
     		   	aka_hit.y = aka.y + 6;
        		
        		if(aka.y >= GROUND_LINE - aka.height){
        			aka.isGround = true;
        			aka.y = GROUND_LINE - aka.height;
        			aka_hit.y = aka.y + 2;
        			aka.jumpFlag = true;
        			aka.jumpCount = 0;
        		}
        		
        	});
        	
        	// ジャンプ処理
        	scene.addEventListener(Event.TOUCH_START, function(e) {
        		if(e.x < 10 && e.y < 10){return;}
        		if(aka.jumpCount > 1){return;}
        		if(aka.alive == false){return;}
        		aka.vy = -23;
     			aka.isGround = false;
//     			if(aka.jumpCount == 0) jumpSound1.play();
//     			else jumpSound2.play();
     			aka.jumpCount += 1;
        	});
        	
        	scene.addChild(bg1);
        	scene.addChild(bg2);
			scene.addChild(bg3);
        	scene.addChild(score);
        	scene.addChild(hpb);
        	for(i=0; i<3; i++){
        	    scene.addChild(hp[i]);
        	}
        	scene.addChild(money);
        	scene.addChild(mochi);
        	for(k=0; k<3; k++){
        	    scene.addChild(chicken[k]);
        	}
        	for(j=0; j<2; j++){
        	    scene.addChild(needle[j]);
        	}
        	scene.addChild(aka_hit);
        	scene.addChild(aka);
        	return scene;
        };
        game.replaceScene(createGameScene());
//        game.pushScene(howToPlayScene);
//        howToPlayScene.addEventListener(Event.TOUCH_END, function(){
//            game.popScene();
//        });
	}
    game.start(); // ゲームをスタートさせます
};