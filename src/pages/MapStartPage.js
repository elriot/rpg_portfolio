import React, { useEffect, useState } from 'react';
import { PAGE_SIZE, UNIT_SIZE, UP, DOWN, LEFT, RIGHT, MOVEMENT_MAP } from "../util/constants";
import Character from '../components/Character';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import mapImage from '../images/map/map0.png';
import DialogBox from '../components/DialogBox';
import SpeechBubble from '../components/SpeechBubble';
import { getEventByName, isEventFromCurrentPosition, updateEvent } from '../events/common';
import { events,doors,map } from '../events/startRoomEvents';
import { usePortfolioContext } from '../context/PortfolioContext';

const cols = PAGE_SIZE.width / UNIT_SIZE.width;
const rows = PAGE_SIZE.height / UNIT_SIZE.height;

function MapStartPage() {

    const location = useLocation();
    const initState = (location.state && location.state.position) || {x:doors[0].x,y:doors[0].y};;
    const initDir = (location.state && location.state.direction) || UP;
    const [position, setPosition] = useState(initState);
    const [chDirection, setChDirection] = useState(initDir);
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [currEvent, setCurrEvent] = useState(events[0]);
    const [isNearEvent, setIsNearEvent] = useState(false);
    const { visitPortfolioRoom } = usePortfolioContext();
    const navigate = useNavigate();

    useEffect(() => {    
        function handleKeyPress(event) {     
            // console.log(event)       
            if (isDialogVisible) return;

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
            // console.log("HandleMove", key)
            if (MOVEMENT_MAP[key]) {
                moveCharacter(MOVEMENT_MAP[key]);
            }
        }

        function triggerEvent(characterX, characterY, characterDirection) {
            // console.log("Dfdf")
            // 처음 이벤트가 실행될 때. hide가 false이면 아래 함수에서 undefined반환함
            const eventToTrigger = isEventFromCurrentPosition(events, characterX, characterY, characterDirection);
            if (eventToTrigger) {
                // console.log(eventToTrigger);
                // console.log(eventToTrigger.name);
                if(eventToTrigger.name === "doorToPortfolio"){                                        
                    if(!visitPortfolioRoom){
                        showDialog(eventToTrigger);
                    } else {
                        const door = doors.find(d => d.name === eventToTrigger.door);                        
                        const positionTo = door.nextPosition;     
                        navigate(door.link, { state: { position: positionTo, direction: characterDirection } });
                        return;
                    }
                } else {
                    if(eventToTrigger.text)
                        showDialog(eventToTrigger);
                } 
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
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [position, chDirection, isDialogVisible, isNearEvent]);

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
        if (door !== undefined && door.direction === direction && door.isEvent === false) {
            const positionTo = door.nextPosition;            
            navigate(door.link, { state: { position: positionTo, direction: direction } });
            return;
        }
        // console.log("dfdf");        
        const nearEvent = isEventFromCurrentPosition(events, newPosition.x, newPosition.y, direction);
        // console.log(nearEvent);
        if (nearEvent) {
            // if(!nearEvent.hide)
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

    const handleCloseDialog = () => {
        setDialogVisible(false);
        
        if (currEvent.door) {            
            const door = doors.find(d => d.name === currEvent.door);
            navigate(door.link, { state: { position: door.nextPosition, direction: chDirection } });
        }
    }
    const handleOptionSelected = (selectedOption) => {
        const nextEventName = currEvent.onOptionSelect(selectedOption);
        const nextEvent = getEventByName(events, nextEventName);
        if (nextEvent) {
            if (nextEvent.link ) {                         
                if(!visitPortfolioRoom){
                    setCurrEvent(getEventByName(events, "portpolio"));
                } else { 
                    navigate("/");
                }                
            } else {
                setCurrEvent(nextEvent);
            }
        }
    };
    return (
        <div className={classNames(`relative`, /*`transition-slide ${transitionDirection ? `slide-out-${transitionDirection}` : ''}`*/)}>
            <div className="grid" style={styles}>
                {/* {tiles} */}
                <img src={mapImage} style={{ position: "absolute", zIndex: 0, width: "100%", height: "100%" }} alt="map" />
                <div style={{
                    position: 'absolute',
                    top: `${position.y * UNIT_SIZE.height}px`,
                    left: `${position.x * UNIT_SIZE.width}px`
                }}>
                    <Character direction={chDirection} />
                    {isNearEvent && <SpeechBubble />}
                </div>
                <DialogBox
                    text={currEvent.text}
                    isVisible={isDialogVisible}
                    onClose={handleCloseDialog}
                    characterImage={currEvent.chImage}
                    chName={currEvent.chName}
                    extraImage={currEvent.extraImage}
                    options={currEvent.options}
                    onOptionSelected={handleOptionSelected}
                    onOptionSelect={currEvent.onOptionSelect}
                />

            </div>
        </div>
    );


}

export default MapStartPage;
