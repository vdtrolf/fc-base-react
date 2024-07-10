import { FISH_LETARGY } from "../utils/constants";
import { randomDirection } from "../utils/helpers"

// Class Implementation
export default class NewsItem {
    constructor(
        id,
        key,
        language,
        content,
        publicationDate,
        author,
        topic,
        refURL,
        domain,
        isActive) {
            this.id = id
            this.key = key
            this.language = language
            this.content = content
            this.publicationDate = publicationDate
            this.author = author
            this.topic = topic
            this.refURL = refURL
            this.domain = domain
            this.isActive =isActive

    }

}