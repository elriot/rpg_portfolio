
import { PAGE_SIZE, UNIT_SIZE, UP, DOWN, LEFT, RIGHT, MOVEMENT_MAP } from "../util/constants";
import profileImage from '../images/picture/profile_photo.png';
import profileImage2 from '../images/picture/profile_photo2.png';
import myPanda01 from "../images/portfolio/panda/myPanda_01.png";
import myPanda02 from "../images/portfolio/panda/myPanda_02.png";
import myPanda03 from "../images/portfolio/panda/myPanda_03.png";

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
        chImage: [profileImage2,profileImage,profileImage2],
        extraImage :[myPanda01, myPanda02, myPanda03],
        chName: "Soopin"
    },
    {
        name: "basket",
        triggerDirections: [LEFT, UP, DOWN],
        x: 1,
        y: 4,
        text: ["My basket..precious"],
        chImage: [profileImage],
        chName: "Soopin"
    },
    {
        name: "box",
        triggerDirections: [RIGHT, UP],
        x: 6,
        y: 1,
        text: ["My strength is..\n "],
        chImage: [profileImage],
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
        chImage: [profileImage2,profileImage,profileImage2],
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
        chImage: [profileImage],
        chName: "Soopin"
    },
    {
        name: "object1",
        triggerDirections: [UP],
        x: 7,
        y: 1,
        text: ["My strenth is.. ",
        "My strenth is.. \nI pick things up very quickly.", "I'm not good at English, but I believe that My English going to be better soon!"],
        chImage: [profileImage],
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
        chImage: [profileImage],
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
        chImage: [profileImage],
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
        chImage: [profileImage],
        chName: "Soopin"
    },
]

export {doors, events, map};