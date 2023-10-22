import Phaser from "phaser";

let fly: Phaser.Physics.Arcade.Image
let isOverlapping: boolean = false
let score: number = 0
let scoreText: Phaser.GameObjects.Text
let gameoverText: Phaser.GameObjects.Text

export default class FlyScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'FlyScene',
            active: true,
            physics: {
                arcade: {
                    gravity: {
                        x: 0,
                        y: 500
                    },
                    debug: true
                }
            }
        })
    }

    preload = () => {}

    create = () => {
        this.addFly()

        scoreText = this.add.text(1400, 100, `Score : ${score}`, { fontSize: 50 })

        const scoreIncrementInterval = 1000

        this.time.addEvent({
            delay: scoreIncrementInterval,
            callback: this.plusScore,
            callbackScope: this,
            loop: true
        })

        setInterval(() => {
            const randomY = Phaser.Math.Between(300, 1000);
            const clouds = this.physics.add.image(1900, randomY, 'block');
            clouds.body.allowGravity = false;
            clouds.setName(`${randomY}`)

            if (!isOverlapping) {
                this.physics.add.overlap(fly, clouds, (fly, clouds) => {
                    if(!isOverlapping) {
                        console.log(isOverlapping);
                        score -= 50

                        if(score < 0) {
                            const camaraX = this.cameras.main.x / 2
                            const camaraY = this.cameras.main.y / 2
                            gameoverText = this.add.text(camaraX, camaraY, 'Game Over', { fontSize: 100 })
                        } else {
                            scoreText.setText(`Score : ${score}`)
                        }
                    }
                    isOverlapping = true;
                });
            }

            this.tweens.add({
                targets: clouds,
                x: 0,
                duration: 5000,
                onComplete: () => {
                    setTimeout(() => {
                        clouds.destroy()

                        isOverlapping = false
                    }, 2000)
                }
            });
        }, 2000)

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            fly.body.allowGravity = true
            fly.setVelocityY(-300)
        })
    }

    update = () => {}

    addFly = () => {
        fly = this.physics.add.image(300, 500, 'fly')
        fly.setOrigin(0)
        fly.setDisplaySize(100,100)
        fly.body.allowGravity = false
    }

    addBlock = () => {
        setInterval(() => {
            const randomY = Phaser.Math.Between(300, 1000);
            const block = this.physics.add.image(1900, randomY, 'block');
            block.body.allowGravity = false;

            this.tweens.add({
                targets: block,
                x: 0,
                duration: 5000,
                onComplete: () => {
                    setTimeout(() => {
                        block.destroy()
                    }, 2000)
                }
            });

            this.physics.world.overlap(fly, block, (fly, block) => { console.log(fly) }, undefined, this)
        }, 1000)
    }

    plusScore = () => {
        score += 10
        scoreText.setText(`Score : ${score}`)
    }
}