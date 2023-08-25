import { UP, DOWN,RIGHT,LEFT } from "../util/constants"

export const isEventFromCurrentPosition =(events, characterX, characterY, characterDirection)=> {
    const eventToTrigger = events.find(event => {
        const isAdjacent =
            // (event.x === characterX && event.y === characterDirection && event.triggerDirections === characterDirection)
            (event.x === characterX + 1 && event.y === characterY && characterDirection === RIGHT) ||
            (event.x === characterX && event.y === characterY + 1 && characterDirection === DOWN) ||
            (event.x === characterX - 1 && event.y === characterY && characterDirection === LEFT) ||
            (event.x === characterX && event.y === characterY - 1 && characterDirection === UP);
        // console.log("hide", event.hide)
        return isAdjacent && event.triggerDirections.includes(characterDirection ) && !event.hide;
    });
    // console.log("treiger", eventToTrigger)
    return eventToTrigger;
}
export const getEventByName = (events, name) => {
    return events.find(e => e.name === name);
}

export const updateEvent = (events, name, key, value) => {
    const event = events.find(event => event.name === name);
    if (event) {
        event[key] = value;
    } else {
        console.warn(`Event with name ${name} not found.`);
    }
}
