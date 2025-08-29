import '/src/styles/App.css'
import MainPlayer from "../components/mainPlayer";
import AudioLogic from "../components/audioLogic";


function Index() {
    return (
    <div className="app-container">
        <MainPlayer/>
        <AudioLogic/>
    </div>
    )
}

export default Index
