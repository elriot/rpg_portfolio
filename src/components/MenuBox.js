import "./MenuBox.css";

function MenuBox({options, onClick}) {
    const handleMenuClick = (option) => {
        onClick(option);        
    }
    return (
      <div className="menu-container">
        <button 
            className="menu-option"
            onClick={()=>handleMenuClick("start")}
        >
            Start
        </button>
        <button className="menu-option menu-option-last"
            onClick={()=>handleMenuClick("howtoplay")}>
          How to play
        </button>
      </div>
    );
  }
  
export default MenuBox;