class HelpScene extends Phaser.Scene {
    constructor() {
        super("HelpScene")
    }

    create(){
        this.aux = 1;

        this.helpbg=this.physics.add.image(gWidth/2, gHeight/2, "help-scene-help-bg");
        this.help=this.physics.add.image(gWidth/2, gHeight*0.44-1000, "help-scene-help");//44
        this.help1=this.physics.add.image(gWidth/2, gHeight*0.55-1000, "help-scene-help-help1");
        this.help2=this.physics.add.image(gWidth/2, gHeight*0.55-1000, "help-scene-help-help2");
        this.help3=this.physics.add.image(gWidth/2, gHeight*0.55-1000, "help-scene-help-help3");
        this.help4=this.physics.add.image(gWidth/2, gHeight*0.55-1000, "help-scene-help-help4");
        this.help5=this.physics.add.image(gWidth/2, gHeight*0.55-1000, "help-scene-help-help5");
        this.cat=this.physics.add.image(gWidth*0.87, gHeight*0.80+1000, "help-scene-help-cat");
        this.ayuda1=this.sound.add("ayuda1", {loop:false});
        this.ayuda2=this.sound.add("ayuda2", {loop:false});
        this.ayuda3=this.sound.add("ayuda3", {loop:false});
        this.sonido1=0
        this.sonido2=0
        this.sonido3=0

        this.btnClose = new Button(this, gWidth * 0.73, gHeight * 0.20-1000, "help-scene-btn-close", {
            onClick: ()=> {
                this.tweens.add({
                    targets: [this.btnLeft, this.btnRigth, this.btnClose, this.help, this.help1, this.help2, this.help3, this.help4, this.help5],
                    y: "-= 1000",
                    ease: "Power3",
                    duration: 600
                })
        
                this.tweens.add({
                    targets: this.cat,
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

        this.btnRigth = new Button(this, gWidth * 0.73, gHeight / 2-1000, "help-scene-help-rigth", {
            onClick: ()=> {
                this.aux++
            }
        })

        this.btnLeft = new Button(this, gWidth * 0.27, gHeight /2-1000, "help-scene-help-left", {
            onClick: ()=> {
                this.aux--
            }
        })

        this.tweens.add({
            targets: [this.btnLeft, this.btnRigth, this.btnClose, this.help, this.help1, this.help2, this.help3, this.help4, this.help5],
            y: "+= 1000",
            ease: "Power3",
            duration: 600
        })

        this.tweens.add({
            targets: this.cat,
            y: "-= 1000",
            ease: "Back",
            duration: 600
        })
        this.ayuda1.play()
    }

    update(){
        if(this.aux==1){
            this.btnLeft.setVisible(false);
            this.btnRigth.setVisible(true);
            this.help1.setVisible(true);
            this.help2.setVisible(false);
            this.help3.setVisible(false);
            this.help4.setVisible(false);
            this.help5.setVisible(false);
            if(this.sonido1==1){
                this.Ayud1()
                this.sonido1=0
            }
            this.sonido2=1
        }
        else if(this.aux==2){
            this.btnLeft.setVisible(true);
            this.btnRigth.setVisible(true);
            this.help1.setVisible(false);
            this.help2.setVisible(true);
            this.help3.setVisible(false);
            this.help4.setVisible(false);
            this.help5.setVisible(false);
            if(this.sonido2==1){
                this.Ayud2()
                this.sonido2=0
            }
            this.sonido1=1
            this.sonido3=1
        }
        else if(this.aux==3){
            this.btnLeft.setVisible(true);
            this.btnRigth.setVisible(false);
            this.help1.setVisible(false);
            this.help2.setVisible(false);
            this.help3.setVisible(true);
            this.help4.setVisible(false);
            this.help5.setVisible(false);
            if(this.sonido3==1){
                this.Ayud3()
                this.sonido3=0
            }
            this.sonido2=1
        }
        /*else if(this.aux==4){
            this.btnLeft.setVisible(true);
            this.btnRigth.setVisible(true);
            this.help1.setVisible(false);
            this.help2.setVisible(false);
            this.help3.setVisible(false);
            this.help4.setVisible(true);
            this.help5.setVisible(false);
            this.sonido3=1
        }
        else{
            this.btnLeft.setVisible(true);
            this.btnRigth.setVisible(false);
            this.help1.setVisible(false);
            this.help2.setVisible(false);
            this.help3.setVisible(false);
            this.help4.setVisible(false);
            this.help5.setVisible(true);
        }*/

        if(this.sonido==1){
            if(this.aux==2){
                this.ayuda3.play()
            }
            this.sonido==0
        }
    }

    Back(){
        this.scene.stop()
                if(g_scene=="SplashScene" || g_scene=="LevelsScene"){
                    this.scene.resume(g_scene)
                }
                else{
                    this.scene.start(g_scene)
                }
    }

    Ayud1(){
        this.ayuda1.play()
    }
    Ayud2(){
        this.ayuda3.play()
    }
    Ayud3(){
        this.ayuda2.play()
    }
}