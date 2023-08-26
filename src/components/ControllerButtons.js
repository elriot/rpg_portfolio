import { useLocation } from "react-router-dom";
import "./ControllerButtons.css";
import KeyButton from "./KeyButton";

function simulateKeyEvent(keyCode) {
    const event = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        key: keyCode
    });

    window.dispatchEvent(event);
}
const handleOnKeyPress = (event) => {
    simulateKeyEvent(event);
}

function ControllerButtons() {
    const location = useLocation();
    if (location.pathname === '/') {
        return null;
    }
    
    return (
            <div className="keyboard-container">
                <div className="keyboard-group">
                    <KeyButton className="arrow-key up" keyCode="ArrowUp" onKeyPress={handleOnKeyPress} keyName="▲" />                    
                    <div className="horizontal-keys">
                        <KeyButton className="arrow-key left" keyCode="ArrowLeft" onKeyPress={handleOnKeyPress} keyName="◀" />
                        <KeyButton className="arrow-key down" keyCode="ArrowDown" onKeyPress={handleOnKeyPress} keyName="▼" />
                        <KeyButton className="arrow-key right" keyCode="ArrowRight" onKeyPress={handleOnKeyPress} keyName="▶" />
                    </div>
                </div>
                <button className="enter-key" onClick={() => simulateKeyEvent("Enter")}>Enter</button>
            </div>
    );
}

export default ControllerButtons;