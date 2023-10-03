import Phaser from "phaser";

let apple: Phaser.Physics.Arcade.Sprite
let pole: Phaser.Physics.Arcade.Sprite
let bee: Phaser.Physics.Arcade.Sprite
let state: boolean = false
let isDrawing: boolean = false;

export default class PhysicsScene extends Phaser.Scene {
    constructor() {
        super({ 
            key: 'PhysicsScene', 
            active: true,
            physics: {
                arcade: {
                    gravity: {
                        y: 900
                    }
                }
            }
        })
    }

    preload = () => {}

    create = () => {
        this.addPole()
        this.addApple()

        var graphics = this.add.graphics();

        graphics.lineStyle(5, 0x00ff00)

        this.input.on('pointerdown', startDrawing);
        this.input.on('pointerup', stopDrawing);
        this.input.on('pointermove', drawLine);

        const bees = this.addBee()

        const button = this.add.sprite(400, 300, 'button')
        button.setInteractive()

        button.on('pointerdown', () => {
            state = !state

            if(state) {
                this.physics.moveTo(bees[0], apple.x, apple.y)
                this.physics.moveTo(bees[1], apple.x, apple.y)
                this.physics.moveTo(bees[2], apple.x, apple.y)

                this.physics.add.collider(bees[0], apple, () => {
                    this.physics.moveTo(bees[0], apple.x, apple.y, 100)
                })
                this.physics.add.collider(bees[1], apple, () => {
                    this.physics.moveTo(bees[1], apple.x, apple.y, 100)
                })
                this.physics.add.collider(bees[2], apple, () => {
                    this.physics.moveTo(bees[2], apple.x, apple.y, 100)
                })
            }
        })

        this.physics.add.collider(pole, apple)
    }

    update = () => {
        // this.physics.moveTo(bee, apple.x, apple.y, 100)
    }

    addPole = () => {
        pole = this.physics.add.sprite(350, 750, 'pole')
        pole.setCollideWorldBounds(true)
        pole.setImmovable(true)
        pole.setScale(7, 2)
        pole.body.allowGravity = false

    }

    addApple = () => {
        apple = this.physics.add.sprite(350, 615, 'apple')
        apple.setCollideWorldBounds(true)
        apple.setScale(3, 3)
        // apple.body.allowGravity = false
    }

    addBee = () => {
        const bee1 = this.physics.add.sprite(200, 500, 'bee')
        bee1.setCollideWorldBounds(true)
        bee1.setInteractive()
        bee1.setBounce(1, 1)
        bee1.body.allowGravity = false
        this.physics.add.collider(bee1, apple, () => {
            setTimeout(() => {
                bee1.setVelocity(0, 0)
                this.physics.moveTo(bee1, apple.x, apple.y, 100)
            }, 300)
        })

        const bee2 = this.physics.add.sprite(400, 500, 'bee')
        bee2.setCollideWorldBounds(true)
        bee2.setInteractive()
        bee2.setBounce(1, 1)
        bee2.body.allowGravity = false
        this.physics.add.collider(bee2, apple, () => {
            setTimeout(() => {
                bee2.setVelocity(0, 0)
                this.physics.moveTo(bee2, apple.x, apple.y, 100)
            }, 300)
        })

        const bee3 = this.physics.add.sprite(600, 500, 'bee')
        bee3.setCollideWorldBounds(true)
        bee3.setInteractive()
        bee3.setBounce(1, 1)
        bee3.body.allowGravity = false
        this.physics.add.collider(bee3, apple, () => {
            setTimeout(() => {
                bee3.setVelocity(0, 0)
                this.physics.moveTo(bee3, apple.x, apple.y, 100)
            }, 300)
        })
        const bees = [bee1, bee2, bee3];

        for (let i = 0; i < bees.length; i++) {
            for (let j = i + 1; j < bees.length; j++) {
                this.physics.add.collider(bees[i], bees[j], () => {
                    setTimeout(() => {
                        bees[i].setVelocity(0, 0)
                        bees[j].setVelocity(0, 0)
                        this.physics.moveTo(bees[i], apple.x, apple.y, 100)
                        this.physics.moveTo(bees[j], apple.x, apple.y, 100)
                    }, 300)
                });
            }
        }

        return bees
    }

    startDrawing = () => {
        isDrawing = true;

        graphics.beginPath();
        graphics.moveTo(pointer.x, pointer.y);
    }

    // apple 따라 다니기 물리법칙 X 
    // addBee = () => {
    //     const bee1 = this.add.particles(0, 0, 'bee', {
    //         speed: 100,
    //         scale: { start: 1, end: 0 },
    //         blendMode: 'ADD'
    //     })

    //     bee1.startFollow(apple)
    // }
}