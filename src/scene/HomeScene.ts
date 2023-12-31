import { configure } from "@testing-library/react"
import Phaser from "phaser"
import { useHistory } from "react-router"

// 배경
// let lastPointerPosition = { x: 0, y: 0 }

export default class HomeScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'HomeScene',
            active: true
        })
    }

    preload = () => {
        // 배경 JSON
        // this.load.tilemapTiledJSON('mapJ', 'json/map.json')
        this.load.image('map', '/img/map.png')
        this.load.image('building', '/img/building.png')
    }

    create = () => {
        this.addBuilding(300, 700, 'fly')
        this.addBuilding(700, 700, 'fruit')
        this.addBuilding(300, 1200, 'suger')
        this.addBuilding(700, 1200, 'oekaki')
    }

    // 마우스로 배경 움직이게 하는 코드
    // create = () => {
    //     const map = this.make.tilemap({ key: 'mapJ' })
    //     const tileset = map.addTilesetImage('map')

    //     if(tileset) {
    //         map.createLayer(0, tileset, 0, 0)
    //     }

    //     const cam = this.cameras.main
    //     cam.zoom = 1.2

    //     cam.setBounds(0, 0, 2100, 2100)

    //     const graphics = this.add.graphics()
    //     this.createPoint(graphics, 383, 979, 15, 'fly')
    //     this.createPoint(graphics, 1320, 1230, 15, 'fruit')
    //     this.createPoint(graphics, 1000, 920, 15, 'suger')
    //     this.createPoint(graphics, 1380, 979, 15, 'oekaki')

    //     let isDragging = false

    //     this.input.on('pointerdown', function (pointer: Phaser.Input.Pointer) {
    //         isDragging = true
    //         lastPointerPosition = { x: pointer.worldX, y: pointer.worldY }
    //         console.log(`x : ${pointer.x}, y : ${pointer.y}`)
    //     })

    //     this.input.on('pointerup', function (pointer: Phaser.Input.Pointer) {
    //         isDragging = false
    //     })

    //     this.input.on('pointermove', function (pointer: Phaser.Input.Pointer) {
    //         if (isDragging) {
    //             // cam.centerOn(pointer.worldX, pointer.worldY)
    //             const deltaX = pointer.worldX - lastPointerPosition.x;
    //             const deltaY = pointer.worldY - lastPointerPosition.y;

    //             // 카메라 이동 방향을 반대로 적용
    //             this.cameras.main.scrollX -= deltaX
    //             this.cameras.main.scrollY -= deltaY

    //             lastPointerPosition = { x: pointer.worldX, y: pointer.worldY }
    //         }
    //     })
    // }

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
                window.location.href = `/arcade/#/${name}`
            }
        })
    }

    addBuilding = (x: number, y: number, name: string) => {
        const building = this.add.image(x, y, 'building')
        building.setName(name)
        building.setScale(0.5)
        building.setInteractive()
        building.on('pointerdown', () => {
            console.log(name)
            if(building.name === 'oekaki') {
                window.location.href = 'http://alpha-game.oemoriplus.jp/'
            } else {
                window.location.href = `/arcade/#/${name}`
            }
        })

        const upperName = name.toUpperCase()

        const buildingText = this.add.text(x, y - 200, upperName, { fontSize: 30, fontStyle: 'bold', color: '#000000' })
        buildingText.setOrigin(0.5)
    }
}