import { UP, DOWN,RIGHT,LEFT } from "../util/constants"
import { getDialogString } from "../util/strings"
import myPanda01 from "../images/portpolio/panda/myPanda_01.png";
import myPanda02 from "../images/portpolio/panda/myPanda_02.png";
import myPanda03 from "../images/portpolio/panda/myPanda_03.png";
import myPanda_categoery from "../images/portpolio/panda/myPanda_categoery.png";
import myPanda_items from "../images/portpolio/panda/myPanda_items.png";
import myPanda_function_01 from "../images/portpolio/panda/myPanda_function_01.png";
import myPanda_function_02 from "../images/portpolio/panda/myPanda_function_02.png";
import myWeather01 from "../images/portpolio/weather/weather01.png";
import myWeather02 from "../images/portpolio/weather/weather02.png";
import myWeather03 from "../images/portpolio/weather/weather03.png";
import myWeather04 from "../images/portpolio/weather/weather04.png";
import myWeather_option from "../images/portpolio/weather/weather_option.png";
import myCondoComponents from "../images/portpolio/condo/condo_components.png";
import myCondoSignup from "../images/portpolio/condo/condo_signup.png";
import myCondoSignupValid from "../images/portpolio/condo/condo_signup_validation.png";
import myCondoUserList from "../images/portpolio/condo/condo_userlist.png";
import myCondoSearchBar from "../images/portpolio/condo/condo_search.png";
import myCondoMain from "../images/portpolio/condo/condo_main.png";

export const IsEventFromCurrentPosition =(characterX, characterY, characterDirection)=> {
    const eventToTrigger = eventForPortpolio.find(event => {
        const isAdjacent =
            // (event.x === characterX && event.y === characterDirection && event.triggerDirections === characterDirection)
            (event.x === characterX + 1 && event.y === characterY && characterDirection === RIGHT) ||
            (event.x === characterX && event.y === characterY + 1 && characterDirection === DOWN) ||
            (event.x === characterX - 1 && event.y === characterY && characterDirection === LEFT) ||
            (event.x === characterX && event.y === characterY - 1 && characterDirection === UP);
        
        return isAdjacent && event.triggerDirections.includes(characterDirection ) && !event.hide;
    });
    return eventToTrigger;
}
export const getEventByName = (name) => {
    return eventForPortpolio.find(e => e.name === name);
}

export const updateEvent = (name, key, value) => {
    const event = eventForPortpolio.find(event => event.name === name);
    if (event) {
        event[key] = value;
    } else {
        console.warn(`Event with name ${name} not found.`);
    }
}

export const eventForPortpolio = [
    {
        name: "condo",
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
        name: "exit",
        triggerDirections: [DOWN],      
        x: 6,
        y: 9,        
        chName: "Soopin",
        nextEvent:"exit_failed",
        text:["See Ya!"],
        door:"downdoor",
        hide:false
    },
    {
        name: "exit_failed",
        text:["You can't leave this room until check all my portfolios !"],
        chName: "Soopin"
    }
]