
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
        text: [getDialogString(["Hello! My name is Soopin Kim, a software developer with over three years of professional experience in web and software development in South Korea."])
            , getDialogString(["For more information, you to visit my LinkedIn profile: ", "<a href='https://www.linkedin.com/in/soopin-kim-9099a426a/' target='_blank'>https://www.linkedin.com/in/soopin-kim-9099a426a/</a>"])],
        chImage: [profileImage2, profileImage, profileImage2],
        // extraImage :[myPanda01, myPanda02, myPanda03],
        chName: "Soopin"
    },
    {
        name: "basket",
        triggerDirections: [LEFT, UP, DOWN],
        x: 1,
        y: 4,
        text: ["My bank balance is almost empty, so I am extremely interested in the opportunity to work as a software developer in Canada. ",
            "I'm a Permanent Resident, so there are no work visa hurdles to clear!",
        ],
        chImage: [profileImage],
        chName: "Soopin"
    },
    {
        name: "box",
        triggerDirections: [RIGHT, UP],
        x: 6,
        y: 1,
        text: ["This is my treasure box.",
            getDialogString(["Do you know what my treasure is?",
            "You can find the answers through the four objects on the right."])
        ],
        chImage: [profileImage],
        chName: "Soopin"
    },
    {
        name: "clock",
        triggerDirections: [UP],
        x: 2,
        y: 0,
        text: ["I am a punctual individual who prioritizеs еffеctivе timе managеmеnt."
            , "I can mееt dеadlinеs and am committed to еxеcuting tasks promptly, with strong resistance to procrastination."
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
            "I enjoy Asian food and am a major coffee enthusiast."
            , getDialogString(["My go-to choice of coffee bean is called <b>'Top Shelf'</b> from Pallet."])
            , getDialogString(["If you're a fan of fruity flavors, you'll likely find this one irresistible!"
                , "You can check it out here: : <a href='https://palletcoffeeroasters.com/collections/coffee/products/top-shelf' target='_blank'>https://palletcoffeeroasters.com/collections/coffee/products/top-shelf</a>"])
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
        text: ["My strength is..."
            ,getDialogString(["My strength is..."
            ,"I am a quick learner. My ability to adapt is my core strength."])
            ,getDialogString(["English is not my first language and I am still learning each day."
            ,"I am confident that I will be able to speak fluently in time. "])
        ],
        chImage: [profileImage],
        chName: "Soopin"
    },
    {
        name: "object2",
        triggerDirections: [UP],
        x: 8,
        y: 1,
        text: [getDialogString(["I was born and raised in South Korea and am fluent in both Korean and Japanese."]),
            "Should you have clients or stakeholders in Korea or Japan, my linguistic skills could serve as a valuable asset for effective communication."
        ],
        chImage: [profileImage],
        chName: "Soopin"
    },
    {
        name: "object3",
        triggerDirections: [UP],
        x: 9,
        y: 1,
        text: ["Why did I choose a career in software development? ",
            getDialogString(["The reason is straightforward: the field of software development serves as a canvas upon which I can manifest my creative visions.","I find immense joy in crafting something new from scratch."])
            , "Moreover, the profession allows me to collaborate with a diverse array of developers."
            , "The experience of working collectively to accomplish large-scale tasks has been highly rewarding. These compelling factors have fueled my desire to continue pursuing a career in software development."
        ],
        chImage: [profileImage],
        chName: "Soopin"
    },
    {
        name: "object4",
        triggerDirections: [UP],
        x: 10,
        y: 1,
        text: ["I am a goal-oriented person.",
            "I believe that personal growth is achieved through dedication and hard work, and I aspire to make a positive impact through my work."
        ],
        chImage: [profileImage],
        chName: "Soopin"
    },
]

export { doors, events, map };