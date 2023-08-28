import "./ModalBox.css";
import image01 from "../images/howtoplay/01.png";
import image02 from "../images/howtoplay/02.png";
import image03 from "../images/howtoplay/03.png";
function ModalBox({ style, onClick }) {
    return (
        <div className="modal-container">
            <button className="modal-close-button" onClick={() => { onClick() }}>close</button>
            <div className="modal-contents-container">
                <div className="title-container">
                    <p className="title">HOW TO PLAY </p>
                    <p className="subtitle">- this web app is developed for PC browsers</p>
                </div>
                <b className="modal-category">1. Move Character</b>
                <img className="modal-image keyboard-image" src={image03} alt="keyImage"></img>
                <p>use keyboard arrow keys or click controller buttons</p>
                <b className="modal-category">2. Move Character</b>
                <div className="image-row-container">
                    <img className="modal-image character-image" src={image01} alt="chracter"></img>
                    <img className="modal-image character-image" src={image02} alt="chracter"></img>
                </div>
                <p>Speech bubble appears when you look at an event object on accurate direction.</p>
                <p>You can make a conversation by pressing the Enter key or the space bar.</p>
            </div>

        </div>
    )
}

export default ModalBox;
