import bubbleImage  from '../images/bubble.png'
import './SpeechBubble.css';
function SpeechBubble () {
    return (
        <div className="speechBubble">
            <img src={bubbleImage} alt="bubble"></img>
        </div>
    );
}
export default SpeechBubble;