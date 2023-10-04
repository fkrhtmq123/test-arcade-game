import Phaser from "phaser";

let apple: Phaser.Physics.Matter.Sprite
let pole: Phaser.Physics.Matter.Sprite

export default class PhysicsScene_matter extends Phaser.Scene {
    constructor() {
        super({ 
            key: 'PhysicsScene_matter', 
            active: true,
            physics: {
                matter: {
                    gravity: {
                        y: 0.8
                    }
                }
            }
        })
    }

    preload = () => {}

    create = () => {
        this.matter.world.setBounds(0, 0, 720, 1280)

        this.addPole()
        this.addApple()

        const lineCategory = this.matter.world.nextCategory()
        const sides = 4;
        const size = 14;
        const distance = size;
        const stiffness = 0.1;
        const lastPosition = new Phaser.Math.Vector2();
        const options = { friction: 0, frictionAir: 0, inertia: Infinity, isStatic: true, angle: 0, collisionFilter: { category: lineCategory } };

        let current = null;
        let previous: any = null;

        const curves: any = [];
        let curve: any = null;

        const graphics = this.add.graphics();

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            lastPosition.x = pointer.x;
            lastPosition.y = pointer.y;

            previous = this.matter.add.polygon(pointer.x, pointer.y, sides, size, options);

            curve = new Phaser.Curves.Spline([ pointer.x, pointer.y ]);

            curves.push(curve);
        })

        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (pointer.isDown) {
                const x = pointer.x;
                const y = pointer.y;

                if (Phaser.Math.Distance.Between(x, y, lastPosition.x, lastPosition.y) > distance) {
                    options.angle = Phaser.Math.Angle.Between(x, y, lastPosition.x, lastPosition.y);

                    lastPosition.x = x;
                    lastPosition.y = y;

                    current = this.matter.add.polygon(pointer.x, pointer.y, sides, size, options);

                    this.matter.add.constraint(previous, current, distance, stiffness);

                    previous = current;

                    curve.addPoint(x, y);

                    graphics.clear();
                    graphics.lineStyle(size * 1.5, 0xffffff);

                    curves.forEach((c: any) => {
                        c.draw(graphics, 64);
                    });
                }
            }
        });

        this.input.on('pointerup', () => {
            this.addBee()
        });
    }

    addPole = () => {
        pole = this.matter.add.sprite(350, 750, 'pole')
        pole.setScale(7, 2)
        pole.setStatic(true)
    }

    addApple = () => {
        apple = this.matter.add.sprite(350, 615, 'apple')
        apple.setScale(3, 3)
    }

    addBee = () => {
        const bee1 = this.matter.add.image(200, 500, 'bee')
        bee1.setInteractive()

        const bee2 = this.matter.add.image(400, 500, 'bee')
        bee2.setInteractive()

        setInterval(() => {
            this.moveToTarget(bee1)
            this.moveToTarget(bee2)
        }, 100)
    }

    moveToTarget = (bee: Phaser.Physics.Matter.Sprite | Phaser.Physics.Matter.Image) => {
        const currentPosition = new Phaser.Math.Vector2(bee.x, bee.y)
        const targetPosition = new Phaser.Math.Vector2(apple.x, apple.y)
        const direction = targetPosition.clone().subtract(currentPosition).normalize()

        const speed = 10

        this.matter.world.disableGravity()

        bee.x += direction.x * speed
        bee.y += direction.y * speed

        this.matter.world.d
    }

    configurePolygonGravity = (polygon: MatterJS.Body) => {
        //
    }
}