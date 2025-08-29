import {useState} from "react";
import {NowPlaying, NowPlayingMock} from "../../api/radio.ts";
import "./style.css"

const TopPlayer = () => {
    const [playState, setPlayState] = useState(false)
    const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(NowPlayingMock)

    const togglePlay = () => {
        setPlayState(!playState)
    }

    return (
        <div className={"topPlayer"}>
            <img
                src="/logo.png"
                alt="Logo"
            />
            <button
                className="playButton"
                onClick={togglePlay}
            >
                <img
                    src={playState ? '/pause.png' : '/play.png'}
                    alt={playState ? 'Pause' : 'Play'}
                    className="control-icon"
                />
            </button>
            {nowPlaying && (
                <div className="nowPlaying">
                    <h2>{nowPlaying.now_playing.song.artist} - {nowPlaying.now_playing.song.title}</h2>
                </div>
            )}
        </div>
    )
}

export default TopPlayer;