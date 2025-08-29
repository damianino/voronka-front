import {fetchNowPlaying, NowPlaying, StreamEndpoint} from "../api/radio.ts";
import {RefObject} from "react";
import {makeAutoObservable, runInAction} from "mobx";

type ViewMode = "mainPlayer" | "chat"

class AppStore {
    viewMode: ViewMode = "mainPlayer"

    isPlaying: boolean = false
    stream: NowPlaying | null = null
    audioRef: RefObject<HTMLAudioElement>

    isReady: boolean = false

    constructor() {
        makeAutoObservable(this);
    }

    startStreamPoller = async () => {
        let res = await fetchNowPlaying()
        runInAction(() => {
            this.stream = res
        })

        window.setInterval(async () => {
            let res = await fetchNowPlaying()
            runInAction(() => {
                this.stream = res
            })
        }, 1000)
    }

    setIsPlaying = (isPlaying: boolean) => {
        runInAction(() => {
            this.isPlaying = isPlaying
        })
    }
}

const appStore = new AppStore()

export default appStore;