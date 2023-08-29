import './App.css';
import MenuPage from './pages/MenuPage';
import MapStartPage from './pages/MapStartPage';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MapLeftPage from './pages/MapLeftPage';
import MapUpPage from './pages/MapUpPage';
import { PortfolioProvider } from './context/PortfolioContext';
import ControllerButtons from "./components/ControllerButtons"
import { useState } from 'react';
import TopMenu from './components/TopMenu';

function setZoom() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const widthZoom = (windowWidth / 960) > 1 ? 1: (windowWidth / 960);
    const heightZoom = (windowHeight / 800) > 1 ? 1: (windowHeight / 800);
    // console.log(windowWidth, windowHeight, widthZoom, heightZoom)
    document.body.style.zoom = Math.min(widthZoom, heightZoom);    
}

function App() {
    const [keyControllerVisible, setKeyControllerVisible] = useState(true);
    // const [zoom, setZoom] = useState(1);

    const handleToggleClick = () => {
        setKeyControllerVisible(!keyControllerVisible);
    }
      
    setZoom();
    window.addEventListener('resize', setZoom);
    // const keyControllerClass = keyControllerVisible ? 'keyboard-controller-button visible' : 'keyboard-controller-button';
    return (
        <PortfolioProvider>
            <div className="App">
                <TopMenu onClick={handleToggleClick} isOn={keyControllerVisible} />
                <Router>
                    <Routes>
                        <Route exact path="/" element={<MenuPage />} />
                        <Route path="/map1" element={<MapStartPage />} />
                        <Route path="/map2" element={<MapLeftPage />} />
                        <Route path="/map3" element={<MapUpPage />} />
                    </Routes>
                    {keyControllerVisible && <ControllerButtons />}
                </Router>
            </div>
            {/* {/* <h1 className="App">Hello, Tailwind CSS!</h1> */}
            {/* <p className="App">hello2</p> */}
        </PortfolioProvider>
    );
}

export default App;
