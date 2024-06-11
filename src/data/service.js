// External dependencies

// Class Implementation
export default class Service {
    constructor(
         id,
         key,
         language,
         name,
         description,
         footprint,
         category,
         refURL,
         isActive) {
            this.id = id
            this.key = key
            this.language = language
            this.name = name
            this.description = description
            this.footprint = footprint
            this.category = category
            this.refURL = refURL
            this.isActive =isActive
        }

}
