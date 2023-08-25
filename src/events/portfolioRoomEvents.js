import { UP, DOWN,RIGHT,LEFT } from "../util/constants"
import { getDialogString } from "../util/strings"
import myPanda01 from "../images/portfolio/panda/myPanda_01.png";
import myPanda02 from "../images/portfolio/panda/myPanda_02.png";
import myPanda03 from "../images/portfolio/panda/myPanda_03.png";
import myPanda_categoery from "../images/portfolio/panda/myPanda_categoery.png";
import myPanda_items from "../images/portfolio/panda/myPanda_items.png";
import myPanda_function_01 from "../images/portfolio/panda/myPanda_function_01.png";
import myPanda_function_02 from "../images/portfolio/panda/myPanda_function_02.png";
import myWeather01 from "../images/portfolio/weather/weather01.png";
import myWeather02 from "../images/portfolio/weather/weather02.png";
import myWeather03 from "../images/portfolio/weather/weather03.png";
import myWeather04 from "../images/portfolio/weather/weather04.png";
import myWeather_option from "../images/portfolio/weather/weather_option.png";
import myCondoComponents from "../images/portfolio/condo/condo_components.png";
import myCondoSignup from "../images/portfolio/condo/condo_signup.png";
import myCondoSignupValid from "../images/portfolio/condo/condo_signup_validation.png";
import myCondoUserList from "../images/portfolio/condo/condo_userlist.png";
import myCondoSearchBar from "../images/portfolio/condo/condo_search.png";
import myCondoMain from "../images/portfolio/condo/condo_main.png";

const NUMBER_OF_PORTFOLIO = 4;
const getAllPortfolio = () =>{
    return ["condo","weather", "panda","rpg_portfolio"];
}
const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
];

const doors = [
    { name: "downdoor", direction: DOWN, x: 6, y: 8, link: "/map1", nextPosition: { x: 6, y: 1 }, isEvent : true },
];

const events = [
    {
        name: "condo",
        type: "portfolio",
        triggerDirections: [UP],
        x: 3,
        y: 0,
        text: 
        [
            getDialogString([
                "This is Condo Community App."
                , "This project is the first website I made after learning React."
                , "- github : <a href='https://github.com/elriot/condo' target='_blank'>https://github.com/elriot/condo</a>"
            ])
            , getDialogString(["I made all the components used in the project and used json-server and axios for CRUD."])
            , getDialogString([
                "This is Signup page."
                , " Check email, password validation here, and if there is no problem, signup will be completed."                
            ])
            , getDialogString(["This is UserList Page."])
            , getDialogString(["please enjoy my weather app!"])
        ],
        extraImage:[myCondoMain, myCondoComponents, myCondoSignupValid, myCondoUserList, myCondoSearchBar],
        door: "up", /* move map after text */
        chName: "Soopin"
    },
    {
        name: "weather",
        triggerDirections: [UP],
        type: "portfolio",
        x: 5,
        y: 0,
        text: [getDialogString([
                "This is Weather App."
                ,"You can simply check current Weather in the major city in Canada."
                ,"- live webpage : <a href='https://elriot.github.io/weather' target='_blank'>https://elriot.github.io/weather</a>🌞"
                ,"- github : <a href='https://github.com/elriot/panda' target='_blank'>https://github.com/elriot/panda</a>"
            ])
            ,getDialogString(["You can choose your city and unit."])
            ,getDialogString(["The gradient in the background changes with local time and weather"])
            ,getDialogString(["When it rains, rain fall information will be added."])
            ,getDialogString(["please enjoy my weather app!"])         
        ],
        extraImage:[myWeather01, myWeather_option, myWeather04, myWeather02, myWeather01],
        door: "up", /* move map after text */
        chName: "Soopin"
    },
    {
        name: "panda",
        type: "portfolio",
        triggerDirections: [UP],
        x: 7,
        y: 0,
        text: [getDialogString([
                "This is Panda App. You can decorates your own panda.🐼",
                "- live web : <a href='https://elriot.github.io/panda' target='_blank'>https://elriot.github.io/panda</a>",
                "- github : <a href='https://github.com/elriot/panda' target='_blank'>https://github.com/elriot/panda</a>"
            ])
            , "there's 6 categories. you can pick background, panda, hair item, glasses, earlings, necklace."
            , "There's 5 pandas, 39 items you can pick."
            , "let me introduce functions."
            , getDialogString([
                "<b>1. information Button : </b>",
                " you can get information of current panda."
            ])
            , getDialogString([
                "<b>2. Zoom Button : </b>\n there's 4 zoom options.",
                "if you think panda is too big or too small, you can use this button."
            ])
            , getDialogString([
                "<b>3. random dics Button : </b>",
                "If it's hard to pick, make a random panda with this button."
            ])         
            , getDialogString([
                "<b>4. reset button : </b>",
                "Use this button if you want to reset all options."
            ])        
            , getDialogString([
                "<b>5. save Image : </b>",
                "you can get current panda as png file."
            ])  
            , getDialogString([
                "If you want to see my code, please visit to my github repository",
                "✅<a href='https://github.com/elriot/panda' target='_blank'>https://github.com/elriot/panda</a>"
            ])  
        ],
        extraImage: [myPanda01, myPanda_categoery, myPanda_items, null, myPanda_function_01, myPanda_function_01, myPanda_function_01, myPanda_function_01, myPanda_function_02],
        door: "up", /* move map after text */
        chName: "Soopin"
    },
    {
        name: "rpg_portfolio",
        triggerDirections: [UP],
        type: "portfolio",
        x: 9,
        y: 0,
        text: [getDialogString([
                "This is rpg portfolio App.😊"                
                ,"- live webpage : <a href='https://elriot.github.io/weather' target='_blank'>https://elriot.github.io/weather</a>🌞"
                ,"- github : <a href='https://github.com/elriot/panda' target='_blank'>https://github.com/elriot/panda</a>"
            ])   
        ],
        extraImage:[null],
        door: "up", /* move map after text */
        chName: "Soopin"
    },
    {
        name: "exit",
        type: "door",
        triggerDirections: [DOWN],      
        x: 6,
        y: 9,        
        chName: "Soopin",
        nextEvent:"exit_failed",
        text:["See Ya!"],
        door:"downdoor", // connected door
        hide:false // if hide is true, event doesnt triggered
    },
    {
        name: "exit_failed",
        type: "nextEvent", // connected event ("exit"->"exit_failed")
        text:["You can't leave this room until check all my portfolios !"],
        chName: "Soopin"
    }
]

export {doors, events, NUMBER_OF_PORTFOLIO, getAllPortfolio, map};