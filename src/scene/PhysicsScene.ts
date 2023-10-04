import { options } from "ionicons/icons";
import Phaser from "phaser";

let apple: Phaser.Physics.Arcade.Sprite
let pole: Phaser.Physics.Arcade.Sprite
let bee: Phaser.Physics.Arcade.Sprite
let state: boolean = false
let isDrawing: boolean = false;
let graphics: Phaser.GameObjects.Graphics
let drawnTexture: any

let bees
const sides = 4
const size = 14
const distance = size
const stiffness = 0.1
let current: any = null
let previous: any = null
const curves: any[] = []
let curve: any = null

let lastPosition = new Phaser.Math.Vector2()

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

        this.physics.add.collider(pole, apple)

        graphics = this.add.graphics();

        const options = { friction: 0, frictionAir: 0, restitution: 0, ignoreGravity: true, inertia: Infinity, isStatic: true, angle: 0 }

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            lastPosition.x = pointer.x;
            lastPosition.y = pointer.y;

            console.log(pointer.x)

            previous = this.add.polygon(pointer.x, pointer.y)

            // curve = new Phaser.Curves.Spline([pointer.x, pointer.y])
            // curves.push(curve)
        });
        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if(pointer.isDown) {
                const x = pointer.x
                const y = pointer.y
    
                if(Phaser.Math.Distance.Between(x, y, lastPosition.x, lastPosition.y) > distance) {
                    options.angle = Phaser.Math.Angle.Between(x, y, lastPosition.x, lastPosition.y)

                    lastPosition.x = x;
                    lastPosition.y = y;

                    current = this.add.polygon(x, y)

                    previous = current;

                    curve.addPoint(x, y)

                    graphics.clear();
                    graphics.lineStyle(size * 1.5, 0xffffff);

                    curves.forEach(c =>
                    {
                        c.draw(graphics, 64);
                    });
                }
            }
        });
        this.input.on('pointerup', this.stopDrawing);
    }

    update = () => {
        if(drawnTexture) {
            drawnTexture = null
        }
    }

    addPole = () => {
        pole = this.physics.add.sprite(350, 750, 'pole')
        pole.setCollideWorldBounds(true)
        pole.setImmovable(true)
        pole.setScale(7, 2)
        pole.setInteractive()
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
        this.physics.add.collider(bee1, apple)

        const bee2 = this.physics.add.sprite(400, 500, 'bee')
        bee2.setCollideWorldBounds(true)
        bee2.setInteractive()
        bee2.setBounce(1, 1)
        bee2.body.allowGravity = false
        this.physics.add.collider(bee2, apple)

        const bee3 = this.physics.add.sprite(600, 500, 'bee')
        bee3.setCollideWorldBounds(true)
        bee3.setInteractive()
        bee3.setBounce(1, 1)
        bee3.body.allowGravity = false
        this.physics.add.collider(bee3, apple)

        setInterval(() => {
            this.physics.moveTo(bee1, apple.x, apple.y, 500)
            this.physics.moveTo(bee2, apple.x, apple.y, 500)
            this.physics.moveTo(bee3, apple.x, apple.y, 500)
        }, 100)

        bees = [bee1, bee2, bee3];
        return bees
    }

    startDrawing = (pointer: Phaser.Input.Pointer) => {
        isDrawing = true;
        if(drawnTexture) {
            drawnTexture = null
        }
        // graphics.clear();
        // graphics.lineStyle(8, 0x000000)
        // graphics.beginPath();
        // graphics.moveTo(pointer.x, pointer.y);
    }

    stopDrawing = (pointer: Phaser.Input.Pointer) => {
        isDrawing = false

        if(!isDrawing) {
            graphics.closePath();

            const bees = this.addBee()
    
            for (let i = 0; i < bees.length; i++) {
                for (let j = i + 1; j < bees.length; j++) {
                    this.physics.add.collider(bees[i], bees[j]);
                }
            }

            graphics.clear()
            return
        }
    }

    drawLine = (pointer: Phaser.Input.Pointer, options: any) => {
        // if(!isDrawing) {
        //     return
        // }

        // graphics.lineTo(pointer.x, pointer.y)
        // graphics.strokePath()

        
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