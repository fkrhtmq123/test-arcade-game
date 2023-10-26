import { useEffect, useRef } from "react"
import SugerScene from "../scene/SugerScene"

let game: Phaser.Game

interface interfaceProp {}

const SugerContainer: React.FC<interfaceProp> = () => {
    const refFirstRef = useRef(true)

    function reloadHandler() {
        // window.location.reload()
        window.location.href = '/arcade/'
    }

    useEffect(() => {
        console.log("suger 실행!!!")
        const gameConfig = {
            type: Phaser.AUTO,
            width: 1080,
            height: 1920,
            backgroundColor: '#FFFFFF',
            scene: [SugerScene],
            scale: {
                mode: Phaser.Scale.ScaleModes.FIT,
                parent: 'test',
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
            <button onClick={reloadHandler}>Reload</button>
            <div id="test"></div>
        </>
    )
}

export default SugerContainer