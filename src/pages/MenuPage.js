import { useNavigate } from "react-router-dom";
import MenuBox from "../components/MenuBox";
import { PAGE_SIZE } from "../util/constants";
import { useEffect } from "react";

const startDoor = {x:6, y:8};
function MenuPage ({className, size, onClick}) {    
    const styles = {...PAGE_SIZE, backgroundColor : "black"};
    const navigation = useNavigate();
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem("portfolio", "false");
        };
    
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    
    const handleClickButton = (option) => {
        if (option === 'start') {
            navigation("/map1", { state: {position : startDoor}});
        } else {
            // console.log("how to ply")
        }
    }
    return <div className={className} style={styles}>
        <MenuBox onClick={handleClickButton}></MenuBox>
    </div>
    
}
export default MenuPage;