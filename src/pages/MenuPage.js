import { useNavigate } from "react-router-dom";
import MenuBox from "../components/MenuBox";
import { PAGE_SIZE } from "../util/info";

function MenuPage ({className, size, onClick}) {    
    const styles = {...PAGE_SIZE, backgroundColor : "black"};
    const navigate = useNavigate();

    const handleClickButton = (option) => {
        if (option === 'start') {
            navigate('/map1');
        } else {
            console.log("how to ply")
        }
    }
    console.log('MenuPage')
    return <div className={className} style={styles}>
        <MenuBox onClick={handleClickButton}></MenuBox>
    </div>
    
}
export default MenuPage;