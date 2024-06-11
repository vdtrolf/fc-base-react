import {
    ACTIVITY_BUILDING, ACTIVITY_MOVING, ACTIVITY_CLEANING, ACTIVITY_FISHING, ACTIVITY_GETING, ACTIVITY_NONE, ACTIVITY_EATING,
    MOVES, ACTIVITY_NAMES, DIRECTION_NAMES, COMMAND_NONE, COMMAND_EATING
} from "./constants";

export const findItem = (vpos, hpos, items) => {
    // //
    for (let direction = 0; direction < 4; direction++) {
        const coord = (vpos + MOVES[direction][0]) * 100 + hpos + MOVES[direction][1]
        if (items[coord])
            return direction
    }
    return -1
}


export const interpretCommands = (commandType, commandDirection, vpos, hpos, DevicesPos, fishesPos, ServicesPos, garbagesPos) => {

    // console.log("============ FISHESPOS IN INTERPRETER >>>> ")
    // console.dir(fishesPos)
    // console.log("============ FISHESPOS IN INTERPRETER >>>> ")
    
    //returns the given activity as a CONSTANT value//

    let activity = ACTIVITY_NONE
    let activityName = ACTIVITY_NAMES[ACTIVITY_NONE]
    let move = MOVES[commandDirection]

    if (commandType && commandType !== COMMAND_NONE) {

        if (commandType === COMMAND_EATING) {
            activity = ACTIVITY_EATING
            activityName = ACTIVITY_NAMES[ACTIVITY_EATING]
        } else {
            const move = MOVES[commandDirection]

            if (fishesPos[(vpos + move[0]) * 100 + hpos + move[1].hmove]) {
                activity = ACTIVITY_FISHING
                activityName = ACTIVITY_NAMES[ACTIVITY_FISHING]
            } else if (ServicesPos[(vpos + move[0]) * 100 + hpos + move[1]]) {
                activity = ACTIVITY_GETING
                activityName = ACTIVITY_NAMES[ACTIVITY_GETING]
            } else if (garbagesPos[(vpos + move[0]) * 100 + hpos + move[1]]) {
                activity = ACTIVITY_CLEANING
                activityName = ACTIVITY_NAMES[ACTIVITY_CLEANING]
            } else if (DevicesPos[(vpos + move[0]) * 100 + hpos + move[1]].type === 0) {
                activity = ACTIVITY_BUILDING
                activityName = ACTIVITY_NAMES[ACTIVITY_BUILDING]
            } else if (DevicesPos[(vpos + move[0]) * 100 + hpos + move[1]].type > 0) {
                activity = ACTIVITY_MOVING
                activityName = ACTIVITY_NAMES[ACTIVITY_MOVING]
            }
        }
    } 
    return {
        'activity': activity,
        'activityName': activityName,
        'directionNum': commandDirection,
        'vmove': move[0],
        'hmove': move[1],
        'directionName': DIRECTION_NAMES[commandDirection]
    }
}