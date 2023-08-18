function MenuBox({options, onClick}) {
    const handleMenuClick = (option) => {
        onClick(option);        
    }
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg">
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 block w-full"
            onClick={()=>handleMenuClick("start")}
        >
            Start
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-full"
            onClick={()=>handleMenuClick("howtoplay")}>
          How to play
        </button>
      </div>
    );
  }
  
export default MenuBox;