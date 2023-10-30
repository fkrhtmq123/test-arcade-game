import { useEffect, useRef } from "react"
import HomeScene from "../scene/HomeScene"
import './HomeContainer.css'

let game: Phaser.Game

interface interfaceProp {}

const HomeContainer: React.FC<interfaceProp> = () => {
    const refFirstRef = useRef(true)

    function reloadHandler() {
        window.location.href = '/'
    }

    useEffect(() => {
        const gameConfig = {
            type: Phaser.AUTO,
            width: 1080,
            height: 1920,
            backgroundColor: '#77B97A',
            scale: {
                mode: Phaser.Scale.ScaleModes.FIT,
                parent: 'home',
            },
            callbacks: {
            },
            scene: [HomeScene]
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
            <div id="home"></div>
        </>
    )
}

export default HomeContainer