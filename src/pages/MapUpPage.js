import React, { useEffect, useState } from 'react';
import { PAGE_SIZE, UNIT_SIZE, UP, DOWN, LEFT, RIGHT, MOVEMENT_MAP,ALL_DIRECTION } from "../util/constants";
import Character from '../components/Character';
import { useLocation, useNavigate } from 'react-router-dom';
import mapImage from '../images/map/map2.png';

import DialogBox from '../components/DialogBox';
import SpeechBubble from '../components/SpeechBubble';
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

import { getDialogString } from '../util/strings';

const cols = PAGE_SIZE.width / UNIT_SIZE.width;
const rows = PAGE_SIZE.height / UNIT_SIZE.height;
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


function IsEventFromCurrentPosition (characterX, characterY, characterDirection) {
    const eventToTrigger = events.find(event => {
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
const getEventByName = (name) => {
    return events.find(e => e.name === name);
}

const updateEvent = (name, key, value) => {
    const event = events.find(event => event.name === name);
    if (event) {
        event[key] = value;
    } else {
        console.warn(`Event with name ${name} not found.`);
    }
}
function MapUpPage() {
    const location = useLocation();
    const initState = (location.state && location.state.position) || doors.rightDoor; // 만약 state가 없다면 기본값을 사용합니다.    
    const initDir = (location.state && location.state.direction) || UP;

    const [chDirection, setChDirection] = useState(initDir);
    const [position, setPosition] = useState(initState);
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [currEvent, setCurrEvent] = useState(null);
    const [isNearEvent, setIsNearEvent] = useState(events[0]);

    const navigate = useNavigate();

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem("portpolio", "false");
        };

        function handleKeyPress(event) {
            if (isDialogVisible) {
                if(event.key === 'Escape'){
                    setDialogVisible(false);
                }                                        
                return;
            }

            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'ArrowRight':
                    handleMove(event.key);
                    break;
                case 'Enter':
                    handleEnter();
                    break;
                case ' ':
                    handleEnter();
                    break;
                default:
                    break;
            }
        }

        function handleMove(key) {            
            if (MOVEMENT_MAP[key]) {
                moveCharacter(MOVEMENT_MAP[key]);
            }
        }

        function triggerEvent(characterX, characterY, characterDirection) {
            const eventToTrigger = IsEventFromCurrentPosition(characterX, characterY, characterDirection);
            console.log("evetTrigger1111111111",eventToTrigger);
            updateEvent("exit", "hide", true);
            console.log(events["exit"]);
            if (eventToTrigger) {
                console.log("here", eventToTrigger);
                if(eventToTrigger.name === "exit" && eventToTrigger.nextEvent){                                                        
                    if(localStorage.getItem("portpolio") === "false"){
                        const getFailed = getEventByName("exit_failed");
                        setCurrEvent(getFailed);
                        setDialogVisible(true);
                        return;
                    } else {
                        const door = doors.find(d => d.name === eventToTrigger.door);                        
                        const positionTo = door.nextPosition;     
                        navigate(door.link, { state: { position: positionTo, direction: characterDirection } });
                        return;
                    }
                }
                showDialog(eventToTrigger);
            }
        }

        function showDialog(currEvent) {
            setCurrEvent(currEvent);
            setDialogVisible(true);
        }

        function handleEnter() {
            if (isDialogVisible === true) {
                setDialogVisible(false);
                return;
            }
            
            triggerEvent(position.x, position.y, chDirection);
            return;
        }

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [position, chDirection, isDialogVisible, isNearEvent,currEvent]);

    const moveCharacter = (direction) => {
        const newPosition = { ...position };
        if (direction === UP) {
            if (position.y - 1 >= 0 && map[position.y - 1][position.x] !== 0)
                newPosition.y -= 1;
        } else if (direction === DOWN) {
            if (position.y + 1 < rows && map[position.y + 1][position.x] !== 0)
                newPosition.y += 1;
        } else if (direction === LEFT) {
            if (position.x - 1 >= 0 && map[position.y][position.x - 1] !== 0)
                newPosition.x -= 1;
        } else if (direction === RIGHT) {
            if (position.x + 1 < cols && map[position.y][position.x + 1] !== 0)
                newPosition.x += 1;
        }
        const door = doors.find(d => d.x === position.x && d.y === position.y);
        console.log(newPosition, door, localStorage.getItem("portpolio"));
        if (door !== undefined && door.direction === direction) {
            if(localStorage.getItem("portpolio") === "false"){
                console.log("Here");
                const getFailed = getEventByName("exit_failed");
                // console.log(getFailed);
                setCurrEvent(getFailed);
                setDialogVisible(true);
                return;
            } else {
                const positionTo = door.nextPosition;
                navigate(door.link, { state: { position: positionTo, direction: direction } });
                return;
            }
        }

        if (IsEventFromCurrentPosition(newPosition.x, newPosition.y, direction)) {
            setIsNearEvent(true);
        } else {
            setIsNearEvent(false);
        }
        setPosition(newPosition);
        setChDirection(direction);
    }

    const styles = {
        ...PAGE_SIZE,
        gridTemplateColumns: `repeat(${cols}, ${UNIT_SIZE.width}px)`,
        gridTemplateRows: `repeat(${rows}, ${UNIT_SIZE.width}px)`
    };

    return (
        <div className='relative'>
            <div className="grid " style={styles}>
                <img src={mapImage} style={{ position: "absolute", zIndex: 0, width: "100%", height: "100%" }} alt="map" />
                <div style={{
                    position: 'absolute',
                    top: `${position.y * UNIT_SIZE.height}px`,
                    left: `${position.x * UNIT_SIZE.width}px`
                }}>
                    <Character direction={chDirection} />
                    {isNearEvent && <SpeechBubble />}
                </div>
                {currEvent &&
                    <DialogBox
                        text={currEvent.text}
                        isVisible={isDialogVisible}
                        onClose={() => setDialogVisible(false)}
                        characterImage={currEvent.chImage}
                        chName={currEvent.chName}
                        extraImage={currEvent.extraImage}
                    />
                }
            </div>
        </div>
    );


}

export default MapUpPage;
