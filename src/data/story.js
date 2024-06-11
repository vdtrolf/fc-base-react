// External dependencies
import { randomDirection } from "../utils/helpers";

import { ACTIVITY_DEAD, ACTIVITY_FLEE, ACTIVITY_BUILDING, ACTIVITY_EATING, ACTIVITY_NONE, ACTIVITY_MOVING, ACTIVITY_CLEANING, ACTIVITY_FISHING, ACTIVITY_GETING, ACTIVITY_LOVING, DIRECTION_NONE, ACTIVITY_NAMES, DIRECTION_DOWN, DIRECTION_UP,DIRECTION_LEFT,DIRECTION_RIGHT } from "../utils/constants";

// Class Implementation
export default class Story {
    constructor(
        id,
        key,
        language,
        content,
        publicationDate,
        author,
        topic,
        refURL,
        isActive) {
           this.id = id
           this.key = key
           this.language = language
           this.content = content
           this.publicationDate = publicationDate
           this.author = author
           this.topic = topic
           this.refURL = refURL
           this.isActive =isActive
}