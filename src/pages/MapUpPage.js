import React, { useEffect, useState } from 'react';
import { PAGE_SIZE, UNIT_SIZE, UP, DOWN, LEFT, RIGHT, MOVEMENT_MAP } from "../util/constants";
import Character from '../components/Character';
import { useLocation, useNavigate } from 'react-router-dom';
import mapImage from '../images/map/map2.png';
import DialogBox from '../components/DialogBox';
import SpeechBubble from '../components/SpeechBubble';
import {IsEventFromCurrentPosition, getEventByName, updateEvent} from '../events/common';
import {events, doors, NUMBER_OF_PORTFOLIO, getAllPortfolio} from '../events/portfolioEvents';
import { arraysHaveSameElements } from '../util/utils';

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

function MapUpPage() {
    // console.log(events);
    const location = useLocation();
    const initState = (location.state && location.state.position) || doors.rightDoor; // 만약 state가 없다면 기본값을 사용합니다.    
    const initDir = (location.state && location.state.direction) || UP;

    const [chDirection, setChDirection] = useState(initDir);
    const [position, setPosition] = useState(initState);
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [currEvent, setCurrEvent] = useState(null);
    const [isNearEvent, setIsNearEvent] = useState(events[0]);
    const [checkedPortfolio, setCheckedPortfolio] = useState(localStorage.getItem("portfolio")=== "true" ? getAllPortfolio() : []); //"weather", "panda.."

    const navigate = useNavigate();

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem("portfolio", "false");
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
            console.log(checkedPortfolio); 
            if (MOVEMENT_MAP[key]) {
                moveCharacter(MOVEMENT_MAP[key]);
            }
        }

        function triggerEvent(characterX, characterY, characterDirection) {
            const eventToTrigger = IsEventFromCurrentPosition(events, characterX, characterY, characterDirection);            
            
            if (eventToTrigger) {                
                const eventType = eventToTrigger.type;
                if(eventType === "portfolio"){
                    // console.log("checked,", checkedPortfolio);

                    if(checkedPortfolio.indexOf(eventToTrigger.name) === -1){
                        const updatedArray = [...checkedPortfolio];
                        updatedArray.push(eventToTrigger.name);                   
                        setCheckedPortfolio(updatedArray)
                        if(localStorage.getItem("portfolio") === "false" && arraysHaveSameElements(getAllPortfolio(), updatedArray)){
                            // console.log(22222, events["exit"], checkedPortfolio.length);
                            localStorage.setItem("portfolio", "true");
                            // console.log("before event", events["exit"]);
                            updateEvent(events, "exit", "hide", true);
                            // console.log("after event", events["exit"]);
                        }
                    }
                }
                if(eventType === "door" && eventToTrigger.nextEvent){         
                    // console.log(222, localStorage.getItem("portfolio"))                                               
                    if(localStorage.getItem("portfolio") === "false"){
                        const getFailed = getEventByName(events, "exit_failed");
                        setCurrEvent(getFailed);
                        setDialogVisible(true);
                        return;
                    } else {
                        // console.log("????"); return;
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
    }, [position, chDirection, isDialogVisible, isNearEvent,currEvent,checkedPortfolio]);

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
        // console.log(newPosition, door, localStorage.getItem("portfolio"));
        if (door !== undefined && door.direction === direction) {
            if(localStorage.getItem("portfolio") === "false"){
                console.log("Here");
                const getFailed = getEventByName(events, "exit_failed");
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

        if (IsEventFromCurrentPosition(events, newPosition.x, newPosition.y, direction)) {
            console.log("here")
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
