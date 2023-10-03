import { useEffect } from "react"
import PhysicsScene from "../scene/PhysicsScene"

let game: Phaser.Game

interface interfaceProp {}

const PhysicsContainer: React.FC<interfaceProp> = () => {
    useEffect(() => {
        const gameConfig = {
            type: Phaser.AUTO,
            width: 720,
            height: 1280,
            backgroundColor: '#182160',
            scene: [PhysicsScene],
            scale: {
                mode: Phaser.Scale.ScaleModes.FIT,
                parent: 'test',
            }
        }

        game = new Phaser.Game(gameConfig)

        // return () => {
        //     game.destroy
        // }
    }, [])

    return (
        <>
            <div id="test"></div>
        </>
    )
}

export default PhysicsContainer