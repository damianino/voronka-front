import TicketInput from "../../components/casino/ticketInput";
import "./fonts.css"
import "./style.css"
import RulesBlock from "../../components/casino/rulesBlock";
import Machine from "../../components/casino/machine";
import SlotSpinner from "../../components/slotSpinner";


const CasinoPage = () => {
    return (
        <div className={"casino-page-container"}>
            <div className={"menu"}>
                <RulesBlock/>
                <TicketInput/>
            </div>
            {/*<Machine/>*/}
            <SlotSpinner/>
        </div>
    )
}

export default CasinoPage