import React, { useEffect, useState } from 'react';
import { PAGE_SIZE } from "../util/info";
import { UNIT_SIZE } from "../util/info";
import Character from '../components/Character';
import classnames from 'classnames';

const cols = PAGE_SIZE.width / UNIT_SIZE.width;
const rows = PAGE_SIZE.height / UNIT_SIZE.height;
const totalTiles = rows * cols;
const UP = 'up', DOWN = 'down', LEFT = 'left', RIGHT = 'right';
console.log(rows, cols);
const map = [
    [0,0,0,0,0,1,1,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,1,1,0,0,0,0,0],
];
function MapStartPage() {
    const tiles = [];
    const [position, setPosition] = useState({ x: 5, y: 8 });

    // 9* 12


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
    }, [position]);



    const moveCharacter = (direction) => {
        // console.log("move", direction, position);
        if (direction === DOWN && position.y + 1 < rows && map[position.y+1][position.x] !== 0) {            
            // console.log(position, map[position.x][position.y], map[position.x][position.y+1]);
            // console.log("curr", position);
            setPosition({...position,y: position.y + 1} );
        } else if (direction === UP && position.y - 1 >= 0 && map[position.y-1][position.x] !== 0){
            setPosition({...position,y: position.y - 1});
        } else if (direction === LEFT && position.x - 1 >= 0 && map[position.y][position.x-1] !== 0){
            console.log(position.x, position.x-1);
            setPosition({...position,x: position.x - 1});
        } else if (direction === RIGHT && position.x + 1 < cols && map[position.y][position.x+1] !== 0){
            console.log("right");
            setPosition({...position,x: position.x + 1});
        }
    }

    let key = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            tiles.push(<div
                key={key++}
                className={classnames("border border-gray-300 relative",
                        map[i][j] === 0? "bg-black" : "bg-white")}/>);
        }
    }
    // for (let i = 0; i < totalTiles; i++) {
    //     let bgColor = ";
    //     tiles.push(<div key={i} className={classnames("border border-gray-300 relative")} />);  // 각 타일에 relative 포지셔닝을 설정
    // }

    const styles = {
        ...PAGE_SIZE,
        gridTemplateColumns: `repeat(${cols}, ${UNIT_SIZE.width}px)`
    };

    return (
        <div className='relative'>
            <div className="grid " style={styles} bg-black>
                {tiles}
                {/* 캐릭터를 그리드 내부에 배치하고, absolute 포지셔닝으로 위치 설정 */}
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
