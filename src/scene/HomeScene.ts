import { configure } from "@testing-library/react"
import Phaser from "phaser"

let lastPointerPosition = { x: 0, y: 0 }

export default class HomeScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'HomeScene',
            active: true
        })
    }

    preload = () => {
        this.load.tilemapTiledJSON('mapJ', 'json/map.json')
        this.load.image('map', '/img/map.png')
    }

    create = () => {
        const map = this.make.tilemap({ key: 'mapJ' })
        const tileset = map.addTilesetImage('map')

        if(tileset) {
            map.createLayer(0, tileset, 0, 0)
        }

        const cam = this.cameras.main
        cam.zoom = 1.2

        cam.setBounds(0, 0, 2100, 2100)

        const graphics = this.add.graphics()
        this.createPoint(graphics, 383, 979, 15, 'Fly')
        this.createPoint(graphics, 1320, 1230, 15, 'Fruit')
        this.createPoint(graphics, 1000, 920, 15, 'suger')
        this.createPoint(graphics, 1380, 979, 15, 'oekaki')

        let isDragging = false

        this.input.on('pointerdown', function (pointer: Phaser.Input.Pointer) {
            isDragging = true
            console.log(`x : ${pointer.x}, y : ${pointer.y}`)
        })

        this.input.on('pointerup', function (pointer: Phaser.Input.Pointer) {
            isDragging = false
        })

        this.input.on('pointermove', function (pointer: Phaser.Input.Pointer) {
            if (isDragging) {
                cam.centerOn(pointer.worldX, pointer.worldY)
            }
        })
    }

    createPoint = (graphics: Phaser.GameObjects.Graphics, x: number, y: number, radius: number, name: string) => {
        graphics.fillStyle(0xff0000, 1)
        graphics.fillCircle(x, y, radius)
        graphics.setName(name)

        const nameText = this.add.text(x - 30, y - 50, name, { fontSize: 30, fontStyle: 'bold', color: '#000000' })
        nameText.setInteractive()
        nameText.setName(name)

        nameText.on('pointerdown', () => {

            if(nameText.name === 'oekaki') {
                window.location.href = 'http://alpha-game.oemoriplus.jp/'
            } else {
                window.location.href = `/${name}`
            }
        })
    }
}