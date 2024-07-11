// External dependencies

// Class Implementation
export default class Site {
    constructor(
         id,
         key,
         language,
         user,
         domain,
         domains,
         stories,
         newsItems) {
            this.id = id
            this.key = key
            this.language = language
            this.user = user
            this.domain = domain
            this.domains = domains
            this.stories = stories
            this.newsItems = newsItems
        }

    
    // transmitCommands = (penguin, vpos, hpos) => {
          
    //     penguin.executeCommand( vpos, 
    //         hpos,
    //         this.#populateDevices(),
    //         this.#populatePenguins(), 
    //         this.#populateFishes(), 
    //         this.#populateServices(), 
    //         this.#populateGarbages())

    //     return this
    // }

}