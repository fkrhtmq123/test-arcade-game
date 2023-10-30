import { useEffect, useRef } from "react"
import HuntingScene from "../scene/HuntingScene"

let game: Phaser.Game

interface interfaceProp {}

const HuntingContainer: React.FC<interfaceProp> = () => {
    const refFirstRef = useRef(true)

    useEffect(() => {
        const gameConfig = {
            type: Phaser.AUTO,
            width: 1080,
            height: 1920,
            backgroundColor: '#182160',
            scene: [HuntingScene],
            scale: {
                mode: Phaser.Scale.ScaleModes.FIT,
                parent: 'hunting',
            }
        }

        // if (refFirstRef.current) {
        //     refFirstRef.current = false
        //     return
        // }

        game = new Phaser.Game(gameConfig)

        return () => {
            // game?.destroy(true)
          }
    }, [])

    return (
        <>
            <div id="hunting"></div>
        </>
    )
}

export default HuntingContainer