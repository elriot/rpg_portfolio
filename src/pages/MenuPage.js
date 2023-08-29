import { useNavigate } from "react-router-dom";
import MenuBox from "../components/MenuBox";
import { PAGE_SIZE } from "../util/constants";
import { useEffect, useState } from "react";
import HowToPlayModalBox from "../components/HowToPlayModalBox";
import "./MenuPage.css";

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
    return (
        <div className="menu-page-container" style={styles}>
            <p className="menu-page-title">Soopin Kim - portfolio</p>
            {!howToPlayVisible ? (
                <MenuBox onClick={handleClickButton} />
            ) : (
                <div className="how-to-play-container">
                    <HowToPlayModalBox onClick={handleCloseClick} />
                </div>
            )}
        </div>
    );

}
export default MenuPage;