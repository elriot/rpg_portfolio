import { IoGameControllerOutline } from "react-icons/io5";
import BGMController from "./BGMController";
import "./TopMenu.css";

function TopMenu({ onClick, isOn }) {
    const keyControllerClass = isOn ? 'keyboard-controller-button visible' : 'keyboard-controller-button';
    const handleToggle = () => {
        onClick();
    }
    const handleDoubleClick = (e) => {
        // console.log("eee")
        e.preventDefault();
    };
    return (
        <div className='top-controller' onDoubleClick={handleDoubleClick}>
            <div className='bgm-controller'><BGMController /></div>
            <IoGameControllerOutline onClick={handleToggle} className={keyControllerClass} />
        </div>
    );
}
export default TopMenu;