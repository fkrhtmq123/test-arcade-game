import Phaser from "phaser"

let fruitList = ['cherry', 'strawberry', 'grape', 'orange', 'persimmon', 'apple', 'pear', 'peach', 'pineapple', 'melon', 'watermelon']
let fruit: string = ""
let score: number = 0

export default class FruitScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'FruitScene',
            active: true,
            physics: {
                matter: {
                    gravity: {
                        y: 1
                    },
                    debug: false
                }
            }
        })
    }

    preload = () => {
        this.load.image('cherry', '/img/rsz_cherry.png')
        this.load.image('strawberry', '/img/rsz_strawberry.png')
        this.load.image('grape', '/img/rsz_grape.png')
        this.load.image('orange', '/img/rsz_orange.png')
        this.load.image('persimmon', '/img/rsz_persimmon.png')
        this.load.image('apple', '/img/rsz_apple.png')
        this.load.image('pear', '/img/rsz_pear.png')
        this.load.image('peach', '/img/rsz_peach.png')
        this.load.image('pineapple', '/img/rsz_pineapple.png')
        this.load.image('melon', '/img/rsz_melon.png')
        this.load.image('watermelon', '/img/rsz_watermelon.png')
    }

    create = () => {
        this.matter.world.setBounds(0, 0, 1080, 1920, undefined, true, true, true, true)
        const randomFruitNumber = Phaser.Math.Between(0, 4)
        const fruitName = fruitList[randomFruitNumber]
        fruit = fruitName

        const nextFruitText = this.add.text(100, 100, `次の果物 : ${fruitName}`, { fontSize: 40})
        const scoreText = this.add.text(100, 150, `Score : ${score}`, { fontSize: 40})

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.addFruit(pointer)
        })

        this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            const randomFruitNumber = Phaser.Math.Between(0, 4)
            const fruitName = fruitList[randomFruitNumber]
            fruit = fruitName

            const fruitObject = this.matter.world.localWorld.bodies
            fruitObject.forEach(body => {
                if(body.gameObject !== null) {
                    if(body.gameObject.name == 'fruit') {
                        body.gameObject.destroy()
                    }
                }
            })

            this.matter.add.image(900, 200, fruitName).setName('fruit').setStatic(true)

            nextFruitText.setText(`次の果物 : ${fruitName}`)
        })

        this.matter.world.on('collisionstart', (event: any) => {
            event.pairs.forEach((pair: any) => {
                const bodyA = pair.bodyA
                const bodyB = pair.bodyB

                const gameObjectA = bodyA.gameObject
                const gameObjectB = bodyB.gameObject

                if(gameObjectA !== null && gameObjectB !== null) {
                    if(gameObjectA.name === gameObjectB.name) {
                        if(gameObjectA.name === 'cherry') {
                            this.collisionFruit(gameObjectA, gameObjectB, 'strawberry', 70, 70)
                            this.scoreTextUpdate(1, scoreText)
                        }
                        
                        if(gameObjectA.name === 'strawberry') {
                            this.collisionFruit(gameObjectA, gameObjectB, 'grape', 90, 90)
                            this.scoreTextUpdate(3, scoreText)
                        }

                        if(gameObjectA.name === 'grape') {
                            this.collisionFruit(gameObjectA, gameObjectB, 'orange', 150, 150)
                            this.scoreTextUpdate(6, scoreText)
                        }

                        if(gameObjectA.name === 'orange') {
                            this.collisionFruit(gameObjectA, gameObjectB, 'persimmon', 200, 200)
                            this.scoreTextUpdate(10, scoreText)
                        }

                        if(gameObjectA.name === 'persimmon') {
                            this.collisionFruit(gameObjectA, gameObjectB, 'apple', 250, 250)
                            this.scoreTextUpdate(15, scoreText)
                        }

                        if(gameObjectA.name === 'apple') {
                            this.collisionFruit(gameObjectA, gameObjectB, 'pear', 300, 300)
                            this.scoreTextUpdate(21, scoreText)
                        }

                        if(gameObjectA.name === 'pear') {
                            this.collisionFruit(gameObjectA, gameObjectB, 'peach', 350, 350)
                            this.scoreTextUpdate(28, scoreText)
                        }

                        if(gameObjectA.name === 'peach') {
                            this.collisionFruit(gameObjectA, gameObjectB, 'pineapple', 400, 400)
                            this.scoreTextUpdate(36, scoreText)
                        }

                        if(gameObjectA.name === 'pineapple') {
                            this.collisionFruit(gameObjectA, gameObjectB, 'melon', 450, 450)
                            this.scoreTextUpdate(45, scoreText)
                        }

                        if(gameObjectA.name === 'melon') {
                            this.collisionFruit(gameObjectA, gameObjectB, 'watermelon', 500, 500)
                            this.scoreTextUpdate(55, scoreText)
                        }
                    }
                }
            })
        })
    }

    update = () => {}

    addFruit = (pointer: Phaser.Input.Pointer) => {
        const radius = 50
        const randomFruitNumber = Phaser.Math.Between(0, 4)
        const fruitName = fruitList[randomFruitNumber]
        const fruitObj = this.matter.add.image(pointer.x, pointer.y, fruit, undefined, {
            shape: {
                type: 'circle',
                radius: radius
            },
            restitution: 0.7,
            friction: 0.2,
            density: 0.1
        })
        fruitObj.setName(fruit)
        fruitObj.setDisplaySize(350, 350)

        if(fruitObj.name === 'cherry') {
            fruitObj.setDisplaySize(50, 50)
        }

        if(fruitObj.name === 'strawberry') {
            fruitObj.setDisplaySize(70, 70)
        }

        if(fruitObj.name === 'grape') {
            fruitObj.setDisplaySize(90, 90)
        }

        if(fruitObj.name === 'orange') {
            fruitObj.setDisplaySize(150, 150)
        }

        if(fruitObj.name === 'persimmon') {
            fruitObj.setDisplaySize(200, 200)
        }
    }

    collisionFruit = (objA: any, objB: any, next: string, sizeX: number, sideY: number) => {
        const newFruitX = (objA.x + objB.x) / 2
        const newFruitY = (objA.y + objB.y) / 2

        objA.destroy()
        objB.destroy()

        const newFruit = this.matter.add.image(newFruitX, newFruitY, next, undefined, {
            shape: {
                type: 'circle',
                radius: 50
            },
            restitution: 0.7,
            friction: 0.2,
            density: 0.1
        })
        newFruit.setName(next)
        newFruit.setDisplaySize(sizeX, sideY)
    }

    scoreTextUpdate = (scorePlus: number, scoreText: any) => {
        score += scorePlus
        scoreText.setText(`Score : ${score}`)
    }
    // create = () => {}
    // create = () => {}
    // create = () => {}
}