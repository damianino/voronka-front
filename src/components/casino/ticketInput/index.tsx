import {useEffect, useRef} from "react";
import _ from "lodash";
import "./style.css"

const TicketInput = () => {
    const inputsRef = useRef([])

    useEffect(() => {
        if (inputsRef.current.length == 0) {
            return
        }

        inputsRef.current.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                inputsRef.current[index].value = inputsRef.current[index].value.toUpperCase()
                if (e.target.value.length === 1 && index < inputsRef.current.length - 1) {
                    console.log(inputsRef.current)
                    console.log(index - 1)
                    inputsRef.current[index].disabled = true;
                    inputsRef.current[index + 1].disabled = false;
                    inputsRef.current[index + 1].focus();
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !input.value && index > 0) {
                    inputsRef.current[index].disabled = true;
                    inputsRef.current[index - 1].disabled = false;
                    inputsRef.current[index - 1].focus();
                }
            });
        });

        inputsRef.current[0].focus()
        inputsRef.current[0].disabled = false
    }, []);

    return (
        <div className={"ticket-container"}>
            <img src="/casino/ticket.svg"/>
            <div className={"inputs-container"}>
                {_.range(0, 5).map((i) =>
                        <input
                            ref={(e) => inputsRef.current[i] = e}
                            key={i}
                            maxLength={1}
                            className="code-input"
                            disabled={true}
                        />)}
            </div>
        </div>
    )
}

export default TicketInput;