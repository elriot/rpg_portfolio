import { UNIT_SIZE } from "../util/constants";

function Character({ direction}) {    
    console.log(direction);
    // constc
    const classes = `character ${direction}`;
    console.log(classes);
    return (
        <div style={{ ...UNIT_SIZE }} className="flex justify-center items-center">
            <div className={classes}></div>
        </div>
    );
}
export default Character;