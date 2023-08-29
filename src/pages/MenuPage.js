import { useNavigate } from "react-router-dom";
import MenuBox from "../components/MenuBox";
import { PAGE_SIZE } from "../util/constants";
import { useEffect, useState } from "react";
import HowToPlayModalBox from "../components/HowToPlayModalBox";

function MenuPage({ className, size, onClick }) {
    const styles = { ...PAGE_SIZE, backgroundColor: "#2f4f4f" };
    const [howToPlayVisible, setHowToPlayVisible] = useState(false);

    const navigation = useNavigate();
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem("portfolio", "false");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            // window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    const handleClickButton = (option) => {
        if (option === 'start') {
            navigation("/map1", { state: { position: { x: 6, y: 8 } } });
        } else {
            setHowToPlayVisible(!howToPlayVisible);
            console.log("modal click");
        }
    }
    const handleCloseClick = () => {
        setHowToPlayVisible(false);
    }
    return <div className="flex items-center justify-center relative" style={styles}>
        {!howToPlayVisible &&
            <MenuBox onClick={handleClickButton}></MenuBox>
        }
        {howToPlayVisible &&
            <div style={{ width: "80%", height: "80%" }}>
                <HowToPlayModalBox onClick={handleCloseClick}/>
            </div>
        }
    </div>

}
export default MenuPage;