import React, { useRef } from 'react';

function KeyButton({ className, keyCode, onKeyPress, keyName }) {
    const intervalRef = useRef(null);

    const handleMouseDown = () => {
        onKeyPress(keyCode);

        intervalRef.current = setInterval(() => {
            onKeyPress(keyCode);
        }, 100);
    };

    const handleMouseUp = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    return (
        <button
            className={className}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {keyName}
        </button>
    );
}

export default KeyButton;
