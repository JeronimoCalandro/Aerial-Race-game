class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene")
    }
    preload() {
        this.load.image("preload-scene-bg", "assets/preload-scene/bg.png")
        this.load.image("preload-scene-logo", "assets/preload-scene/logo.png")
        this.load.image("ui-fillbar-top", "assets/ui/fillbar-top.png")
        this.load.image("ui-fillbar-bottom", "assets/ui/fillbar-bottom.png")
        this.load.image("ui-fillbar-aux", "assets/ui/fillbar-aux.png")
        this.load.audio("musicaS", gameConfig.assetsPath + "sound/splash.mp3")
    }
    create() {
        this.scene.start("PreloadScene")
        dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Start Game','label':'{{Carrera Aérea}}','GameCategory':'{{game}}','Show':'{{44 Gatos}}','Vertical Traffic':'{{vertical traffic}}'})
        console.log("Start Game")
    }
}

var g_pickups1 = 0
var g_pickups2 = 0
var g_pickups3 = 0
var g_chicken = 0
var g_lastpickup;
var g_scene = "LevelsScene"
var g_level
var finish = 0
var g_music = 1
var g_aux=1

class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene')
    }

    preload() {
        this.splash=this.sound.add("musicaS", {loop:true});
        this.splash.play()
        this.splash.volume =-0.3
        let bg = this.add.image(gWidth/2, gHeight, "preload-scene-bg")
        let logo = this.add.image(gWidth/2, gHeight * 0.4, "preload-scene-logo")
        this.time.add
        this.tweens.add({
            targets: logo,
            duration: 120,
            repeat: -1,
            repeatDelay: 2000,
            ease: "Circ",
            yoyo: 1,
            scale: 1.05
        })
         
        bg.setOrigin(0.5, 1)
        ScaleImageToWidth(bg, gWidth)

        // --- load bar ---
        let bar = new FillBar(this, gWidth/2, gHeight*0.75, gWidth*0.6, 160, 0)

        this.load.on("progress", (p) => {
            bar.update(p)
        })
        this.load.on("complete", ()=> {
            this.time.delayedCall(200, ()=> {
                this.scene.start("SplashScene")
            })
        })

        this.add.image(gWidth/2, gHeight*0.75, "ui-fillbar-aux").setScale(0.42,0.42)

        this.load.audio("splash", gameConfig.assetsPath + "sound/splash.mp3")
        this.load.audio("lose", gameConfig.assetsPath + "sound/lose.mp3")
        this.load.audio("bop", gameConfig.assetsPath + "sound/bop.mp3")
        this.load.audio("pista", gameConfig.assetsPath + "sound/pista.mp3")
        this.load.audio("level1", gameConfig.assetsPath + "sound/level1.mp3")
        this.load.audio("level2", gameConfig.assetsPath + "sound/level2.mp3")
        this.load.audio("level3", gameConfig.assetsPath + "sound/level3.mp3")
        this.load.audio("win", gameConfig.assetsPath + "sound/win.mp3")
        this.load.audio("finish", gameConfig.assetsPath + "sound/finish.mp3")

        this.load.audio("miautastico", gameConfig.assetsPath + "sound/miautastico.mp3")
        this.load.audio("loLograste", gameConfig.assetsPath + "sound/lo-lograste.mp3")
        this.load.audio("toca", gameConfig.assetsPath + "sound/toca.mp3")
        this.load.audio("titulo", gameConfig.assetsPath + "sound/titulo.mp3")
        this.load.audio("excelente", gameConfig.assetsPath + "sound/excelente.mp3")
        this.load.audio("mal", gameConfig.assetsPath + "sound/mal.mp3")
        this.load.audio("ayuda1", gameConfig.assetsPath + "sound/ayuda1.mp3")
        this.load.audio("ayuda2", gameConfig.assetsPath + "sound/ayuda2.mp3")
        this.load.audio("ayuda3", gameConfig.assetsPath + "sound/ayuda3.mp3")
        this.load.audio("nivel1", gameConfig.assetsPath + "sound/nivel1.mp3")
        this.load.audio("nivel2", gameConfig.assetsPath + "sound/nivel2.mp3")
        this.load.audio("nivel3", gameConfig.assetsPath + "sound/nivel3.mp3")

        this.load.image("pickup1", gameConfig.assetsPath + "game-ui/pickup1.png")
        this.load.image("pickup2", gameConfig.assetsPath + "game-ui/pickup2.png")
        this.load.image("pickup3", gameConfig.assetsPath + "game-ui/pickup3.png")
        this.load.image("fish", gameConfig.assetsPath + "game/chicken.png")

        this.load.spritesheet("fligth", gameConfig.assetsPath + "game/meatball-fligth.png", {
            frameWidth: 968,
            frameHeight: 790
        })
        this.load.spritesheet("crash", gameConfig.assetsPath + "game/meatball-crash.png", {
            frameWidth: 968,
            frameHeight: 760
        })
        this.load.spritesheet("plane", gameConfig.assetsPath + "game/meatball-plane.png", {
            frameWidth: 968,
            frameHeight: 760
        })
        this.load.spritesheet("fall", gameConfig.assetsPath + "game/meatball-fall.png", {
            frameWidth: 968,
            frameHeight: 760
        })

        this.load.spritesheet("pileta", gameConfig.assetsPath + "finish-scene/meatball-pileta.png", {
            frameWidth: 1200,
            frameHeight: 1080
        })

        // === UI ===
        this.loadElements([
            "btn-play",
            "btn-pause",
            "btn-restart-big",
            "btn-levels-big",
            "btn-return",
            "btn-help",
            "btn-sound",
            "planetext",
            "btn-mute"
        ], "ui", "image")

         // === GAME UI ===
         this.loadElements([
            "pickup1",
            "pickup2",
            "pickup3"
        ], "game-ui", "image")

        // === GAME SCENE ===
        this.loadElements([
            "meatball",
            "background",
            "cloud",
            "cloud2",
            "cloud3",
            "cloud4",
            "obstacle",
            "pickup1",
            "pickup2",
            "pickup3",
            "chicken",
            "chickenHUD",
            "pistasHUD",
            "meatballHUD",
            "sombraHUD",
            "vida1",
            "vida2",
            "vida3",
            "faceHUD",
            "btn-fall",
            "floor1",
            "floor2",
            "floor3",
            "help1",
            "help2",
        ], "game", "image")

        // === SPLASH SCENE ===
        this.loadElements([
            "bg",
            "logo",
            "meatball_splash",
            "brown-cat",
            "grey-cat"
        ], "splash-scene", "image")

        // === PAUSE SCENE ===
        this.loadElements([
            "btn-help",
            "btn-sound",
            "btn-music",
            "btn-restart",
            "btn-home",
            "btn-levels",
            "pause-cat",
            "pause",
            "pause-bg",
            "btn-musicmute"
            
        ], "pause-scene", "image")

        // === HELP SCENE ===
        this.loadElements([
            "help-bg",
            "btn-help",
            "help-cat",
            "help-help1",
            "help-help2",
            "help-help3",
            "help-help4",
            "help-help5",
            "help-left",
            "help-rigth",
            "btn-close",
            "help"
            
        ], "help-scene", "image")

        // === VICTORY SCENE ===
        this.loadElements([
            "victory",
            "victory-meatball",
            "victory-cats",
            "victory-star-left",
            "victory-star-mid",
            "victory-star-rigth",
            "victory-bg"

        ], "victory-scene", "image")

        // === DEFEAT SCENE ===
        this.loadElements([
            "defeat-bg",
            "defeat-meatball",
            "defeat-cats",
            "defeat"

        ], "defeat-scene", "image")

        // === LEVELS SCENE ===
        this.loadElements([
            "levels-bg",
            "levels-level1",
            "levels-level2",
            "levels-level3",
            "levels-btn-lv1",
            "levels-btn-lv2",
            "levels-btn-lv3",
            "level2block",
            "level3block",
            "block"
            
        ], "levels-scene", "image")

         // === FINISH SCENE ===
         this.loadElements([
            "background",
            "finish",
            "meatball",
            "present",
            "presentunlock",
            "backgroundpresent",
            "fishtransition",
            "final",
            "backgroundfinal"
            
        ], "finish-scene", "image")
    }

    loadElements(array, folder, type) {
        for (let elem of array) {
            switch(type) {
                case "image": {
                    this.load.image(folder + "-" + elem, gameConfig.assetsPath + folder + "/" + elem + ".png")
                    break
                }
            }
        }
    }
}