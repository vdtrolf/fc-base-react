import { FISH_LETARGY } from "../utils/constants";
import { randomDirection } from "../utils/helpers"

// Class Implementation
export default class News {
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

}
