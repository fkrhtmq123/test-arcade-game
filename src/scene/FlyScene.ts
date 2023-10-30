import Phaser from "phaser"

let fly: Phaser.Physics.Arcade.Image
let score: number = 0
let scoreText: Phaser.GameObjects.Text
let gameoverText: Phaser.GameObjects.Text
let gameStatus: boolean = false
let background: Phaser.GameObjects.TileSprite

export default class FlyScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'FlyScene',
            active: true,
            physics: {
                arcade: {
                    gravity: {
                        x: 0,
                        y: 1000
                    },
                    debug: false
                }
            }
        })
    }

    preload = () => {
        this.load.image('bird', '/img/bird.png')
        this.load.image('cloud', '/img/cloud.png')
        this.load.image('back', '/img/back.png')
        this.load.image('big', 'dist/img/big_item.png')
        this.load.image('small', 'dist/img/small_item.png')
    }

    create = () => {
        background = this.add.tileSprite(0, 0, 1920, 1080, 'back').setOrigin(0, 0)

        const camaraX = this.game.config.width / 2
        const camaraY = this.game.config.height / 2

        const graphics = this.add.graphics()

        graphics.fillStyle(0x808080, 0.5)
        graphics.fillRect(0, 0, 1920, 1080)
        graphics.setDepth(1)

        const startBtn = this.add.text(camaraX, camaraY, 'Start', { fontSize: 100, color: 'blue', fontStyle: 'bold' })
        startBtn.setOrigin(0.5)
        startBtn.setDepth(2)
        startBtn.setInteractive()
        startBtn.on('pointerdown', () => {
            startBtn.destroy()
            graphics.destroy()
            gameStatus = true
            this.addFly()
            scoreText.setText(`Score : 0`)
            score = 0
        })

        scoreText = this.add.text(1400, 100, `Score : ${score}`, { fontSize: 50, color: 'black', fontStyle: 'bold' })

        const scoreIncrementInterval = 1000

        this.time.addEvent({
            delay: scoreIncrementInterval,
            callback: this.plusScore,
            callbackScope: this,
            loop: true
        })

        let delay: number = 3000
        let createDelay: number = 1000

        var createCloud = setInterval(() => {

            if(gameStatus) {
                const randomY = Phaser.Math.Between(300, 1000);
                const clouds = this.physics.add.image(1900, randomY, 'cloud');
                clouds.body.allowGravity = false;
                clouds.setName(`${randomY}`)
                clouds.setScale(0.5, 0.5)
    
                let isOverlapping: boolean = false
                if (!isOverlapping) {
                    this.physics.add.overlap(fly, clouds, (fly, clouds) => {
                        if(!isOverlapping) {
                            console.log(isOverlapping);
                            score -= 50
                            const text = this.add.text(fly.x, fly.y, '악!!!!!', { fontSize: 50, color: 'black' })
                            setTimeout(() => {
                                text.destroy()
                            }, 250)
    
                            if(score < 0) {
                                gameStatus = false

                                const graphics = this.add.graphics()
                                
                                graphics.fillStyle(0x808080, 0.5)
                                graphics.fillRect(0, 0, 1920, 1080)
                                graphics.setDepth(1)
                                
                                gameoverText = this.add.text(camaraX, camaraY, 'Game Over', { fontSize: 100, color: 'red', fontStyle: 'bold' })
                                gameoverText.setOrigin(0.5)
                                gameoverText.setDepth(2)
                                scoreText.setText(`Score : 0`)
                                fly.destroy()

                                const restartBtn = this.add.text(camaraX, camaraY + 150, 'Restart', { fontSize: 100, color: 'blue', fontStyle: 'bold' })
                                restartBtn.setOrigin(0.5)
                                restartBtn.setDepth(2)
                                restartBtn.setInteractive()
                                restartBtn.on('pointerdown', () => {
                                    if(fly.displayList === null) {
                                        restartBtn.destroy()
                                        gameoverText.destroy()
                                        graphics.destroy()
                                        gameStatus = true

                                        delay = 3000
                                        createDelay= 1000

                                        createCloud

                                        this.addFly()
                                        scoreText.setText(`Score : 0`)
                                        score = 0
                                    }
                                })
                            } else {
                                scoreText.setText(`Score : ${score}`)
                            }
                        }
                        isOverlapping = true;
                    });
                }

                this.tweens.add({
                    targets: clouds,
                    x: -200,
                    duration: delay,
                    onComplete: () => {
                        setTimeout(() => {
                            clouds.destroy()
    
                            isOverlapping = false
                        }, 2000)
                    }
                })
            }

            if(score > 100 && delay === 3000) {
                delay = 2000
                createDelay = 500

                createCloud
            }

            if(score > 200 && delay === 2000) {
                delay = 1000
                createDelay = 300

                createCloud
            }
        }, createDelay)

        this.addItem()

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if(gameStatus) {
                if(fly.displayList === null) {
                    this.addFly()
                }

                fly.body.allowGravity = true
                fly.setVelocityY(-500)
            }
        })
    }

    update = () => {
        // console.log(fly.x)
        if(gameStatus) {
            background.tilePositionX += 1
        }
    }   

    addFly = () => {
        fly = this.physics.add.image(300, 500, 'bird')
        fly.setOrigin(0)
        fly.setDisplaySize(200,100)
        fly.body.allowGravity = false
    }

    addItem = () => {
        const randomTime = Phaser.Math.Between(5000, 8000)
        if(gameStatus) {
            const randomY = Phaser.Math.Between(100, 1000);
            const randomItemName = Phaser.Math.Between(0, 1)
    
            const itemName = ['small', 'big']
    
            const item = this.physics.add.image(1900, randomY, itemName[randomItemName])
            item.body.allowGravity = false
            item.setName(itemName[randomItemName])
            item.displayWidth

            item.setScale(0.2)
    
            this.tweens.add({
                targets: item,
                x: -200,
                duration: 3000,
                onComplete: () => {
                    setTimeout(() => {
                        item.destroy()
                    }, 2000)
                }
            })
    
            let isOverlapping: boolean = false

            if (!isOverlapping) {
                this.physics.add.overlap(fly, item, (fly: any, item: any) => {
                    if(!isOverlapping) {
                        if(item.name === 'small') {
                            score += 50
                            fly.setDisplaySize(fly.displayWidth - 30, fly.displayHeight - 30)
                            scoreText.setText(`Score : ${score}`)
                        }
    
                        if(item.name === 'big') {
                            score += 100
                            fly.setDisplaySize(fly.displayWidth + 30, fly.displayHeight + 30)
                            scoreText.setText(`Score : ${score}`)
                        }

                        item.destroy()
                    }
                    isOverlapping = true;
                });
            }
        }

        this.time.addEvent({ delay: randomTime, callback: this.addItem })
    }

    plusScore = () => {
        if(gameStatus) {
            score += 10
            scoreText.setText(`Score : ${score}`)
        }
    }

    restartHandler = (btn: any) => {
        this.create
        gameStatus = true
        score = 0
        btn.destory()
    }
}