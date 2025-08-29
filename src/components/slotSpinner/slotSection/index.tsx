import {useState} from "react";
import "./style.css"

const SlotSection = () => {
    const [imgSources, setImageSources] = useState<Array<string>>(["/logo.png", "/logo.png", "/logo.png"])
    // const []
    return (
        <div className={"slot-section"}>
            <img src={imgSources[0]}/>
            <line/>
            <img src={imgSources[1]}/>
            <line/>
            <img src={imgSources[2]}/>
        </div>
    )
}

export default SlotSection