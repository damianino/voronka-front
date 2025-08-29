import {useEffect, useRef, useState} from "react";

type Props = {
    isSpinning: boolean
}
const LogoSpinner = ({isSpinning}: Props) => {
    const rotationRef = useRef<number>(0)
    const lastRotationRef = useRef<number>(0)
    const rotationSpeedRef = useRef<number>(0)
    const animationFrameRef = useRef<number>(0)
    const lastTimeRef = useRef<number>(Date.now())
    const imgRef = useRef<HTMLImageElement|null>(null)
    const vinylStopIntervalIDRef = useRef<string>("")

    const animate = (currentTime) => {
        if (!lastTimeRef.current) {
            lastTimeRef.current = currentTime
        }

        lastRotationRef.current = rotationRef.current

        const deltaTime = currentTime - lastTimeRef.current

        lastTimeRef.current = currentTime

        rotationRef.current = lastRotationRef.current + deltaTime * rotationSpeedRef.current

        animationFrameRef.current = requestAnimationFrame(animate)

        // @ts-ignore
        imgRef.current?.setAttribute("style", `transform: rotate(${rotationRef.current}deg)`)
    }

    useEffect(() => {
        animate(lastTimeRef.current)
    }, []);

    useEffect(() => {
        clearInterval(vinylStopIntervalIDRef.current)
        if (isSpinning) {
            // @ts-ignore
        vinylStopIntervalIDRef.current = setInterval(() => {
            rotationSpeedRef.current += 0.01
            if (rotationSpeedRef.current >= 0.07) {
                clearInterval(vinylStopIntervalIDRef.current)
            }
        }, 500)

            return
        }
        // @ts-ignore
        vinylStopIntervalIDRef.current = setInterval(() => {

            rotationSpeedRef.current -= 0.01
            if (rotationSpeedRef.current <= 0) {
                rotationSpeedRef.current = 0
                clearInterval(vinylStopIntervalIDRef.current)
            }
        }, 500)

    }, [isSpinning]);

    return (
        <img
            ref={imgRef}
            src="/logo.png"
            className="main-logo"
            alt="Logo"
        />
    )
}

export default LogoSpinner;