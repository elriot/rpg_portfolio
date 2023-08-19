import { UNIT_SIZE } from "../util/info";
import chImage from "../images/ch_1_.png";

function Character({ imageUrl }) {
    return (<div style={{...UNIT_SIZE}} >
        <img src={chImage}/>
    </div>
    );
}
export default Character;