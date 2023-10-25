import { useEffect, useRef } from "react"
import HomeScene from "../scene/HomeScene"
import { IonContent } from "@ionic/react"

let game: Phaser.Game

interface interfaceProp {}

const HomeContainer: React.FC<interfaceProp> = () => {
    const refFirstRef = useRef(true)

    function reloadHandler() {
        // window.location.reload()
        window.location.href = '/arcade/'
    }

    useEffect(() => {
        const gameConfig = {
            type: Phaser.AUTO,
            width: 1080,
            height: 1920,
            backgroundColor: '#FFFFFF',
            scene: [HomeScene],
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

export default HomeContainer