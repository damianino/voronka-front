export const StreamEndpoint = "https://xn--80aimpg.xn--80aafhunugbapg.xn--p1ai:8000/radio.mp3"

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

export const NowPlayingMock: NowPlaying = {
    listeners: {current: 0, total: 0},
    station: {description: "", name: ""},
    now_playing: {
        song: {
            title: "name",
            artist: "artist",
            art: "",
        },
        elapsed: 123,
        duration: 345,
    }
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