import { PAGE_SIZE, UNIT_SIZE, UP, DOWN, LEFT, RIGHT, MOVEMENT_MAP } from "../util/constants";
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
    { name: "main", direction: DOWN, x: 6, y: 8, link: "/", isEvent: true },
    { name: "left", direction: LEFT, x: 0, y: 4, link: "/map2", nextPosition: { x: cols - 1, y: 4 }, isEvent: false },
    { name: "up", direction: UP, x: 6, y: 1, link: "/map3", nextPosition: { x: 6, y: rows - 1 }, isEvent: true },
];
const events = [
    {
        name: "doorToPortfolio",
        triggerDirections: [UP],
        type: "door",
        x: 6,
        y: 0,
        text: ["What's this door?", "What's this door?\nOh~ It's for the Portfolio room 🎈"],
        chImage: [profileImage],
        door: "up", /* move map after text */
        chName: "Soopin",
        hide:false,        
    },
    {
        name: "exit",
        triggerDirections: [DOWN],
        x: 6,
        y: 9,
        type:"door",
        text: ["you wanna go to the main page?"],
        options: ["Yes", "No"],
        onOptionSelect: (option) =>{
            if(option === "Yes"){
                return"main";
            } else {
                return"return";
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
export {doors, events, map};