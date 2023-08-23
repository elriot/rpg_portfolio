import React, { useEffect, useState } from 'react';
import { PAGE_SIZE, UNIT_SIZE, UP, DOWN, LEFT, RIGHT, MOVEMENT_MAP } from "../util/constants";
import Character from '../components/Character';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import mapImage from '../images/map/map0.png';
import DialogBox from '../components/DialogBox';
import SpeechBubble from '../components/SpeechBubble';
import profileImage from '../images/picture/profile_photo.png';

const cols = PAGE_SIZE.width / UNIT_SIZE.width;
const rows = PAGE_SIZE.height / UNIT_SIZE.height;
const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
];

const doors = [
    // { name: "main", direction: DOWN, x: 6, y: 9, link: "/", isEvent: true },
    { name: "left", direction: LEFT, x: 0, y: 4, link: "/map2", nextPosition: { x: cols - 1, y: 4 }, isEvent: false },
    { name: "up", direction: UP, x: 6, y: 1, link: "/map3", nextPosition: { x: 6, y: rows - 1 }, isEvent: true },
];

function IsEventFromCurrentPosition(characterX, characterY, characterDirection) {
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

const getEventByName = (name) => {
    return events.find(e => e.name === name);
}

const events = [
    {
        name: "picture",
        triggerDirections: [UP],
        x: 6,
        y: 0,
        text: ["What's this door?", "What's this door?\nOh~ It's for the Portfolio room 🎈"],
        chImage: [profileImage],
        door: "up", /* move map after text */
        chName: "Soopin"
    },
    {
        name: "exit",
        triggerDirections: [DOWN],
        x: 6,
        y: 9,
        text: ["you wanna go to the main page?"],
        options: ["Yes", "No"],
        onOptionSelect: option=>{
            if(option === "Yes"){
                return getEventByName("main");
            } else {
                return getEventByName("return");
            }
        },
        chImage: [profileImage],
        chName: "Soopin"
    }, 
    {
        name: "main",
        link: "/"
    },
    {
        name: "return",
        text: ["Good Idea! Please enjoy this app more."],
        chImage: [profileImage],
        chName: "Soopin"
    },
    {
        name: "portpolio",
        text: ["YOU CAN NOT BACK TO THE MAIN. PLEASE VISIT UP ROOM THROUGHT THE DOOR."],
        chImage: [profileImage],
        chName: "Soopin"
    }
];


function MapStartPage() {

    const location = useLocation();
    const initState = (location.state && location.state.position) || doors["enterDoor"];
    const initDir = (location.state && location.state.direction) || UP;
    const [position, setPosition] = useState(initState);
    const [chDirection, setChDirection] = useState(initDir);
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [currEvent, setCurrEvent] = useState(events[0]);
    const [isNearEvent, setIsNearEvent] = useState(false);
    // const [visitedUpRoom, setVisitedUpRoom] = useState("false");


    const navigate = useNavigate();

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem("visitedUpRoom", "false");
        };
    
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
        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
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
            // isEvent속성이 있으면 event후에 map이동
            const positionTo = door.nextPosition;            
            navigate(door.link, { state: { position: positionTo, direction: direction } });
            return;
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

    const handleCloseDialog = () => {
        setDialogVisible(false);
        // console.log("currEvent", currEvent);
        // console.log(currEvent);
        if (currEvent.door) {
            if(currEvent.door==="up")
                localStorage.setItem("visitedUpRoom", "true");
            
            const door = doors.find(d => d.name === currEvent.door);
            navigate(door.link, { state: { position: door.nextPosition, direction: chDirection } });
        }
    }
    const handleOptionSelected = (selectedOption) => {
        const nextEvent = currEvent.onOptionSelect(selectedOption);
        if (nextEvent) {
            if (nextEvent.link) {
                const visited = localStorage.getItem("visitedUpRoom");         
                if(visited === "false"){
                    setCurrEvent(getEventByName("portpolio"));
                } else {
                    localStorage.setItem("visitedUpRoom", "false");
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
