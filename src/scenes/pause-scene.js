class PauseScene extends Phaser.Scene {
    constructor() {
        super("PauseScene")
    }

    preload(){
        this.load.audio("level1", "assets/sound/level1.mp3");
        this.load.audio("level2", "assets/sound/level2.mp3");
        this.load.audio("level3", "assets/sound/level3.mp3");
    }
    
    create()
    {  
        g_scene = "PauseScene";

        this.pausebg=this.physics.add.image(gWidth/2, gHeight/2, "pause-scene-pause-bg");
        this.pause=this.physics.add.image(gWidth/2, gHeight*0.40-1000, "pause-scene-pause");
        this.cat=this.physics.add.image(gWidth*0.85, gHeight*0.77+1000, "pause-scene-pause-cat");

        this.level1=this.sound.add("level1", {loop:true});
        this.level2=this.sound.add("level2", {loop:true});
        this.level3=this.sound.add("level3", {loop:true});

        this.btnPause = new Button(this, gWidth * 0.95, gHeight * 0.10, "ui-btn-pause", {
            onClick: ()=> {
                this.tweens.add({
                    targets: [this.btnHome, this.btnHelp, this.btnRestart, this.btnLevels, this.btnMusic, this.btnSound, this.pause],
                    y: "-= 1000",
                    ease: "back",
                    duration: 600
                })
                this.tweens.add({
                    targets: this.cat,
                    y: "+= 1000",
                    ease: "back",
                    duration: 600
                })

                this.timer1 = this.time.addEvent({
                    delay: 300,
                    loop: false,
                    callback: () => {
                        this.Back();
                    }
                })
            }
        })

        this.btnHome = new Button(this, gWidth *0.42, gHeight * 0.55-1000, "pause-scene-btn-home", {
            onClick: ()=> {
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - To Return','label':'{{Carrera Aérea}}','GameCategory':'{{game}}','Show':'{{44 Gatos}}'})
                console.log("DKW - To Return")
                this.tweens.add({
                    targets: [this.btnHome, this.btnHelp, this.btnRestart, this.btnLevels, this.btnMusic, this.btnSound, this.pause],
                    y: "-= 1000",
                    ease: "back",
                    duration: 600
                })
                this.tweens.add({
                    targets: this.cat,
                    y: "+= 1000",
                    ease: "back",
                    duration: 600
                })
                this.timer1 = this.time.addEvent({
                    delay: 300,
                    loop: false,
                    callback: () => {
                        this.BackHome();
                    }
                })
            }
        })

        this.btnRestart = new Button(this, gWidth * 0.42, gHeight * 0.38-1000, "pause-scene-btn-restart", {
            onClick: ()=> {
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Start Over','label':'{{Carrera Aérea}}','GameCategory':'{{game}}','Show':'{{44 Gatos}}'})
                console.log("DKW - Start Over")
                this.sound.stopAll();
                this.scene.stop()
                this.scene.start("GameScene")
            }
        })

        this.btnHelp = new Button(this, gWidth/2, gHeight * 0.38-1000, "pause-scene-btn-help", {
            onClick: ()=> {
                this.tweens.add({
                    targets: [this.btnHome, this.btnHelp, this.btnRestart, this.btnLevels, this.btnMusic, this.btnSound, this.pause],
                    y: "-= 1000",
                    ease: "back",
                    duration: 600
                })
                this.tweens.add({
                    targets: this.cat,
                    y: "+= 1000",
                    ease: "back",
                    duration: 600
                })

                this.timer1 = this.time.addEvent({
                    delay: 300,
                    loop: false,
                    callback: () => {
                        this.BackHelp();
                    }
                })
            }
        })

        this.btnLevels = new Button(this, gWidth/2, gHeight * 0.55-1000, "pause-scene-btn-levels", {
            onClick: ()=> {
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - To Return','label':'{{Carrera Aérea}}','GameCategory':'{{game}}','Show':'{{44 Gatos}}'})
                console.log("DKW - To Return")
                this.tweens.add({
                    targets: [this.btnHome, this.btnHelp, this.btnRestart, this.btnLevels, this.btnMusic, this.btnSound, this.pause],
                    y: "-= 1000",
                    ease: "back",
                    duration: 600
                })
                this.tweens.add({
                    targets: this.cat,
                    y: "+= 1000",
                    ease: "back",
                    duration: 600
                })
                this.timer1 = this.time.addEvent({
                    delay: 300,
                    loop: false,
                    callback: () => {
                        this.BackLevels();
                    }
                })
            }
        })

        this.btnSound = new Button(this, gWidth* 0.58, gHeight * 0.38-1000, "pause-scene-btn-sound", {
            onClick: ()=> {
                
            }
        })

        this.btnMusic = new Button(this, gWidth*0.58, gHeight * 0.55-1000, "pause-scene-btn-music", {
            onClick: ()=> {
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Sound [Activate - Desactivate]','label':'{{Carrera Aérea}}','GameCategory':'{{game}}','Show':'{{44 Gatos}}'})
                console.log("DKW - Sound")
                g_music=g_music*-1;
                if(g_music==1){
                    this.sound.stopAll()
                    switch(g_level){
                        case 1:
                            this.level1.play()
                            this.level1.volume =-0.3
                            break;
                        case 2:
                            this.level2.play()
                            this.level2.volume =-0.3
                            break;
                        case 3: 
                            this.level3.play()
                            this.level3.volume =-0.3
                            break;
                    }
                }
                else{
                    this.sound.stopAll()
                }
            }
        })

        this.btnMusicMute = new Button(this, gWidth*0.58, gHeight * 0.55-1000, "pause-scene-btn-musicmute", {
            onClick: ()=> {
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Sound [Activate - Desactivate]','label':'{{Carrera Aérea}}','GameCategory':'{{game}}','Show':'{{44 Gatos}}'})
                console.log("DKW - Sound")
                g_music=g_music*-1;
                if(g_music==1){
                    this.sound.stopAll()
                    switch(g_level){
                        case 1:
                            this.level1.play()
                            this.level1.volume =-0.3
                            break;
                        case 2:
                            this.level2.play()
                            this.level2.volume =-0.3
                            break;
                        case 3: 
                            this.level3.play()
                            this.level3.volume =-0.3
                            break;
                    }
                }
                else{
                    this.sound.stopAll()
                }
            }
        })

        this.tweens.add({
            targets: [this.btnHome, this.btnHelp, this.btnRestart, this.btnLevels, this.btnMusic, this.btnSound, this.pause, this.btnMusicMute],
            y: "+= 1000",
            ease: "back",
            duration: 600
        })

        this.tweens.add({
            targets: this.cat,
            y: "-= 1000",
            ease: "back",
            duration: 600
        })
    }

    update(){
        if(g_music==1){
            this.btnMusic.setVisible(true)
            this.btnMusicMute.setVisible(false)
        }
        else{
            this.btnMusic.setVisible(false)
            this.btnMusicMute.setVisible(true)
        }
    }

    Back(){
        this.scene.stop()
        this.scene.resume("GameScene")
    }

    BackHelp(){
        this.scene.stop()
        this.scene.start("HelpScene")
    }

    BackHome(){
        this.sound.stopAll();
        this.scene.stop()
        this.scene.stop("GameScene")
        this.scene.start("SplashScene")
    }

    BackLevels(){
        this.sound.stopAll();
        g_scene = "splash";
        this.scene.stop()
        this.scene.start("LevelsScene")
    }
}

