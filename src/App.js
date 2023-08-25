import './App.css';
import MenuPage from './pages/MenuPage';
import MapStartPage from './pages/MapStartPage';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MapLeftPage from './pages/MapLeftPage';
import MapUpPage from './pages/MapUpPage';
import { PortfolioProvider } from './context/PortfolioContext';
import ControllerButtons from "./components/ControllerButtons"
import BGMController from './components/BGMController';


function App() {
  const centeredContainer = "flex items-center justify-center relative" // menu center middle  
  const handleNavigation = (path) => {
    if (path === '/map1') {
      // navigate('/map');
    }
    console.log("Navigating to:", path);
  }
  // const location = useLocation();
  const menu = <MenuPage className={centeredContainer} onNavigate={handleNavigation}></MenuPage>;
  return (
    // <KeyboardHandlerProvider>        
      <PortfolioProvider>        
        <div className="App">
        <BGMController/>
          <Router>
            <Routes>
              <Route exact path="/" element={menu} />
              <Route path="/map1" element={<MapStartPage />} />
              <Route path="/map2" element={<MapLeftPage />} />
              <Route path="/map3" element={<MapUpPage />} />              
            </Routes>
            <ControllerButtons />
          </Router>

          {/* <StartingRoomMapPage></StartingRoomMapPage>  */}
          <h1 className="text-3xl font-bold text-blue-600 mt-4">Hello, Tailwind CSS!</h1>
          <p className="mt-2 text-red-700">This is an example of Tailwind CSS usage.</p>

        </div>
      </PortfolioProvider>
    // </KeyboardHandlerProvider>

  );
}

export default App;
