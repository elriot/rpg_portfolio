import React, { useEffect, useState } from 'react';
import './DialogBox.css';
import classNames from 'classnames';

function getImageByIndex(images, index){
    if(!images) return null;
    if(images.length === 1)
        return images[0];
    else
        return images[index];
}
function DialogBox({ text, isVisible, onClose, characterImage, extraImage, chName }) {
    // console.log("Dialog");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setIndex(0);
    }, [isVisible]);

    useEffect(() => {
        function handleKeyPress(event) {
            console.log("Key pressed in Dialog:", event.key);
            if (["Enter", " "].indexOf(event.key) > -1) {
                if (index < text.length - 1) {
                    setIndex(prevIndex => prevIndex + 1);
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
    }, [index, text, onClose]);
    if (!isVisible) return null;

    const currText = text[index];
    const currCharacter = getImageByIndex(characterImage, index);
    const currExtra = getImageByIndex(extraImage, index);


    const textTag = currText.indexOf("</a>") > -1
        ? <p dangerouslySetInnerHTML={{ __html: currText }} /> :
        <p>{currText}</p>;

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
                    </div>
                </div>
                <div className='controlContainer'>
                    <div className='text-gray-300'>[{index + 1}/{text.length}]</div>
                    <button onClick={onClose} className=''> CLOSE </button>
                </div>
            </div>
        </div>
    );
}

export default DialogBox;
