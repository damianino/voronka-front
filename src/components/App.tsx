import { useState, useRef, useEffect } from 'react'
import '/src/styles/App.css'
import { StreamEndpoint, NowPlaying, fetchNowPlaying } from '../api/radio.ts'


function App() {
  const [playState, setPlayState] = useState<'stopped' | 'playing' | 'stopping'>('stopped')
  const [rotation, setRotation] = useState(0)
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const animationFrameRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(Date.now())

 

  // Fetch initially and set up polling
  useEffect(() => {
    fetchNowPlaying().then(setNowPlaying)
    window.setInterval(() => fetchNowPlaying().then(setNowPlaying), 1000)
  }, [])

  // Animation function
  const animate = (currentTime: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = currentTime
    }

    const deltaTime = currentTime - lastTimeRef.current
    lastTimeRef.current = currentTime

    if (playState === 'playing') {
      // Rotate 360 degrees over 20 seconds (same as previous CSS animation)
      setRotation(prev => (prev + (deltaTime * 0.018)) % 360)
      animationFrameRef.current = requestAnimationFrame(animate)
    } else if (playState === 'stopping') {
      // Decelerate to nearest 360 degrees
      const targetRotation = Math.ceil(rotation / 360) * 360
      const newRotation = rotation + (deltaTime * 0.3) // Adjust speed as needed
      
      if (newRotation <= targetRotation) {
        setRotation(0)
        setPlayState('stopped')
      } else {
        setRotation(newRotation)
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }
  }

  // Start/stop animation based on playState
  useEffect(() => {
    if (playState === 'playing' || playState === 'stopping') {
      lastTimeRef.current = 0
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [playState])

  const togglePlay = () => {
    if (!audioRef.current) {
      return
    }

    if (playState === 'playing') {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current.load()
      setPlayState('stopping')
    } else {
      audioRef.current.src = StreamEndpoint
      audioRef.current.load()
      audioRef.current.play()
      setPlayState('playing')
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current.load()
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <>
      <div className="app-container">
        <div className="logo-container">
          <img 
            src="/logo.png"
            className="main-logo"
            alt="Logo" 
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </div>
        
        {nowPlaying && (
          <div className="now-playing">
            <h2>{nowPlaying.now_playing.song.artist} - {nowPlaying.now_playing.song.title}</h2>
            <p>Слушают: {nowPlaying.listeners.current}</p>
          </div>
        )}
        
        <div className="player-container">
          <button 
            className="play-button"
            onClick={togglePlay}
          >
            <img 
              src={playState === 'playing' ? '/pause.png' : '/play.png'} 
              alt={playState === 'playing' ? 'Pause' : 'Play'}
              className="control-icon"
            />
          </button>
          
          <audio
            ref={audioRef}
            onError={(e) => {
              console.error('Audio stream error:', e)
              setPlayState('stopped')
            }}
          />
        </div>
        <div className="social-icons">
          <a href="https://instagram.com/radiovoronka" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.png" alt="Instagram" className="social-icon" />
          </a>
          <a href="https://t.me/radiovoronka" target="_blank" rel="noopener noreferrer">
            <img src="/telegram.png" alt="Telegram" className="social-icon" />
          </a>
        </div>
      </div>
    </>
  )
}

export default App
