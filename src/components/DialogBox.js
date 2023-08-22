import React, { useEffect, useRef, useState } from 'react';
import './DialogBox.css';
import classNames from 'classnames';

function DialogBox({ text, isVisible, onClose, imageUrl, chName }) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        setCurrentTextIndex(0);
    }, [isVisible]);

    useEffect(() => {
        function handleKeyPress(event) {
            console.log("Key pressed in Dialog:", event.key);
            
            if (event.key === "Enter") {
                if (currentTextIndex < text.length - 1) {
                    setCurrentTextIndex(prevIndex => prevIndex + 1);                    
                } else {
                    onClose(); 
                }
            }
            event.stopPropagation();            
        }

        if (isVisible) {
            window.addEventListener('keydown', handleKeyPress);
        }
        
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentTextIndex, text, onClose]);
    if (!isVisible) return null;

    const textTag = text[currentTextIndex].indexOf("</a>") > -1
        ? <p dangerouslySetInnerHTML={{ __html:text[currentTextIndex] }} /> :
        <p>{text[currentTextIndex]}</p>;
        

    return (
        <div className={classNames("dialogBox", "container")}>
            <div className={classNames("dialogContent",)} >
                { imageUrl && 
                    <div className="dialogImageContainer">
                        <img src={imageUrl} alt="Dialog Character" />
                    </div>
                }
                <div className={classNames("dialogTextContainer", "pl-1", "text-lg")}>
                {chName && <p className='text-xl font-bold mb-2 text-yellow-400'>[{chName}]</p>}
                {textTag}
                </div>
            </div>
            <button onClick={onClose} style={{width:"10%"}} className=''> close </button>
        </div>
    );
}

export default DialogBox;
