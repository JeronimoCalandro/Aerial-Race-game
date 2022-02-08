class LevelsScene extends Phaser.Scene {
    constructor() {
        super("LevelsScene")
    }

    preload(){
        this.help="LevelsScene";
        this.load.audio("splash", "assets/sound/splash.mp3");
    }

    create(datos){
        this.splash=this.sound.add("splash", {loop:true});
        if(g_scene == "splash"){
            this.splash.play()
            this.splash.volume =-0.3
        }
        g_scene = "LevelsScene";
        g_aux=0

        // VISUAL
        this.levelsbg=this.physics.add.image(gWidth/2, gHeight/2, "levels-scene-levels-bg");
        this.level1=this.physics.add.image(gWidth*0.25, gHeight/2, "levels-scene-levels-level1").setInteractive({ cursor: 'pointer' });
        this.level2=this.physics.add.image(gWidth/2, gHeight/2, "levels-scene-levels-level2").setVisible(false).setInteractive({ cursor: 'pointer' });
        this.level3=this.physics.add.image(gWidth*0.75, gHeight/2, "levels-scene-levels-level3").setVisible(false).setInteractive({ cursor: 'pointer' });
        this.level2block=this.physics.add.image(gWidth/2, gHeight*0.53, "levels-scene-level2block");
        this.level3block=this.physics.add.image(gWidth*0.75, gHeight*0.53, "levels-scene-level3block");
        this.pickup1=this.physics.add.image(gWidth*0.256, gHeight*0.49, "game-ui-pickup1").setScale(0.50,0.50);
        this.pickup2=this.physics.add.image(gWidth*0.49, gHeight/2, "game-ui-pickup2").setVisible(false).setScale(0.50,0.50);
        this.pickup3=this.physics.add.image(gWidth*0.758, gHeight*0.49, "game-ui-pickup3").setVisible(false).setScale(0.50,0.50);
        this.block = this.add.image(gWidth*0.497, gHeight/2, "levels-scene-block");
        this.block2 = this.add.image(gWidth*0.755, gHeight/2, "levels-scene-block");

        if(g_pickups1==10){
            this.block.setVisible(false);
            this.pickup2.setVisible(true);
            this.level2.setVisible(true);
            this.level2block.setVisible(false);
            this.pickup1Text=this.add.text(gWidth*0.47,gHeight*0.625, g_pickups2 + "/15",{      
                fontSize:"45px",
                fill:"#fff",
                fontFamily:"verdana,arial,sans-serif"
            });
            this.btnLevel2 = new Button(this, gWidth /2, gHeight*0.85, "levels-scene-levels-btn-lv2", {
                onClick: ()=> {
                    if(g_pickups1==10){
                        g_level = 2;
                        this.sound.stopAll()
                        this.scene.stop()
                        this.scene.start("GameScene")
                    }
                }
            })
            if(g_pickups2==15){
                this.block2.setVisible(false);
                this.pickup3.setVisible(true);
                this.level3.setVisible(true);
                this.level3block.setVisible(false);
                this.pickup1Text=this.add.text(gWidth*0.73,gHeight*0.615, g_pickups3 + "/20",{      
                    fontSize:"45px",
                    fill:"#fff",
                    fontFamily:"verdana,arial,sans-serif"
                });
                this.btnLevel3 = new Button(this, gWidth * 0.75, gHeight*0.85, "levels-scene-levels-btn-lv3", {
                    onClick: ()=> {
                        if(g_pickups2==15){
                            g_level = 3;
                            this.sound.stopAll()
                            this.scene.stop()
                            this.scene.start("GameScene")
                        }
                    }
                })
                if(g_pickups3==20){
                    if(finish==0){
                        this.scene.stop();
                        this.scene.start("FinishScene");
                    } 
                }
            }
        }
        
        this.tweens.add({
            targets: [this.pickup1, this.pickup2, this.pickup3],
            duration: 120,
            repeat: -1,
            repeatDelay: 3000,
            ease: "Circ",
            yoyo: 1,
            scale: 0.70
        })

        this.tweens.add({
            targets: [this.block, this.block2],
            x: "+= 2",
            ease: "back",
            yoyo: 1,
            repeat: -1,
            repeatDelay: 2000,
            duration: 200
        })

        this.pickup1Text=this.add.text(gWidth*0.23,gHeight*0.615, g_pickups1 + "/10",{      
            fontSize:"45px",
            fill:"#fff",
            fontFamily:"verdana,arial,sans-serif"
        });
        
        this.btnHelp = new Button(this, gWidth * 0.95, gHeight * 0.10, "ui-btn-help", {
            onClick: ()=> {
                this.scene.pause()
                this.scene.launch("HelpScene")
            }
        })

        this.btnReturn = new Button(this, gWidth * 0.05, gHeight * 0.10, "ui-btn-return", {
            onClick: ()=> {
                this.scene.pause()
                this.scene.stop("GameScene")
                this.scene.start("SplashScene")
            }
        })

        this.btnLevel1 = new Button(this, gWidth * 0.25, gHeight*0.85, "levels-scene-levels-btn-lv1", {
            onClick: ()=> {
                g_level = 1;
                this.sound.stopAll()
                this.scene.stop()
                this.scene.start("GameScene")
            }
        })

        this.level1.on("pointerover", function(event){
            this.setScale(1.05,1.05);
        });
        this.level1.on('pointerout', function (event) {
            this.setScale(1,1);
        });

        if(g_pickups1==10){
            this.level2.on("pointerover", function(event){
                this.setScale(1.05,1.05);
            });
            this.level2.on('pointerout', function (event) {
                this.setScale(1,1);
            });
        }
        
        if(g_pickups2==15){
            this.level3.on("pointerover", function(event){
                this.setScale(1.05,1.05);
            });
            this.level3.on('pointerout', function (event) {
                this.setScale(1,1);
            });
        }
    }

    update(){
        if(g_music==1){
            this.splash.setMute(false);
        }
        else{
            this.splash.setMute(true);
        }
    }
}