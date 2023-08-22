import React, { useEffect, useState } from 'react';
import { PAGE_SIZE, UNIT_SIZE, UP, DOWN, LEFT, RIGHT, MOVEMENT_MAP } from "../util/constants";
import Character from '../components/Character';
import { useLocation, useNavigate } from 'react-router-dom';
import mapImage from '../images/map/map1.png';
import profileImage from '../images/picture/profile_photo.png';
import DialogBox from '../components/DialogBox';
import SpeechBubble from '../components/SpeechBubble';

const cols = PAGE_SIZE.width / UNIT_SIZE.width;
const rows = PAGE_SIZE.height / UNIT_SIZE.height;
const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const doors = [
    { name: "rightDoor", direction: "right", x: 11, y: 4, link: "/map1", nextPosition: { x: 0, y: 4 } },
];

const events = [
    {
        name: "picture",
        triggerDirections: [UP],
        x: 4,
        y: 0,
        text: ["Hello! \n I'm Soopin Kim. I'm Software Developer. \n"
            , "I have 3 years 8 month experience as Software Development In South Korea."
            , "you can check my profile in Linkedin.\n <a href='https://www.linkedin.com/in/soopin-kim-9099a426a/' target='_blank'>Click here!</a>"],
        imageUrl: profileImage,
        chName: "Soopin"
    },
    {
        name: "basket",
        triggerDirections: [LEFT, UP, DOWN],
        x: 1,
        y: 4,
        text: ["My basket..precious"],
        imageUrl: profileImage,
        chName: "Soopin"
    },
    {
        name: "box",
        triggerDirections: [RIGHT, UP],
        x: 6,
        y: 1,
        text: ["My strength is..\n "],
        imageUrl: profileImage,
        chName: "Soopin"
    },
    {
        name: "clock",
        triggerDirections: [UP],
        x: 2,
        y: 0,
        text: ["I am on time & scheduled person.\n I tend to complete tasks ahead of time if possible. ",
            "remember! \nif I late to work, there should be a reason. \nI probably come out early.\n however, sky train just stop by accident and I stuck in there."
        ],
        imageUrl: profileImage,
        chName: "Soopin"
    },
    {
        name: "food",
        triggerDirections: [RIGHT, UP, LEFT, DOWN],
        x: 6,
        y: 4,
        text: [
            "Once I begin liking some thing, \nI generally tend to passionately engage with it for a long time. \n\nI continue to keep a keenness for the video games I played all through my youth: Princess Maker, Firland Saga, and The Sims, Age of Discovery. \n"
        ],
        imageUrl: profileImage,
        chName: "Soopin"
    },
    {
        name: "object1",
        triggerDirections: [UP],
        x: 7,
        y: 1,
        text: ["My strenth is.. ",
        "My strenth is.. \nI pick things up very quickly.", "I'm not good at English, but I believe that My English going to be better soon!"],
        imageUrl: profileImage,
        chName: "Soopin"
    },
    {
        name: "object2",
        triggerDirections: [UP],
        x: 8,
        y: 1,
        text: ["I'm born and raised in South Korea. \n I'm fluent in Korean and Japanese both.",
            "I worked in Japanese for a company that I got a job at when I was in the 4th grade of university.\nI can do business in Japanese such as phone calling, sending and receiving mail and writing documents."
        ],
        imageUrl: profileImage,
        chName: "Soopin"
    },
    {
        name: "object3",
        triggerDirections: [UP],
        x: 9,
        y: 1,
        text: ["Why did I become a software developer?",
            "The answer is...",
            "The answer is...\n\nWhen I speak Japanese, I can communicate with people who know Japanese.",
            "However, I thought I could communicate with any computer programmer in the world by programming language.",
            "And I could create what I imagine like as this portpolio web app!",
            "That was why I studied programming and became a software developer."
        ],
        imageUrl: profileImage,
        chName: "Soopin"
    },
    {
        name: "object4",
        triggerDirections: [UP],
        x: 10,
        y: 1,
        text: ["I'm very passionate.",
            "",
            "The answer is...\n\nWhen I speak Japanese, I can communicate with people who know Japanese.",
            "However, I thought I could communicate with any developer in the world by programming language.",
            "And I could create what I imagine like as this portpolio web app!",
            "That was why I studied programming and became a software developer."
        ],
        imageUrl: profileImage,
        chName: "Soopin"
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

function MapLeftPage() {
    const location = useLocation();
    const initialState = (location.state && location.state.position) || doors.rightDoor; // 만약 state가 없다면 기본값을 사용합니다.    

    const [chDirection, setChDirection] = useState(UP);
    const [position, setPosition] = useState(initialState);
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
                // console.log(eventToTrigger.text);
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
            navigate(door.link, { state: { position: positionTo } });
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

    // const tiles = Array.from({ length: rows * cols }).map((_, index) => {
    //     const i = Math.floor(index / cols);
    //     const j = index % cols;
    //     let tileClass = map[i][j] === 0 ? "bg-black" : "bg-white";
    //     if (isDoor(doors, i, j)) tileClass = "bg-red-500";
    //     if(isDoor(events, i, j)) tileClass = "bg-yellow-500";

    //     return (
    //         <div
    //             key={`${i}-${j}`}
    //             className={`border border-gray-300 relative ${tileClass}`}
    //         />
    //     );
    // });

    const styles = {
        ...PAGE_SIZE,
        gridTemplateColumns: `repeat(${cols}, ${UNIT_SIZE.width}px)`
    };

    return (
        <div className='relative'>
            <div className="grid " style={styles} bg-black>
                {/* {tiles} */}
                <img src={mapImage} style={{ position: "absolute", zIndex: 0, width: "100%", height: "100%" }} alt="map" />
                <div style={{
                    position: 'absolute',
                    top: `${position.y * UNIT_SIZE.height}px`,
                    left: `${position.x * UNIT_SIZE.width}px`
                }}>
                    <Character direction={chDirection} />
                    {isNearEvent && <SpeechBubble style={{zIndex:999}}/>}
                </div>
                <DialogBox
                    text={currEvent.text}
                    isVisible={isDialogVisible}
                    onClose={() => setDialogVisible(false)}
                    imageUrl={currEvent.imageUrl}
                    chName={currEvent.chName}
                />                
                {/* <div className={`dialog ${isDialogVisible ? "visible" : ""}`}>
                    {dialogText}
                </div> */}
            </div>
        </div>
    );


}

export default MapLeftPage;
