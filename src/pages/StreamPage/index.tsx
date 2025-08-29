import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import './style.css';

const StreamPage = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // HLS stream URL
        const streamUrl = 'http://xn--80aafhunugbapg.xn--p1ai:8080/hls/voronka.m3u8';

        if (Hls.isSupported()) {
            const hls = new Hls({
                enableWorker: false,
            });
            hlsRef.current = hls;

            hls.loadSource(streamUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log('HLS manifest parsed, starting playback');
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error('HLS error:', data);
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.log('Fatal network error encountered, try to recover');
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.log('Fatal media error encountered, try to recover');
                            hls.recoverMediaError();
                            break;
                        default:
                            console.log('Fatal error, cannot recover');
                            hls.destroy();
                            break;
                    }
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support (Safari)
            video.src = streamUrl;
        } else {
            console.error('HLS is not supported in this browser');
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, []);

    return (
        <div className="stream-page-container">
            <img 
                src="/logo copy.png" 
                alt="Channel Logo" 
                className="channel-logo"
            />
            <video
                ref={videoRef}
                className="hls-video"
                controls
                muted
                autoPlay
                playsInline
            />
        </div>
    );
};

export default StreamPage;
