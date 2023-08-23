import React, { useEffect, useState } from 'react';
import { PAGE_SIZE, UNIT_SIZE, UP, DOWN, LEFT, RIGHT, MOVEMENT_MAP } from "../util/constants";
import Character from '../components/Character';
import { useLocation, useNavigate } from 'react-router-dom';
import mapImage from '../images/map/map2.png';

import DialogBox from '../components/DialogBox';
import SpeechBubble from '../components/SpeechBubble';

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
    { name: "downDoor", direction: DOWN, x: 11, y: 4, link: "/map0", nextPosition: { x: 6, y: 1 } },
];

const events = [
    {

    },
]
 

function IsEventFromCurrentPosition(characterX, characterY, characterDirection){
    const eventToTrigger = events.find(event => {
        const isAdjacent =
            (event.x === characterX + 1 && event.y === characterY && characterDirection === RIGHT) ||
            (event.x === characterX && event.y === characterY + 1 && characterDirection === DOWN) ||
            (event.x === characterX - 1 && event.y === characterY && characterDirection === LEFT) ||
            (event.x === characterX && event.y === characterY - 1 && characterDirection === UP);

        return isAdjacent && event.triggerDirections.includes(characterDirection);
    });
    return eventToTrigger;
}

function MapTopPage() {
    const location = useLocation();
    const initState = (location.state && location.state.position) || doors.rightDoor; // 만약 state가 없다면 기본값을 사용합니다.    
    const initDir = (location.state && location.state.direction) || UP;

    const [chDirection, setChDirection] = useState(initDir);
    const [position, setPosition] = useState(initState);
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [currEvent, setCurrEvent] = useState(events[0]);
    const [isNearEvent, setIsNearEvent] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        function handleKeyPress(event) {
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
            if (MOVEMENT_MAP[key]) {
                moveCharacter(MOVEMENT_MAP[key]);
            }
        }

        function triggerEvent(characterX, characterY, characterDirection) {
            const eventToTrigger = IsEventFromCurrentPosition(characterX, characterY, characterDirection);
            if (eventToTrigger) {
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
        console.log(newPosition);
        if (door !== undefined && door.direction === direction) {
            const positionTo = door.nextPosition;
            navigate(door.link, { state: { position: positionTo, direction:direction } });
            return;
        }

        if(IsEventFromCurrentPosition(newPosition.x, newPosition.y, direction)){
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
            <div className="grid " style={styles} bg-black>
                <img src={mapImage} style={{ position: "absolute", zIndex: 0, width: "100%", height: "100%" }} alt="map" />
                <div style={{
                    position: 'absolute',
                    top: `${position.y * UNIT_SIZE.height}px`,
                    left: `${position.x * UNIT_SIZE.width}px`}}>
                    <Character direction={chDirection} />
                    {isNearEvent && <SpeechBubble/>}
                </div>
                <DialogBox
                    text={currEvent.text}
                    isVisible={isDialogVisible}
                    onClose={() => setDialogVisible(false)}
                    characterImage={currEvent.chImage}
                    chName={currEvent.chName}
                    extraImage={currEvent.extraImage}
                />
            </div>
        </div>
    );


}

export default MapTopPage;
