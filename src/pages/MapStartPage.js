import React, { useEffect, useState } from 'react';
import {PAGE_SIZE, UNIT_SIZE, UP, DOWN, LEFT, RIGHT, TOP, BOTTOM} from "../util/constants";
import Character from '../components/Character';
import { useLocation, useNavigate } from 'react-router-dom';
import { isDoor } from '../util/doors';
import classNames from 'classnames';

const cols = PAGE_SIZE.width / UNIT_SIZE.width;
const rows = PAGE_SIZE.height / UNIT_SIZE.height;
const map = [
    [0,0,0,0,0,0,1,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,1,0,0,0,0,0],
];

const doors = [
    { name:"enterDoor", direction:DOWN, x: 6, y: 8, link: "/map1", nextPosition: null},
    { name:"leftDoor", direction:LEFT, x: 0, y: 4, link: "/map2", nextPosition:{x: cols-1, y : 4} },    
    { name:"topDoor", direction:UP, x: 6, y: 0, link: "/map3", nextPosition:{x: rows-1, y : 4} },
];


function MapStartPage() {

    const location = useLocation();
    const initialState = (location.state && location.state.position ) || doors["enterDoor"];
    const [position, setPosition] = useState(initialState);
    const [chDirection, setChDirection] = useState(UP);
    const navigate = useNavigate();
    
    useEffect(() => {
        function handleKeyPress(event) {
            const movementMap = {
                ArrowUp: UP,
                ArrowDown: DOWN,
                ArrowLeft: LEFT,
                ArrowRight: RIGHT,
            };
            if (movementMap[event.key]) {
                moveCharacter(movementMap[event.key]);
            }
        }

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [position]);

    const moveCharacter = (direction) => {
        const newPosition = { ...position };
        if(direction === UP){
            if (position.y - 1 >= 0 && map[position.y - 1][position.x] !== 0)
            newPosition.y -= 1;
        } else if (direction === DOWN){
            if (position.y + 1 < rows && map[position.y + 1][position.x] !== 0)
            newPosition.y += 1;
        } else if (direction === LEFT){
            if (position.x - 1 >= 0 && map[position.y][position.x - 1] !== 0) 
                newPosition.x -= 1;        
        } else if (direction === RIGHT){
            if (position.x + 1 < cols && map[position.y][position.x + 1] !== 0)
            newPosition.x += 1;
        }

        const door = doors.find(d => d.x === newPosition.x && d.y === newPosition.y);
        if(door !== undefined && direction === door.direction){            
            // setTransitionDirection(direction);
            // setTimeout(() => {
                const positionTo = door.nextPosition;
                navigate(door.link, { state: {position:positionTo}});  
            // }, 300);           
            return;          
        }

        setPosition(newPosition);
        setChDirection(direction);
    }

   
    const tiles = Array.from({ length: rows * cols }).map((_, index) => {
        const i = Math.floor(index / cols);
        const j = index % cols;
        let tileClass = map[i][j] === 0 ? "bg-black" : "bg-white";
        if (isDoor(doors, i, j)) tileClass = "bg-red-500";
        
        return (
            <div
                key={`${i}-${j}`}
                className={`border border-gray-300 relative ${tileClass}`}
            />
        );
    });

    const styles = {
        ...PAGE_SIZE,
        gridTemplateColumns: `repeat(${cols}, ${UNIT_SIZE.width}px)`
    };

    return (
        <div className={classNames(`relative`, /*`transition-slide ${transitionDirection ? `slide-out-${transitionDirection}` : ''}`*/)}>
            <div className="grid" style={styles}>
                {tiles}
                <div style={{
                    position: 'absolute',
                    top: `${position.y * UNIT_SIZE.height}px`,
                    left: `${position.x * UNIT_SIZE.width}px`
                }}>
                    <Character direction={chDirection}/>
                </div>
            </div>
        </div>
    );


}

export default MapStartPage;
