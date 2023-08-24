import React, { useEffect, useState } from 'react';
import './DialogBox.css';
import classNames from 'classnames';

function getImageByIndex(images, index) {
    if (!images) return null;
    return images.length === 1 ? images[0] : images[index];
}
function containsHTML(text) {
    const reg = /<\/?[a-z][\s\S]*>/i; 
    return reg.test(text);
}
function isBase64Image(src) {
    return /^data:image\/[^;]+;base64,/.test(src);
  }
function DialogBox({ text, options, isVisible, onClose, characterImage, extraImage, chName, onOptionSelected, ...rest }) {
    const [index, setIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    // const [imageLoaded, setImageL oaded] = useState(false);

    useEffect(() => {        
        // setImageLoaded(false);
    }, [isVisible, selectedOptionIndex]);

    useEffect(() => {
        function handleKeyPress(event) {
            if (["Enter", " "].indexOf(event.key) > -1) {
                if(options && selectedOptionIndex !== null){
                    onOptionSelected(options[selectedOptionIndex]);   
                    return;                 
                } else {
                    if (index < text.length - 1) {
                        setIndex(prevIndex => prevIndex + 1);
                    } else {
                        setIndex(0);
                        setSelectedOptionIndex(0);
                        onClose();
                    }
                }
            } else if (options) {
                if(event.key === "ArrowUp")
                    setSelectedOptionIndex(prev => (prev - 1 + options.length) % options.length);
                else if (event.key === "ArrowDown")
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


    const textTag = containsHTML(currText)
        ? <p dangerouslySetInnerHTML={{ __html: currText }} /> :
        <p>{currText}</p>;

    const handleClickClose = () => {
        setIndex(0);
        onClose();
    }
    // const handleLoadImage = (event) => {
    //     console.log("loaded", event.target);
    // }
    return (
        <div>
            {currExtra &&
                <div className='extraImageContainer'>
                    {
                        isBase64Image(currExtra)
                            ? <img src={currExtra} alt="extraImage" />
                            : (
                                <a href={currExtra} target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer' }}>
                                    <img src={currExtra} alt="extraImage" />
                                </a>
                            )
                    }
                </div>
            }
            <div className={classNames("dialogBox", "container")}>
                <div className={classNames("dialogContent",)} >
                    {currCharacter &&
                        <div className="dialogImageContainer">                            
                            <img
                                src={currCharacter}
                                alt="Dialog Character"
                            // onLoad={(event) =>{
                            //     console.log("gere")
                            //     handleLoadImage(event);
                            // }}
                            // onError={() => console.error('Failed to load image')}
                            />
                        </div>
                    }
                    <div className={classNames("dialogTextContainer", "text-lg")}
                        style={{width: (currCharacter? '80%' : '90%')}}  
                    >
                        {chName && <p className='text-xl font-bold mb-2 text-yellow-400'>[{chName}]</p>}
                        {textTag}
                        {options &&
                            <ul>
                                {options.map((option, index) => (
                                    <li
                                        key={option}
                                        style={{ fontWeight: index === selectedOptionIndex ? 'bold' : 'normal' }}                                        
                                        onClick={() => setSelectedOptionIndex(index)} 
                                    >
                                        <span style={{ visibility: index === selectedOptionIndex ? 'visible' : 'hidden' }}>▶</span> 
                                        <span className={classNames("pl-2", index === selectedOptionIndex ? "underline  decoration-solid" : "")}>{option}</span>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                </div>
                <div className='controlContainer'>
                    <div className='text-gray-300'>[{index + 1}/{text.length}]</div>
                    <button onClick={handleClickClose} className=''> CLOSE </button>
                </div>
            </div>
        </div >
    );
}

export default DialogBox;
