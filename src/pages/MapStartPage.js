import React, { useEffect, useState } from 'react';
import { PAGE_SIZE } from "../util/info";
import { UNIT_SIZE } from "../util/info";
import Character from '../components/Character';
import classnames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

const cols = PAGE_SIZE.width / UNIT_SIZE.width;
const rows = PAGE_SIZE.height / UNIT_SIZE.height;
const totalTiles = rows * cols;
const UP = 'up', DOWN = 'down', LEFT = 'left', RIGHT = 'right';
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
const leftDoor = {x:0, y:4};
const enterDoor = {x:6, y:8};
// const rightDoor = {x:}

function MapStartPage() {
    const tiles = [];

    const location = useLocation();
    const initialState = (location.state && location.state.position ) || enterDoor; // 만약 state가 없다면 기본값을 사용합니다.    
    console.log(location.state, location.state.position);
    const [position, setPosition] = useState(initialState);
    const navigate = useNavigate();
    
    useEffect(() => {
        function handleKeyPress(event) {
            switch (event.key) {
                case 'ArrowUp':
                    moveCharacter(UP);
                    break;
                case 'ArrowDown':
                    moveCharacter(DOWN);
                    break;
                case 'ArrowLeft':
                    moveCharacter(LEFT);
                    break;
                case 'ArrowRight':
                    moveCharacter(RIGHT);
                    break;
                default:
                    break;
            }
        }

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);



    const moveCharacter = (direction) => {
        // console.log("move", direction, position);
        if (direction === DOWN && position.y + 1 < rows && map[position.y+1][position.x] !== 0) {                        
            setPosition({...position,y: position.y + 1} );
        } else if (direction === UP && position.y - 1 >= 0 && map[position.y-1][position.x] !== 0){
            setPosition({...position,y: position.y - 1});
        } else if (direction === LEFT && position.x - 1 >= 0 && map[position.y][position.x-1] !== 0){
            if(position.x-1 === leftDoor.x && position.y === leftDoor.y){
                navigate("/map2", { state: {position:{ x: cols-1, y: position.y }} });
            }
            setPosition({...position,x: position.x - 1});
        } else if (direction === RIGHT && position.x + 1 < cols && map[position.y][position.x+1] !== 0){
            // console.log("right");
            setPosition({...position,x: position.x + 1});
        }
    }

   
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let bgColor = map[i][j] === 0 ? "bg-black" : "bg-white";
            if(i === leftDoor.y && j === leftDoor.x)
                bgColor = "bg-red-500";
            
            tiles.push(<div
                key={`${i}-${j}`}
                className={classnames("border border-gray-300 relative",bgColor,
                        )
                }/>);
        }
    }

    const styles = {
        ...PAGE_SIZE,
        gridTemplateColumns: `repeat(${cols}, ${UNIT_SIZE.width}px)`
    };

    return (
        <div className='relative'>
            <div className="grid " style={styles} bg-black>
                {tiles}
                <div style={{
                    position: 'absolute',
                    top: `${position.y * UNIT_SIZE.height}px`,
                    left: `${position.x * UNIT_SIZE.width}px`
                }}>
                    <Character></Character>
                </div>
            </div>
        </div>
    );


}

export default MapStartPage;
