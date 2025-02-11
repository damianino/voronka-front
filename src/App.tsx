import { useState, useRef, useEffect } from 'react'
import './App.css'

// Type for the API response
interface NowPlaying {
  station: {
    name: string;
    description: string;
  };
  now_playing: {
    song: {
      title: string;
      artist: string;
      art?: string;
    };
    elapsed: number;
    duration: number;
  };
  listeners: {
    current: number;
    total: number;
  };
}

function App() {
  const [playState, setPlayState] = useState<'stopped' | 'playing' | 'stopping'>('stopped')
  const [rotation, setRotation] = useState(0)
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const animationFrameRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(Date.now())

  // Fetch now playing info
  const fetchNowPlaying = async () => {
    try {
      const response = await fetch('http://xn--80aafhunugbapg.xn--p1ai/api/nowplaying/%D0%B2%D0%BE%D1%80%D0%BE%D0%BD%D0%BA%D0%B0')
      const data = await response.json()
      setNowPlaying(data)
    } catch (error) {
      console.error('Failed to fetch now playing info:', error)
    }
  }

  // Fetch initially and set up polling
  useEffect(() => {
    fetchNowPlaying()
    
    // Poll every 30 seconds when playing
    let interval: number | undefined
    if (playState === 'playing') {
      interval = window.setInterval(fetchNowPlaying, 30000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [playState])

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
      audioRef.current.src = "http://xn--80aafhunugbapg.xn--p1ai:8000/radio.mp3"
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
          <p>Listeners: {nowPlaying.listeners.current}</p>
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
    </div>
  )
}

export default App
