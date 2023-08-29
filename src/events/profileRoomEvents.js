
import { PAGE_SIZE, UNIT_SIZE, UP, DOWN, LEFT, RIGHT, MOVEMENT_MAP } from "../util/constants";
import profileImage from '../images/picture/profile_photo.png';
import profileImage2 from '../images/picture/profile_photo2.png';
import myPanda01 from "../images/portfolio/panda/myPanda_01.png";
import myPanda02 from "../images/portfolio/panda/myPanda_02.png";
import myPanda03 from "../images/portfolio/panda/myPanda_03.png";
import coffeebean from "../images/picture/topshelf.png";
import { getDialogString } from "../util/utils";

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
        text: [getDialogString(["Hello!", "I'm Soopin Kim. I'm Software Developer."])
            , "I have 3 years 8 month experience as Web and Software Development In South Korea."
            , getDialogString(["you can check my profile in Linkedin.", "<a href='https://www.linkedin.com/in/soopin-kim-9099a426a/' target='_blank'>https://www.linkedin.com/in/soopin-kim-9099a426a/</a>"])],
        chImage: [profileImage2, profileImage, profileImage2],
        // extraImage :[myPanda01, myPanda02, myPanda03],
        chName: "Soopin"
    },
    {
        name: "basket",
        triggerDirections: [LEFT, UP, DOWN],
        x: 1,
        y: 4,
        text: ["My bank balance is almost empty.",
            "Give me the opportunity to work as a software developer in Canada.",
            "I am <b>PR</b> in Canada, so there is no problem with working visa :)"],
        chImage: [profileImage],
        chName: "Soopin"
    },
    {
        name: "box",
        triggerDirections: [RIGHT, UP],
        x: 6,
        y: 1,
        text: ["This is my treasure box.",
            getDialogString(["Do you want to know what my treasure is?",
            "Talk to the four objects on the right and check the answers there."])
        ],
        chImage: [profileImage],
        chName: "Soopin"
    },
    {
        name: "clock",
        triggerDirections: [UP],
        x: 2,
        y: 0,
        text: ["I am on time & scheduled person.\n  I don't put off what I have to do."
            , getDialogString(["if I late to work, there should be a reason."
                , "I probably come out early."
                , "however, sky train just stop by accident and I stuck in there."])

        ],
        chImage: [profileImage2, profileImage, profileImage2],
        chName: "Soopin"
    },
    {
        name: "food",
        triggerDirections: [RIGHT, UP, LEFT, DOWN],
        x: 6,
        y: 4,
        text: [
            "I love asian foods and huge fan of coffee."
            , getDialogString(["My favorite coffee bean is <b>TOP SHELF</b> of pallet."])
            , getDialogString(["If you like fruity flavors, you must like this one."
                , "- please check here : <a href='https://palletcoffeeroasters.com/collections/coffee/products/top-shelf' target='_blank'>https://palletcoffeeroasters.com/collections/coffee/products/top-shelf</a>"])
        ],
        chImage: [profileImage, profileImage2, profileImage],
        extraImage: [null, coffeebean, coffeebean],
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
        text: [getDialogString(["I'm born and raised in South Korea.", "I'm fluent in Korean and Japanese both."]),
            "if you have clients in Korea or Japan, It would be nice to have an employee who can communicate in a local language!"
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
            "My answer is...",
            "When I speak Japanese, I can communicate with people only who know Japanese.",
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
        text: ["I'm a goal-oriented person.",
            "I believe that I grow up through work and I want to have a good influence through my work."
        ],
        chImage: [profileImage],
        chName: "Soopin"
    },
]

export { doors, events, map };