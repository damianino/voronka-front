import LogoSpinner from "../logoSpinner";
import {observer} from "mobx-react-lite";
import store from "../../store/store.ts";

const MainPlayer = observer(() => {
    return (
        <>
            <div className="logo-container">
                <LogoSpinner isSpinning={store.isPlaying}/>
            </div>

            {store.stream && (
                <div className="now-playing">
                    <h2>{store.stream.now_playing.song.artist} - {store.stream.now_playing.song.title}</h2>
                    <p>Слушают: {store.stream.listeners.current}</p>
                </div>
            )}

            <div className="player-container">
                <button
                    className="play-button"
                    onClick={() => {store.isPlaying = !store.isPlaying}}
                >
                    <img
                        src={store.isPlaying? '/pause.png' : '/play.png'}
                        alt={store.isPlaying ? 'Pause' : 'Play'}
                        className="control-icon"
                    />
                </button>
            </div>
            <div className="social-icons">
                <a href="https://instagram.com/radiovoronka" target="_blank" rel="noopener noreferrer">
                    <img src="/instagram.png" alt="Instagram" className="social-icon" />
                </a>
                <a href="https://t.me/radiovoronka" target="_blank" rel="noopener noreferrer">
                    <img src="/telegram.png" alt="Telegram" className="social-icon" />
                </a>
            </div>
        </>
    )
})

export default MainPlayer;