export const StreamEndpoint = "https://xn--80aimpg.xn--80aafhunugbapg.xn--p1ai/radio.mp3"

// Type for the API response
export interface NowPlaying {
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
  

   // Fetch now playing info
export const fetchNowPlaying = async (): Promise<NowPlaying> => {
    try {
      const response = await fetch('https://xn--80aimpg.xn--80aafhunugbapg.xn--p1ai/api/nowplaying/воронка')
      const data = await response.json()
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }