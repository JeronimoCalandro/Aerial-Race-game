class FinishScene extends Phaser.Scene {
    constructor() {
        super("FinishScene")
    }

    create(){
        this.camera=this.cameras.main;
        this.finishsong=this.sound.add("finish", {loop:false});
        this.splash=this.sound.add("splash", {loop:true});
        this.lograste=this.sound.add("loLograste", {loop:false});
        this.toca=this.sound.add("toca", {loop:false});
        this.miautastico=this.sound.add("miautastico", {loop:false});
        this.bg=this.physics.add.image(gWidth/2, gHeight/2, "finish-scene-background");
        this.finish=this.physics.add.image(gWidth/2, gHeight*0.40-1000, "finish-scene-finish");
        this.meatball=this.physics.add.image(gWidth*0.85, gHeight*0.50+1000, "finish-scene-meatball");
        this.background=this.add.image(gWidth/2, gHeight/2, "finish-scene-backgroundpresent").setVisible(false);
        this.presentunlock=this.physics.add.image(gWidth*0.40, gHeight*0.40-1000, "finish-scene-presentunlock").setVisible(false);
        this.backgroundfinal=this.add.image(gWidth/2, gHeight/2, "finish-scene-backgroundfinal").setVisible(false);
        this.pileta = this.physics.add.sprite(gWidth*0.70,gHeight*0.70+1000, "pileta").setVisible(false);
        this.present=this.add.image(gWidth/2, gHeight*0.67-1000, "finish-scene-present").setVisible(false);
        this.final=this.add.image(gWidth*0.30, gHeight*0.30, "finish-scene-final").setVisible(false);
        this.play=this.add.image(gWidth*0.90, gHeight*0.80, "ui-btn-play").setVisible(false);

        this.lograste.play()

        this.timer3 = this.time.addEvent({
            delay: 1000,
            loop: false,
            callback: () => {
                this.Toca();
            }
        })

        this.tweens.add({
            targets: [this.finish, this.presentunlock, this.present],
            y: "+= 1000",
            ease: "Power3",
            duration: 600
        })
        this.tweens.add({
            targets: [this.meatball],
            y: "-= 1000",
            ease: "Power3",
            duration: 600
        })
        
        this.btnPresent = new Button(this, gWidth / 2, gHeight * 0.67, "finish-scene-present", {
            onClick: ()=> {
                this.present.setVisible(true);
                if(finish==0){
                    this.btnPresent.setVisible(false);
                    this.tweens.add({
                        targets: this.present,
                        scale: 1.2,
                        alpha: 1,
                        duration: 100,
                        ease: "Power3"
                    })

                    this.fishes.setVelocityY(-2300);
                    
                    this.timer = this.time.addEvent({
                        delay: 2000,
                        loop: false,
                        callback: () => {
                            this.ChangeScene();
                        }
                    })
                    this.timer = this.time.addEvent({
                        delay: 3000,
                        loop: false,
                        callback: () => {
                            this.Animation();
                        }
                    })

                    this.timer2 = this.time.addEvent({
                        delay: 5000,
                        loop: false,
                        callback: () => {
                            this.ChangeScene2();
                        }
                    })
                    this.finishsong.play();
                    this.finishsong.volume =-0.6
                }
                
                finish = 1;
                console.log(finish)
            }
        })
        this.tweens.add({
            targets: this.btnPresent,
            duration: 120,
            repeat: -1,
            repeatDelay: 3000,
            ease: "Circ",
            yoyo: 1,
            scale: 0.70
        })
        this.fishes=this.physics.add.image(gWidth/2, gHeight*4, "finish-scene-fishtransition").setScale(1,1);
    }

    update(){
        if(g_music==1){
            this.splash.setMute(false);
            this.finishsong.setMute(false);
        }
        else{
            this.splash.setMute(true);
            this.finishsong.setMute(true);
        }

        if(this.fishes.y<-2200){
            this.finishsong.stop();
        }
    }

    ChangeScene(){
        this.miautastico.play()
        this.final.setVisible(true);
        this.play.setVisible(true);
        this.backgroundfinal.setVisible(true);
        this.presentunlock.setVisible(true);
        this.present.setVisible(false);
        this.pileta.setVisible(true);
        this.anims.create({
            key: 'pileta',
            frames: this.anims.generateFrameNumbers('pileta', { start: 0, end: 8 }),
            frameRate: 7,
            repeat: 0
        })
        this.tweens.add({
            targets: [this.pileta],
            y: "-= 1000",
            ease: "Power3",
            duration: 600
        })
    }

    ChangeScene2(){
        this.play.setVisible(false);
        this.btnPlay = new Button(this, gWidth*0.90, gHeight *0.80, "ui-btn-play", {
            onClick: ()=> {
                this.scene.start("LevelsScene")
            }
        })
    }

    Animation(){
        this.pileta.anims.play('pileta', true);
    }

    Toca(){
        this.toca.play()
    }
}