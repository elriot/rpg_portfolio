import './App.css';
import MenuPage from './pages/MenuPage';
import MapStartPage from './pages/MapStartPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapLeftPage from './pages/MapLeftPage';
import MapUpPage from './pages/MapUpPage';
import { PortfolioProvider } from './context/PortfolioContext';


function App() {
  const centeredContainer = "flex items-center justify-center relative" // menu center middle  
  const handleNavigation = (path) => {
    if (path === '/map1') {
      // navigate('/map');
    }
    console.log("Navigating to:", path);
  }
  const menu = <MenuPage className={centeredContainer} onNavigate={handleNavigation}></MenuPage>;
  return (
    <PortfolioProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={menu} />
            <Route path="/map1" element={<MapStartPage />} />
            <Route path="/map2" element={<MapLeftPage />} />
            <Route path="/map3" element={<MapUpPage />} />
          </Routes>
        </Router>

        {/* <StartingRoomMapPage></StartingRoomMapPage>  */}
        <h1 className="text-3xl font-bold text-blue-600 mt-4">Hello, Tailwind CSS!</h1>
        <p className="mt-2 text-red-700">This is an example of Tailwind CSS usage.</p>
      </div>
    </PortfolioProvider>

  );
}

export default App;
