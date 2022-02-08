class DefeatScene extends Phaser.Scene {
    constructor() {
        super("DefeatScene")
    }

    create(){
        this.lose=this.sound.add("lose", {loop:false});
        this.splash=this.sound.add("splash", {loop:true});
        this.mal=this.sound.add("mal", {loop:false});
        this.defeatbg=this.physics.add.image(gWidth/2, gHeight/2, "defeat-scene-defeat-bg");
        this.defeat=this.physics.add.image(gWidth/2, gHeight*0.40-1000, "defeat-scene-defeat");
        this.meatball=this.physics.add.image(gWidth*0.83, gHeight*0.25+1000, "defeat-scene-defeat-meatball");
        this.cats=this.physics.add.image(gWidth*0.18, gHeight*0.80+1000, "defeat-scene-defeat-cats");

        this.mal.play()
        this.lose.play()
        this.splash.play();
        this.splash.volume =-0.8

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
                    targets: [this.pickupText, this.chickenText, this.btnRestart, this.btnLevels, this.defeat, this.pickup,  this.left, this.mid, this.rigth],
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
                this.pickupText=this.add.text(gWidth*0.44,gHeight*0.468-1000, g_lastpickup + "/10",{      
                    fontSize:"39px",
                    fill:"#fff",
                    fontFamily:"verdana,arial,sans-serif"
                });  
                this.pickup=this.physics.add.image(gWidth*0.411 ,gHeight*0.484-1000, "pickup1").setScale(0.30,0.30);
                break;
            case 2:
                this.pickupText=this.add.text(gWidth*0.44,gHeight*0.468-1000, g_lastpickup + "/15",{      
                    fontSize:"39px",
                    fill:"#fff",
                    fontFamily:"verdana,arial,sans-serif"
                });
                this.pickup=this.physics.add.image(gWidth*0.415 ,gHeight*0.484-1000, "pickup2").setScale(0.30,0.30);
                break;
            case 3: 
                this.pickupText=this.add.text(gWidth*0.44,gHeight*0.468-1000, g_lastpickup + "/20",{      
                    fontSize:"39px",
                    fill:"#fff",
                    fontFamily:"verdana,arial,sans-serif"
                });
                this.pickup=this.physics.add.image(gWidth*0.415 ,gHeight*0.484-1000, "pickup3").setScale(0.30,0.30);
                break;
        }

        this.chickenText=this.add.text(gWidth*0.58,gHeight*0.468-1000, g_chicken,{      
            fontSize:"39px",
            fill:"#fff",
            fontFamily:"verdana,arial,sans-serif"
        });

        this.tweens.add({
            targets: [this.pickupText, this.chickenText, this.btnRestart, this.btnLevels, this.defeat, this.pickup,  this.left, this.mid, this.rigth],
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
            this.lose.setMute(false);
        }
        else{
            this.splash.setMute(true);
            this.lose.setMute(true);
        }
    }

    Back(){
        this.lose.stop()
        this.scene.stop()
        this.scene.start("LevelsScene")
    }
}