import { useEffect, useRef } from "react"
import FlyScene from "../scene/FlyScene"

let game: Phaser.Game

interface interfaceProp {}

const FlyContainer: React.FC<interfaceProp> = () => {
    const refFirstRef = useRef(true)

    function reloadHandler() {
        // window.location.reload()
        window.location.href = '/arcade/'
    }
    
    useEffect(() => {
        const gameConfig = {
            type: Phaser.AUTO,
            width: 1920,
            height: 1080,
            backgroundColor: '#182160',
            scene: [FlyScene],
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

export default FlyContainer