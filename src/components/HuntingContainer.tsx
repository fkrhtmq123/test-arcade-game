import { useEffect, useRef } from "react"
import FruitScene from "../scene/FruitScene"
import HuntingScene from "../scene/HuntingScene"
import { useHistory } from "react-router"

let game: Phaser.Game

interface interfaceProp {}

const HuntingContainer: React.FC<interfaceProp> = () => {
    const refFirstRef = useRef(true)
    const history = useHistory()

    function reloadHandler() {
        // window.location.reload()
        window.location.href = '/arcade/'
    }

    useEffect(() => {
        console.log("hunting 실행!!!")
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

export default HuntingContainer