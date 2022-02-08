let DATA = {}
DATA.isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
DATA.gameOrientation = "landscape"

DATA.resources = [
    "art",
    "gtr",
    "fun",

    "wtr",
    "sun",
    "slp",
]

DATA.resourcesConfig = {
    "art": {
        max: 1000,
        lossPerLoop: 15,
        winPerClick: 20
    },
    "gtr": {
        max: 1000,
        lossPerLoop: 10,
        winPerClick: 20
    },
    "fun": {
        max: 1000,
        lossPerLoop: 10,
        winPerClick: 20
    },

    "wtr": {
        max: 1000,
        lossPerLoop: 10,
        winPerClick: 20
    },
    "sun": {
        max: 1000,
        lossPerLoop: 10,
        winPerClick: 20
    },
    "slp": {
        max: 1000,
        lossPerLoop: 10,
        winPerClick: 20
    },
}

DATA.updateInterval = 1500

DATA.texts = {
    
}

DATA.debugMode = true