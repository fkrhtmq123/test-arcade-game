import { useEffect, useRef } from "react"
import PhysicsScene from "../scene/PhysicsScene"
import PhysicsScene_matter from "../scene/PhysicsScene_matter"

let game: Phaser.Game

interface interfaceProp {}

const PhysicsContainer: React.FC<interfaceProp> = () => {
    const refFirstRef = useRef(true)

    useEffect(() => {
        const gameConfig = {
            type: Phaser.AUTO,
            width: 720,
            height: 1280,
            backgroundColor: '#182160',
            // scene: [PhysicsScene],
            scene: [PhysicsScene_matter],
            scale: {
                mode: Phaser.Scale.ScaleModes.FIT,
                parent: 'test',
            }
        }

        if (refFirstRef.current) {
            refFirstRef.current = false
            return
        }

        game = new Phaser.Game(gameConfig)

        return () => {
            game?.destroy(true)
          }
    }, [])

    return (
        <>
            <div id="test"></div>
        </>
    )
}

export default PhysicsContainer