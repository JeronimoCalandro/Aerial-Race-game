class SplashScene extends Phaser.Scene {
    constructor() {
        super("SplashScene")
    }

    preload(){
        this.load.audio("splash", "assets/sound/splash.mp3");
    }

    create()
    {
        g_scene = "SplashScene";
        this.add.image(gWidth/2, gHeight/2, "splash-scene-bg")
        this.grey = this.add.image(gWidth * 0.10-1000, gHeight * 0.40, "splash-scene-grey-cat")
        .setAngle(0).setScale(1.1)
        this.brown = this.add.image(gWidth * 0.80+1000, gHeight * 0.70, "splash-scene-brown-cat")
        .setAngle(0).setScale(1.1)
        

        this.splash=this.sound.add("splash", {loop:true});
        this.titulo=this.sound.add("titulo", {loop:false});
        if(g_aux==1){

        }
        else{
            this.sound.stopAll();
            this.splash.play();
            this.splash.volume =-0.3    
        }
        this.titulo.play()
        
        this.tweens.add({
            targets: this.add.image(gWidth/2, gHeight * 0.25, "splash-scene-logo"),
            duration: 120,
            repeat: -1,
            repeatDelay: 3000,
            ease: "Circ",
            yoyo: 1,
            scale: 1.05
        })

        this.tweens.add({
            targets: this.grey,
            x: "+= +1000",
            ease: "Back",
            delay: 300,
            duration: 600
        })

        this.tweens.add({
            targets: this.brown,
            x: "-= 1000",
            ease: "Back",
            delay: 300,
            duration: 600
        })

        this.meatball_splash = this.add.image(gWidth/2, gHeight*0.60+1000, "splash-scene-meatball_splash")
        .setAngle(0).setScale(1.1)

        this.tweens.add({
            targets: this.meatball_splash,
            y: "-= 1000",
            ease: "Back",
            delay: 300,
            duration: 600
        })

        this.btnPlay = new Button(this, gWidth/2, gHeight * 0.85 + 400, "ui-btn-play", {
            onClick: ()=> {
                this.scene.start("LevelsScene")
            }
        })

        this.btnHelp =new Button(this, gWidth*0.95, gHeight * 0.10-1000, "ui-btn-help", {
            onClick: ()=>{
                this.scene.pause()
                this.scene.launch("HelpScene")
            }
        })

        this.btnSound = new Button(this, gWidth*0.87, gHeight * 0.10-1000, "ui-btn-sound", {
            onClick: ()=> {
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Sound [Activate - Desactivate]','label':'{{Carrera Aérea}}','GameCategory':'{{game}}','Show':'{{44 Gatos}}'})
                g_music=g_music*-1;
                if(g_music==1){
                    this.sound.stopAll()
                    this.splash.play();
                }
                else{
                    this.sound.stopAll()
                }
            }
        })

        this.btnMute = new Button(this, gWidth*0.87, gHeight * 0.10-1000, "ui-btn-mute", {
            onClick: ()=> {
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Sound [Activate - Desactivate]','label':'{{Carrera Aérea}}','GameCategory':'{{game}}','Show':'{{44 Gatos}}'})
                g_music=g_music*-1;
                if(g_music==1){
                    this.sound.stopAll()
                    this.splash.play();
                }
                else{
                    this.sound.stopAll()
                }
            }
        })
        this.btnMute.setScale(0.80,0.80)

        this.tweens.add({
            targets: this.btnPlay,
            y: "+= -400",
            ease: "Back",
            delay: 300,
            duration: 600
        })

        this.tweens.add({
            targets: [this.btnHelp, this.btnSound, this.btnMute],
            y: "+= 1000",
            ease: "Back",
            delay: 300,
            duration: 600
        })

        // -- flash --
        this.tweens.add({
            targets: this.add.rectangle(0, 0, gWidth, gHeight, 0xffffff, 1).setOrigin(0, 0),
            alpha: 0,
            duration: 200,
            delay: 100
        })
    }

    update(){
        if(g_music==1){
            this.splash.setMute(false);
            this.btnSound.setVisible(true);
            this.btnMute.setVisible(false);
        }
        else{
            this.splash.setMute(true);
            this.btnSound.setVisible(false);
            this.btnMute.setVisible(true);
        }
        this.btnMute.setScale(0.83,0.83)
    }
}