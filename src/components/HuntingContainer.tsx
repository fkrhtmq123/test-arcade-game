import { useEffect, useRef } from "react"
import FruitScene from "../scene/FruitScene"
import HuntingScene from "../scene/HuntingScene"

let game: Phaser.Game

interface interfaceProp {}

const HuntingContainer: React.FC<interfaceProp> = () => {
    const refFirstRef = useRef(true)

    function reloadHandler() {
        window.location.reload()
    }

    useEffect(() => {
        const gameConfig = {
            type: Phaser.AUTO,
            width: 1080,
            height: 1920,
            backgroundColor: '#182160',
            scene: [HuntingScene],
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
            <button onClick={reloadHandler}>Reload</button>
            <div id="test"></div>
        </>
    )
}

export default HuntingContainer