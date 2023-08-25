import { createContext, useContext, useState } from 'react';
const PortfolioContext = createContext();

export const usePortfolioContext = () => {
    return useContext(PortfolioContext);
};

export const PortfolioProvider = ({ children }) => {
    const [visitPortfolioRoom, setVisitPortfolioRoom] = useState(false); 

    return (
        <PortfolioContext.Provider value={{ visitPortfolioRoom, setVisitPortfolioRoom }}>
            {children}
        </PortfolioContext.Provider>
    );
};