import './App.css';
import MenuPage from './pages/MenuPage';
import MapStartPage from './pages/MapStartPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapLeftPage from './pages/MapLeftPage';
import MapUpPage from './pages/MapUpPage';
import { PortfolioProvider } from './context/PortfolioContext';
import ControllerButtons from "./components/ControllerButtons"
import { useState } from 'react';
import TopMenu from './components/TopMenu';

function App() {
    const [keyControllerVisible, setKeyControllerVisible] = useState(true);

    const handleToggleClick = () => {
        setKeyControllerVisible(!keyControllerVisible);
    }
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
            {/* <h1 className="App">Hello, Tailwind CSS!</h1>
            <p className="App">This is an example of Tailwind CSS usage.</p> */}
        </PortfolioProvider>
    );
}

export default App;
