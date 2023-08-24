import { useNavigate } from "react-router-dom";
import MenuBox from "../components/MenuBox";
import { PAGE_SIZE } from "../util/constants";

const startDoor = {x:6, y:8};
function MenuPage ({className, size, onClick}) {    
    const styles = {...PAGE_SIZE, backgroundColor : "black"};
    const navigation = useNavigate();
    localStorage.setItem("portfolio", "false");
    const handleClickButton = (option) => {
        if (option === 'start') {
            navigation("/map1", { state: {position : startDoor}});
        } else {
            // console.log("how to ply")
        }
    }
    // console.log('MenuPage')
    return <div className={className} style={styles}>
        <MenuBox onClick={handleClickButton}></MenuBox>
    </div>
    
}
export default MenuPage;