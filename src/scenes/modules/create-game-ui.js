let createGameUI = (scene) => {

    scene.ui = {
        resources: {
            btn: {},
            bar: {}
        },
        glow: new Glow(scene),
        btnPause: new Button(scene, gWidth * 0.95, gHeight * 0.10, "ui-btn-pause", {
            onClick: ()=> {
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Pause','label':'{{Carrera Aérea}}','GameCategory':'{{game}}','Show':'{{44 Gatos}}'})
                console.log("Puase")
                scene.scene.pause()
                scene.scene.launch("PauseScene")
            }
        })
    }
}