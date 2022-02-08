class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
    }

    create() 
    {
        g_scene = "GameScene";
        this.energycont = 4;
        this.chickencont = 0;
        this.overlapTriggered = true;
        this.globalchicken = 0;
        this.aux=0;
        this.pickupcont=0;
        this.pickupcant=0;
        var x = gWidth/2;
        var y =gHeight/2;
        this.auxdos=1;
        this.state = 0;

        this.carita = [
            {x:x+200, y:y},
            {x:x-200, y:y},
            {x:x, y:y-300},
            {x:x, y:y+400},
            {x:x, y:y+150},
            {x:x+150, y:y+380},
            {x:x+300, y:y+360},
            {x:x+450, y:y+260},
            {x:x+490, y:y+100},
            {x:x+450, y:y-70},
            {x:x+415, y:y-190},
            {x:x+410, y:y-300},
            {x:x+405, y:y-410},
            {x:x+250, y:y-350},
            {x:x+120, y:y-280},
            {x:x+640, y:y+100},
            {x:x+790, y:y+100},
            {x:x+600, y:y+300},
            {x:x+750, y:y+340},
            {x:x+600, y:y-110},
            {x:x+750, y:y-150},

            {x:x-150, y:y+380},
            {x:x-300, y:y+360},
            {x:x-450, y:y+260},
            {x:x-490, y:y+100},
            {x:x-450, y:y-70},
            {x:x-415, y:y-190},
            {x:x-410, y:y-300},
            {x:x-405, y:y-410},
            {x:x-250, y:y-350},
            {x:x-120, y:y-280},
            {x:x-640, y:y+100},
            {x:x-790, y:y+100},
            {x:x-600, y:y+300},
            {x:x-750, y:y+340},
            {x:x-600, y:y-110},
            {x:x-750, y:y-150},
        ]

        this.rectangulo = [
            {x:x, y:y},
            {x:x+100, y:y},
            {x:x+200, y:y},
            {x:x+300, y:y},
            {x:x, y:y+100},
            {x:x+100, y:y+100},
            {x:x+200, y:y+100},
            {x:x+300, y:y+100},
            {x:x, y:y+200},
            {x:x+100, y:y+200},
            {x:x+200, y:y+200},
            {x:x+300, y:y+200},
            {x:x, y:y+300},
            {x:x+100, y:y+300},
            {x:x+200, y:y+300},
            {x:x+300, y:y+300},
            {x:x, y:y+400},
            {x:x+100, y:y+400},
            {x:x+200, y:y+400},
            {x:x+300, y:y+400},
            {x:x, y:y+500},
            {x:x+100, y:y+500},
            {x:x+200, y:y+500},
            {x:x+300, y:y+500},
            {x:x, y:y+600},
            {x:x+100, y:y+600},
            {x:x+200, y:y+600},
            {x:x+300, y:y+600},
            {x:x, y:y+700},
            {x:x+100, y:y+700},
            {x:x+200, y:y+700},
            {x:x+300, y:y+700},
            {x:x, y:y+800},
            {x:x+100, y:y+800},
            {x:x+200, y:y+800},
            {x:x+300, y:y+800},
        ]

        this.circle = [
            {x:x+100, y:y},
            {x:x+200, y:y},
            {x:x, y:y+100},
            {x:x+100, y:y+100},
            {x:x+200, y:y+100},
            {x:x+300, y:y+100},
            {x:x, y:y+200},
            {x:x+100, y:y+200},
            {x:x+200, y:y+200},
            {x:x+300, y:y+200},
            {x:x, y:y+300},
            {x:x+100, y:y+300},
            {x:x+200, y:y+300},
            {x:x+300, y:y+300},
            {x:x+100, y:y+400},
            {x:x+200, y:y+400},
        ]

        if(g_level==1){
            this.timer1 = this.time.addEvent({
                delay: 2000,
                callback: () => {
                    Help1();
                }
            })
            function Help1(){
                gAux=1
                thisScene.scene.pause()
                thisScene.scene.launch("AuxScene")
            }
    
            this.timer1 = this.time.addEvent({
                delay: 7000,
                callback: () => {
                    Help2();
                }
            })
            function Help2(){
                gAux=2
                thisScene.scene.pause()
                thisScene.scene.launch("AuxScene")
            }
        }

        

        //  MUSICA
        this.bop=this.sound.add("bop", {loop:false});
        this.pista=this.sound.add("pista", {loop:false});
        this.level1=this.sound.add("level1", {loop:true});
        this.level2=this.sound.add("level2", {loop:true});
        this.level3=this.sound.add("level3", {loop:true});

        this.nivel1=this.sound.add("nivel1", {loop:false});
        this.nivel2=this.sound.add("nivel2", {loop:false});
        this.nivel3=this.sound.add("nivel3", {loop:false});

        this.cursor = this.input.keyboard.createCursorKeys();
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.physics.world.setBoundsCollision(true,true,false,false);

        createGameUI(this)
        
        this.background=this.physics.add.image(gWidth/2, gHeight/2, "game-background");

        // PISO
        switch(g_level){
            case 1:
                this.floor=this.physics.add.image(gWidth/2, gHeight*18, "game-floor1");
                this.pickup = this.physics.add.image(gWidth * Phaser.Math.Between(2,8)*0.1,-1600,"game-pickup1");
                this.pickupsVelocity = 3;
                this.level1.play()
                this.level1.volume =-0.3
                this.nivel1.play()
                break;
            case 2:
                this.floor=this.physics.add.image(gWidth/2, gHeight*27, "game-floor2");
                this.pickup = this.physics.add.image(gWidth * Phaser.Math.Between(2,8)*0.1,-1600,"game-pickup2");
                this.pickupsVelocity = 3.80;
                this.level2.play()
                this.level2.volume =-0.3
                this.nivel3.play()
                break;
            case 3: 
                this.floor=this.physics.add.image(gWidth/2, gHeight*36, "game-floor3");
                this.pickup = this.physics.add.image(gWidth * Phaser.Math.Between(2,8)*0.1,-1600,"game-pickup3");
                this.pickupsVelocity = 4.30;
                this.level3.play()
                this.level3.volume =-0.3
                this.nivel2.play()
                break;
        }
        
        // NUBES
        this.cloud = this.physics.add.image(gWidth*0.13,gHeight*0.08,"game-cloud");
        this.cloud.setVelocityY(-200 * this.pickupsVelocity);
        this.cloud2 = this.physics.add.image(gWidth*0.38,gHeight/2,"game-cloud2");
        this.cloud2.setVelocityY(-100 * this.pickupsVelocity);
        this.cloud3 = this.physics.add.image(gWidth*0.63,gHeight*0.75,"game-cloud3");
        this.cloud3.setVelocityY(-150 * this.pickupsVelocity);
        this.cloud4 = this.physics.add.image(gWidth*0.88,gHeight*0.15,"game-cloud4");
        this.cloud4.setVelocityY(-175 * this.pickupsVelocity);
        this.floor.setVelocityY(-100 * this.pickupsVelocity);
        // PICK UPS
        
        // GRUPO 
        this.fishGroup = this.physics.add.group({
            key: "fish", 
            frameQuantity: 80,
            setScale: { x: 0.30, y: 0.30},
            immovable: true,
        })
        this.fishGroup.rotate(192);
        this.fishGroup.setVelocityY(-250*this.pickupsVelocity);
        this.children = this.fishGroup.getChildren();

        this.pickup.setVelocityY(-110 * this.pickupsVelocity);
        this.pickup.body.immovable = true;
        this.pickup.setScale(0.3);
        this.pickup.setCollideWorldBounds(true);
        this.chicken = this.physics.add.image(gWidth * Phaser.Math.Between(2,8)*0.1,-900,"game-chicken");
        this.chicken.setVelocityY(-250 * this.pickupsVelocity);
        this.chicken.body.immovable = true;
        this.chicken.setScale(0.3);
        this.chicken.setCollideWorldBounds(true);

        this.obstacle = this.physics.add.image(gWidth * Phaser.Math.Between(2,8)*0.1,-200,"game-obstacle");
        this.obstacle.setVelocityY(500);
        this.obstacle.body.immovable = true;
        this.tweens.add({
            targets: this.obstacle,
            rotation: 15,
            alpha: 1,
            duration: 120000,
            ease: "Power3"
        })

        // ANIMACIONES
        this.fligth = this.physics.add.sprite(gWidth/2,gHeight/2, "fligth").setScale(0.5)/*.setImmovable*/;
        this.anims.create({
            key: 'fligth',
            frames: this.anims.generateFrameNumbers('fligth', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'crash',
            frames: this.anims.generateFrameNumbers('crash', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'plane',
            frames: this.anims.generateFrameNumbers('plane', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('fall', { start: 0, end: 12 }),
            frameRate: 15,
            repeat: -1
        });
        this.fligth.on('animationcomplete', () => {
            this.fligth.anims.play('fligth');
        });
        this.fligth.body.immovable = true;
        this.fligth.setSize(250,250);
        this.fligth.setCollideWorldBounds(true);

        // RECTANGULOS
        this.right = this.add.rectangle(gWidth*0.75, gHeight/2, gWidth/2, gHeight);
        this.right.setInteractive();
        this.left = this.add.rectangle(gWidth*0.25, gHeight/2, gWidth/2, gHeight);
        this.left.setInteractive();
        this.btnfall = this.add.image(gWidth*0.90, gHeight*0.85, "game-btn-fall").setScale(0.95,0.95);
        this.btnfall.setInteractive();

        this.btnfall.on("pointerdown", ()=>{
            this.aux=0;
            if(this.chickencont>=10){
                this.chickencont=0;
            }
            if(this.floor.y>=gHeight*1.5){
                this.pickupsVelocity=6;
                this.fligth.anims.play('fall', true);
                this.btnfall.setScale(0.90,0.90);
            }
        })
        this.btnfall.on("pointerup", ()=>{
            if(this.aux==0){
                this.fligth.anims.play('fligth', true);
                this.btnfall.setScale(0.95,0.95);
                switch(g_level){
                    case 1:
                        this.pickupsVelocity=3;                    
                        break;
                    case 2:
                        this.pickupsVelocity=4;
                        break;
                    case 3: 
                        this.pickupsVelocity=5;
                        break;
                }
            }
        })

        this.right.on("pointerdown", ()=>{
            this.state=1;
        })
        this.right.on("pointerup", ()=>{
            if(this.state==1){
                this.state=0;
            }
        })
        this.left.on("pointerdown", ()=>{
            this.state=2; 
        })
        this.left.on("pointerup", ()=>{
            if(this.state==2){
                this.state=0;
            }
        })


        // COLIDERS
        this.physics.add.collider(this.fligth, this.pickup, ()=> {
            this.pickup1Collider()
        }, null);

        this.physics.add.collider(this.fligth, this.chicken, ()=> {
            this.chickenCollider()
        }, null);

        this.physics.add.collider(this.fligth, this.obstacle, ()=> {
            this.obstacleCollider()
        }, null);

        this.physics.add.overlap(this.fligth, this.fishGroup, fishCollider);
        let thisScene = this
        function fishCollider (fligth, fish){
            thisScene.chickencont++;
            thisScene.globalchicken++;
            thisScene.fishGroup.killAndHide(fish);
            fish.body.enable = false;
            thisScene.bop.play();
        }

        // HUD
        this.planetext=this.add.image(gWidth/2, gHeight*0.20, "ui-planetext").setVisible(false);
        this.add.image(gWidth*0.12, gHeight*0.18, "game-pistasHUD");
        this.add.image(gWidth*0.10, gHeight*0.10, "game-meatballHUD");
        this.vida1=this.add.image(gWidth*0.07, gHeight*0.099, "game-vida1");
        this.vida2=this.add.image(gWidth*0.10, gHeight*0.099, "game-vida2");
        this.vida3=this.add.image(gWidth*0.13, gHeight*0.099, "game-vida2");
        this.vida4=this.add.image(gWidth*0.158, gHeight*0.099, "game-vida3");
        this.add.image(gWidth*0.053, gHeight*0.105, "game-faceHUD");
        switch(g_level){
            case 1:
                this.pickup1HUD=this.add.image(gWidth*0.098, gHeight*0.20, "game-ui-pickup1").setScale(0.2,0.2);
                this.pickupText=this.add.text(gWidth*0.118,gHeight*0.185,this.pickupcont + "/10",{      
                    fontSize:"32px",
                    fill:"#fff",
                    fontFamily:"verdana,arial,sans-serif"
                });
                break;
            case 2:
                this.pickup1HUD=this.add.image(gWidth*0.098, gHeight*0.20, "game-ui-pickup2").setScale(0.2,0.2);
                this.pickupText=this.add.text(gWidth*0.118,gHeight*0.185,this.pickupcont + "/15",{      
                    fontSize:"32px",
                    fill:"#fff",
                    fontFamily:"verdana,arial,sans-serif"
                });
                break;
            case 3: 
                this.pickup1HUD=this.add.image(gWidth*0.098, gHeight*0.20, "game-ui-pickup3").setScale(0.2,0.2);
                this.pickupText=this.add.text(gWidth*0.118,gHeight*0.185,this.pickupcont + "/20",{      
                    fontSize:"32px",
                    fill:"#fff",
                    fontFamily:"verdana,arial,sans-serif"
                });
                break;
        }
        // TIMER
        this.timer1 = this.time.addEvent({
            delay: 15000,
            loop: true,
            callback: () => {
                this.SpawnFace();
            }
        })
        this.timer2 = this.time.addEvent({
            delay: 10000,
            loop: true,
            callback: () => {
                this.SpawnRectangle();
            }
        })
        this.timer3 = this.time.addEvent({
            delay: 20000,
            loop: true,
            callback: () => {
                this.SpawnCircle();
            }
        })
    }
    
    update(time) {
        if(g_music==1){
            this.level1.setMute(false);
            this.level2.setMute(false);
            this.level3.setMute(false);
        }
        else{
            this.level1.setMute(true);
            this.level2.setMute(true);
            this.level3.setMute(true);
        }

        if(this.state==1){
            this.fligth.setVelocityX(800);
            this.fligth.flipX = false;
            this.aux=0;
        }
        else if(this.state==2){
            this.fligth.setVelocityX(-800);
            this.fligth.flipX = true;
            this.aux=0;
        }
        else{
            this.fligth.setVelocityX(0);
        }

        if(this.energycont<4){
            this.vida4.setVisible(false);
        }
        if(this.energycont<3){
            this.vida3.setVisible(false);
        }
        if(this.energycont<2){
            this.vida2.setVisible(false);
        }
        if(this.energycont<1){
            this.vida1.setVisible(false);
        }

        if(this.cursor.left.isDown){
            this.fligth.setVelocityX(-800);
            this.fligth.flipX = true;
            this.aux=1;
        }
        else if(this.cursor.right.isDown){
            this.fligth.setVelocityX(800);
            this.fligth.flipX = false;
            this.aux=1;
        }
        else{
            if(this.aux==1){
                this.fligth.setVelocityX(0);
                    if(this.space.isDown){
                        if(this.floor.y>gHeight*1.5){
                            if(this.chickencont>=10){
                                this.chickencont=0;
                            }
                            this.pickupsVelocity=6;
                            this.fligth.anims.play('fall', true);
                        }
                        else{
                            this.fligth.anims.play('fligth', true);
                        } 
                    }
                    else if(this.space.isUp){
                        switch(g_level){
                            case 1:
                                this.pickupsVelocity=3;                    
                                break;
                            case 2:
                                this.pickupsVelocity=4;
                                break;
                            case 3: 
                                this.pickupsVelocity=5;
                                break;
                        }
                    }
            }
        }

        if(this.energycont<=0){
            this.sound.stopAll()
            g_lastpickup = this.pickupcont
            g_chicken=this.globalchicken
            this.scene.stop("GameScene")
            this.scene.start("DefeatScene")
        }

        if(this.floor.y<=gHeight*0.92){
            this.floor.setVelocityY(0);
            this.pickupsVelocity=0;
            this.fligth.setVelocityY(0);
            this.timer4 = this.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    this.Finish();
                }
            })
        }

        if(this.floor.y>=gHeight*1.5){
            if(this.overlapTriggered){
                if(this.chickencont>=10){
                    if(this.auxdos==1){
                        this.planetext.setVisible(true)
                    }
                    this.timer4 = this.time.addEvent({
                        delay: 2000,
                        loop: false,
                        callback: () => {
                            this.PlaneText();
                        }
                    })
                    this.fligth.anims.play("plane", true);
                    this.pickupsVelocity=1.50;
                    this.time.addEvent({
                        delay: 5000,
                        loop: false,
                        callback: () => {
                            this.Plane();
                        }
                    })
                }
                else if(this.chickencont<10 && this.pickupsVelocity<5.50){
                    this.fligth.anims.play('fligth', true); 
                }
            }

            switch(g_level){
                case 1:
                    if(this.pickupcant<10){
                        if(this.pickup.y<-200){
                            this.pickup.setPosition(gWidth* Phaser.Math.Between(2,8)*0.1, gHeight*1.7);
                            this.pickupcant++;
                        }
                    }
                    else{
                        this.pickup.setVelocityY(0);
                    }                    
                    break;
                case 2:
                    if(this.pickupcant<15){
                        if(this.pickup.y<-200){
                            this.pickup.setPosition(gWidth* Phaser.Math.Between(2,8)*0.1, gHeight*1.7);
                            this.pickupcant++;
                        }
                    }
                    else{
                        this.pickup.setVelocityY(0);
                    }
                    break;
                case 3: 
                    if(this.pickupcant<20){
                        if(this.pickup.y<-200){
                            this.pickup.setPosition(gWidth* Phaser.Math.Between(2,8)*0.1, gHeight*1.7);
                            this.pickupcant++;
                        }
                    }
                    else{
                        this.pickup.setVelocityY(0);
                    }
                    break;
            }
    
            if(this.chicken.y<-200){
                this.chicken.setPosition(gWidth* Phaser.Math.Between(2,8)*0.1, 1100);
                this.overlapTriggered = true;
                if(g_level==2 || g_level==3){
                    if(Phaser.Math.Between(0,1)==0){
                        this.chicken.setVelocityX(500)
                    }
                    else{
                        this.chicken.setVelocityX(-500)
                    }
                }
            }
    
            if(this.obstacle.y>1200){
                this.obstacle.setPosition(gWidth* Phaser.Math.Between(2,8)*0.1, -200);
                this.overlapTriggered = true;
            }
    
            if(this.cloud.y<-200){
                this.cloud.setPosition(gWidth*0.13, 1200);
            }
            if(this.cloud2.y<-200){
                this.cloud2.setPosition(gWidth*0.38, 1200);
            }
            if(this.cloud3.y<-200){
                this.cloud3.setPosition(gWidth*0.63, 1200);
            }
            if(this.cloud4.y<-200){
                this.cloud4.setPosition(gWidth*0.88, 1200);
                this.cloud.setVelocityY()
            }
        }
        this.floor.setVelocityY(-100*this.pickupsVelocity);
        this.pickup.setVelocityY(-110*this.pickupsVelocity);
        this.chicken.setVelocityY(-250*this.pickupsVelocity);
        this.cloud.setVelocityY(-200 * this.pickupsVelocity);
        this.cloud2.setVelocityY(-100 * this.pickupsVelocity);
        this.cloud3.setVelocityY(-150 * this.pickupsVelocity);
        this.cloud4.setVelocityY(-175 * this.pickupsVelocity);
    }

    // FUNCIONES
    pickup1Collider(){
        this.bop.play();
        this.tweens.add({
            targets: this.pickup1HUD,
            scale: 0.35,
            alpha: 1,
            duration: 100,
            yoyo: true,
            ease: "Power3"
        })
        this.pickupcont++;
        
        switch(g_level){
            case 1:
                this.pickupText.setText(this.pickupcont + "/10");
                if(this.pickupcant<10){
                    this.pickup.setPosition(gWidth* Phaser.Math.Between(2,8)*0.1, gHeight*2.5);
                    this.pickupcant++;
                }
                else{
                    this.pickup.setPosition(-10000,-10000);
                } 
                break;
            case 2:
                this.pickupText.setText(this.pickupcont + "/15");
                if(this.pickupcant<15){
                    this.pickup.setPosition(gWidth* Phaser.Math.Between(2,8)*0.1, gHeight*2.5);
                    this.pickupcant++;
                }
                else{
                    this.pickup.setPosition(-10000,-10000);
                } 
                break;
            case 3: 
                this.pickupText.setText(this.pickupcont + "/20");
                if(this.pickupcant<20){
                    this.pickup.setPosition(gWidth* Phaser.Math.Between(2,8)*0.1, gHeight*2.5);
                    this.pickupcant++;
                }
                else{
                    this.pickup.setPosition(-10000,-10000);
                } 
                break;
        }
        
    }

    chickenCollider(){
        this.chicken.setPosition(gWidth* Math.random(0.3,0.7), 1100);
        this.chickencont++;
        this.globalchicken++;
        this.bop.play();
    }

    obstacleCollider(){
        if(this.overlapTriggered){
            this.energycont--;
            this.overlapTriggered = false;
            this.fligth.anims.play('crash', true);
            this.pista.play();
            if(this.chickencont>=10){
                this.chickencont=0;
                this.pickupsVelocity=3;
            }
        }
    }
    
    SpawnRectangle(){
        if(this.floor.y>=gHeight*1.5){
            for( var i = 0; i<36; i++){ 
                this.children[i].body.enable = true;
                this.children[i].setVisible(true);
                this.children[i].x=this.rectangulo[i].x-600;
                this.children[i].y=this.rectangulo[i].y+1000;
            }
        }
    }
    SpawnFace(){
        if(this.floor.y>=gHeight*1.5){
            for( var i = 0; i<37; i++){
                this.children[i].body.enable = true;
                this.children[i].setVisible(true);
                this.children[i].x=this.carita[i].x;
                this.children[i].y=this.carita[i].y+1500;
            }
        }
    }
    SpawnCircle(){
        if(this.floor.y>=gHeight*1.5){
            for( var i = 0; i<16; i++){ 
                this.children[i].body.enable = true;
                this.children[i].setVisible(true);
                this.children[i].x=this.circle[i].x;
                this.children[i].y=this.circle[i].y+2500;
            }
        }
    }

    Plane(){
        this.chickencont=0;
        this.auxdos=1
        switch(g_level){
            case 1:
                this.pickupsVelocity=3;                    
                break;
            case 2:
                this.pickupsVelocity=4;
                break;
            case 3: 
                this.pickupsVelocity=5;
                break;
        }
    }

    PlaneText(){
        this.auxdos=0
        this.planetext.setVisible(false);
    }

    Finish(){
        this.fligth.anims.play('fligth', true);  
        switch(g_level){
            case 1:
                if(this.pickupcont>g_pickups1){
                    g_pickups1=this.pickupcont
                }
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Successful - Level {{Nivel 1}}','label':'{{Carrera Aérea}}','GameCategory':'{{game}}','Show':'{{44 Gatos}}'})
                console.log("DKW - Successful Level (Level 1)")
                break;
            case 2:
                if(this.pickupcont>g_pickups2){
                    g_pickups2=this.pickupcont
                }
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Successful - Level {{Nivel 2}}','label':'{{Carrera Aérea}}','GameCategory':'{{game}}','Show':'{{44 Gatos}}'})
                console.log("DKW - Successful Level (Level 2)")
                break;
            case 3: 
                if(this.pickupcont>g_pickups3){
                    g_pickups3=this.pickupcont
                }
                dataLayer.push({'event':'ga_event','category':'Games','action':'DKW - Successful - Level {{Nivel 3}}','label':'{{Carrera Aérea}}','GameCategory':'{{game}}','Show':'{{44 Gatos}}'})
                console.log("DKW - Successful Level (Level 3)")
                break;
        }
        g_lastpickup = this.pickupcont
        g_chicken=this.globalchicken
        this.sound.stopAll()
        this.scene.stop("GameScene")
        this.scene.start("VictoryScene")
    }
}

var debText