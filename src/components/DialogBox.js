import React, { useEffect, useState } from 'react';
import './DialogBox.css';
import classNames from 'classnames';

function getImageByIndex(images, index) {
    if (!images) return null;
    if (images.length === 1)
        return images[0];
    else
        return images[index];
}
function DialogBox({ text, options, isVisible, onClose, characterImage, extraImage, chName, onOptionSelected, ...rest }) {
    const [index, setIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

    useEffect(() => {        
    }, [isVisible, selectedOptionIndex]);

    useEffect(() => {
        function handleKeyPress(event) {
            console.log("Key pressed in Dialog:", event.key);
            if (["Enter", " "].indexOf(event.key) > -1) {
                if(options && selectedOptionIndex !== null){
                    onOptionSelected(options[selectedOptionIndex]);   
                    return;                 
                } else {
                    if (index < text.length - 1) {
                        setIndex(prevIndex => prevIndex + 1);
                    } else {
                        onClose();
                    }
                }
            } else if (event.key === "ArrowUp") {
                setSelectedOptionIndex(prev => (prev - 1 + options.length) % options.length);
            } else if (event.key === "ArrowDown") {
                setSelectedOptionIndex(prev => (prev + 1) % options.length);
            }
            event.stopPropagation();
        }

        if (isVisible) {
            window.addEventListener("keydown", handleKeyPress);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [index, text, onClose, selectedOptionIndex]);
    if (!isVisible) return null;

    const currText = text[index];
    const currCharacter = getImageByIndex(characterImage, index);
    const currExtra = getImageByIndex(extraImage, index);


    const textTag = currText.indexOf("</a>") > -1
        ? <p dangerouslySetInnerHTML={{ __html: currText }} /> :
        <p>{currText}</p>;

    const handleOnSelected = () => {
        alert("hehe, selected", setSelectedOptionIndex);
        return;
    }

    return (
        <div>
            {currExtra &&
                <div className='extraImageContainer'>
                    <img src={currExtra} alt="extraImage" />
                </div>
            }
            <div className={classNames("dialogBox", "container")}>
                <div className={classNames("dialogContent",)} >
                    {currCharacter &&
                        <div className="dialogImageContainer">
                            <img src={currCharacter} alt="Dialog Character" />
                        </div>
                    }
                    <div className={classNames("dialogTextContainer", "text-lg")}>
                        {chName && <p className='text-xl font-bold mb-2 text-yellow-400'>[{chName}]</p>}
                        {textTag}
                        {options &&
                            <ul onChange={handleOnSelected}>
                                {options.map((option, index) => (
                                    <li
                                        key={option}
                                        style={{ fontWeight: index === selectedOptionIndex ? 'bold' : 'normal' }}
                                        onClick={() => setSelectedOptionIndex(index)}
                                    >
                                        <span style={{ visibility: index === selectedOptionIndex ? 'visible' : 'hidden' }}>▶</span> {option}
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                </div>
                <div className='controlContainer'>
                    <div className='text-gray-300'>[{index + 1}/{text.length}]</div>
                    <button onClick={onClose} className=''> CLOSE </button>
                </div>
            </div>
        </div >
    );
}

export default DialogBox;
