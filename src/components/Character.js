import { UNIT_SIZE } from "../util/constants";
import chImage from "../images/ch_1_.png";

function Character({ imageUrl }) {
    return (<div style={{...UNIT_SIZE}} >
        <img src={chImage} alt="character"/>
    </div>
    );
}
export default Character;