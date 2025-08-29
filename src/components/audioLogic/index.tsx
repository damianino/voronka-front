import {observer} from "mobx-react-lite";
import store from "../../store/store.ts";
import {AudioHTMLAttributes, useEffect, useRef, useState} from "react";
import {fetchNowPlaying, NowPlaying, StreamEndpoint} from "../../api/radio.ts";


const AudioLogic = observer(() => {
    const localRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        store.audioRef = localRef
        store.startStreamPoller()
    }, []);

    // // Clean up on unmount
    useEffect(() => {
        return () => {
            if (localRef.current) {
                localRef.current.pause()
                localRef.current.src = ''
                localRef.current.load()
            }
        }
    }, [])
    //
    // // Fetch initially and set up polling
    // useEffect(() => {
    //     localRef.current.src = StreamEndpoint
    //     localRef.current.load()
    //     // store.startStreamPoller()
    // }, [])
    //
    useEffect(() => {
        console.log(store.audioRef.current)
        if (!store.audioRef.current) {
            store.setIsPlaying(false)
            return
        }

        if (store.isPlaying) {
            console.log("playing")

            localRef.current.src = StreamEndpoint
            localRef.current.load()

            localRef.current.play().then(e => console.log(e)).catch(e => console.log(e))

        }else {
            console.log("stop")

            localRef.current.pause()
        }
    }, [store.isPlaying])

    return (
        <>
            <audio
                ref={localRef}
                onError={(e) => {
                    console.error('Audio stream error:', e)
                    store.setIsPlaying(false)
                }}
            />
        </>
    )
})

export default AudioLogic;