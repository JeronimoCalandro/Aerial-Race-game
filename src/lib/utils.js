class UTILS {
    static showDesignLines(scene) {
        let graph = scene.add.graphics()
        graph.lineStyle(5, 0x00ff00, 0.3)

        for (let i = 1; i <= 9; i++) {
            graph.lineBetween(gWidth * i / 10, 0, gWidth * i / 10, gHeight)
        }
        for (let j = 1; j <= 9; j++) {
            graph.lineBetween(0, gHeight * j / 10, gWidth, gHeight * j / 10)
        }

        //if (!scene._pointerDebugText)
        scene._pointerDebugText = scene.add.text(20, 20, "(no pointer)", {
            fontSize: 40, 
            fontStyle: "bold", 
            color: "#fff", 
            stroke: "#000", 
            strokeThickness: 4
        })

        scene.input.on("pointermove", (p) => scene._pointerDebugText.setText(Math.floor(p.x) + " x " + Math.floor(p.y)))
    }
}


// --- Audio ---
let Audio = {
    sounds: {},
    volume: parseInt(localStorage.getItem("vol")) || 1
}

Audio.setVolume = (v)=> {
    for (let s of Object.values(Audio.sounds)) {
        s.setMute(!v)
    }
    Audio.volume = v
    localStorage.setItem("vol", v)
}

Audio.switchVolume = ()=> {
    let newVolume = Audio.volume? 0 : 1
    Audio.setVolume(newVolume)
}

Audio.play = (key) => {
    Audio.sounds[key].play()
}

Audio.stopAll = ()=> {
    for (let s of Object.values(Audio.sounds)) {
        s.stop()
    }
}

// --- Array ----
let removeFromArray = (arr, element) => {
    return arr.filter((elem) => {
        return elem != element
    })
}

let ScaleImageToWidth = (image, width)=> {
    image.setScale(width / image.displayWidth)
}