class VictoryScene extends Phaser.Scene {
    constructor() {
        super("VictoryScene")
    }

    create(datos) 
    {
        this.win=this.sound.add("win", {loop:false});
        this.splash=this.sound.add("splash", {loop:true});
        this.excelente=this.sound.add("excelente", {loop:false});
        this.victorybg=this.physics.add.image(gWidth/2, gHeight/2, "victory-scene-victory-bg");
        this.victory=this.physics.add.image(gWidth/2, gHeight*0.40-1000, "victory-scene-victory");
        this.meatball=this.physics.add.image(gWidth*0.83, gHeight*0.40+1000, "victory-scene-victory-meatball");
        this.cats=this.physics.add.image(gWidth*0.20, gHeight*0.90+1000, "victory-scene-victory-cats");
        
        this.excelente.play()
        this.win.play()
        this.splash.play();
        this.splash.volume =-0.6

        if(g_lastpickup>=3){
            this.left=this.physics.add.image(gWidth*0.405, gHeight*0.12-1000, "victory-scene-victory-star-left");
        }
        if(g_lastpickup>=6){
            this.mid=this.physics.add.image(gWidth/2, gHeight*0.10-1000, "victory-scene-victory-star-mid");
        }
        if(g_lastpickup>=10){
            this.rigth=this.physics.add.image(gWidth*0.585, gHeight*0.12-1000, "victory-scene-victory-star-rigth");
        }

        this.btnRestart = new Button(this, gWidth *0.58, gHeight * 0.70-1000, "ui-btn-restart-big", {
            onClick: ()=> {
                this.sound.stopAll()
                this.scene.stop()
                this.scene.start("GameScene")
            }
        })

        this.btnLevels = new Button(this, gWidth*0.42, gHeight * 0.70-1000, "ui-btn-levels-big", {
            onClick: ()=> {
                this.tweens.add({
                    targets: [this.pickupText, this.chickenText, this.btnRestart, this.btnLevels, this.left, this.mid, this.rigth, this.victory, this.pickup],
                    y: "-= 1000",
                    ease: "Back",
                    duration: 600
                })
        
                this.tweens.add({
                    targets: [this.cats,this.meatball],
                    y: "+= 1000",
                    ease: "Back",
                    duration: 600
                })

                this.timer1 = this.time.addEvent({
                    delay: 400,
                    loop: false,
                    callback: () => {
                        this.Back();
                    }
                })
            }
        })

        switch(g_level){
            case 1:
                this.pickupText=this.add.text(gWidth*0.44,gHeight*0.474-1000, g_lastpickup + "/10",{      
                    fontSize:"39px",
                    fill:"#fff",
                    fontFamily:"verdana,arial,sans-serif"
                });  
                this.pickup=this.physics.add.image(gWidth*0.411 ,gHeight*0.484-1000, "pickup1").setScale(0.30,0.30);
                break;
            case 2:
                this.pickupText=this.add.text(gWidth*0.44,gHeight*0.474-1000, g_lastpickup + "/15",{      
                    fontSize:"39px",
                    fill:"#fff",
                    fontFamily:"verdana,arial,sans-serif"
                });
                this.pickup=this.physics.add.image(gWidth*0.415 ,gHeight*0.484-1000, "pickup2").setScale(0.30,0.30);
                break;
            case 3: 
                this.pickupText=this.add.text(gWidth*0.44,gHeight*0.474-1000, g_lastpickup + "/20",{      
                    fontSize:"39px",
                    fill:"#fff",
                    fontFamily:"verdana,arial,sans-serif"
                });
                this.pickup=this.physics.add.image(gWidth*0.415 ,gHeight*0.484-1000, "pickup3").setScale(0.30,0.30);
                break;
        }
        this.chickenText=this.add.text(gWidth*0.58,gHeight*0.474-1000, g_chicken,{      
            fontSize:"39px",
            fill:"#fff",
            fontFamily:"verdana,arial,sans-serif"
        });

        this.tweens.add({
            targets: [this.pickupText, this.chickenText, this.btnRestart, this.btnLevels, this.left, this.mid, this.rigth, this.victory, this.pickup],
            y: "+= 1000",
            ease: "Back",
            duration: 600
        })

        this.tweens.add({
            targets: [this.cats,this.meatball],
            y: "-= 1000",
            ease: "Back",
            duration: 600
        })
    }
    update(){
        if(g_music==1){
            this.splash.setMute(false);
            this.win.setMute(false);
        }
        else{
            this.splash.setMute(true);
            this.win.setMute(true)
        }
    }

    Back(){
        this.win.stop()
        this.scene.stop()
        this.scene.start("LevelsScene")
    }
}