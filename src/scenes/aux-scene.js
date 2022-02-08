class AuxScene extends Phaser.Scene {
    constructor() {
        super("AuxScene")
    }

    create(){
        let thisScene=this
        if(gAux==1){
            this.help1=this.physics.add.image(gWidth/2, gHeight/2, "game-help1").setInteractive()
        }
        else if(gAux==2){
            this.help1=this.physics.add.image(gWidth/2, gHeight/2, "game-help2").setInteractive()
        }
        

        this.help1.on("pointerdown", function(pointer){
            thisScene.scene.stop()
            thisScene.scene.resume("GameScene")
        })
    }
}