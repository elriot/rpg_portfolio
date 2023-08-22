import { UNIT_SIZE } from "../util/constants";
import './Character.css';
// import './DialogBox.css';

function Character({ direction}) {    
    const classes = `character ${direction}`;
    return (
        <div style={{ ...UNIT_SIZE }} className="flex justify-center items-center">
            <div className={classes}></div>
        </div>
    );
}
export default Character;