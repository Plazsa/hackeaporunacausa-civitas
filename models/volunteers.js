const r = require('rethinkdb')

class Volunteer {
    constructor(options) {
        let { id, hash, fullName, email, occupation, summary, picture, badges, abilities, location } = options
        this._id = id
        this._fullName = fullName
        this._summary = summary
        this._picture = picture
        this._badges = badges||[]
        this._location = location||{ latitude: 0, longitude: 0 }
        this._occupation = occupation
        this._email = email
        this._abilities = abilities||[]
        this._hash = hash
    }

    get ID() {
        return this._id
    }

    get hash() {
        return this._hash
    }

    get fullName() {
        return this._fullName
    }

    get summary() {
        return this._summary
    }

    get picture() {
        return this._picture
    }

    get badges() {
        return this._badges
    }

    get abilities() {
        return this._abilities
    }

    get location() {
        return this._location
    }

    get occupation() {
        return this._occupation
    }

    get email() {
        return this._email
    }

    get points() {
        return this.badges.reduce((total, badge) => {
            return total + badge.value
        }, 0)
    }

    changePicture(picture) {
        this._picture = picture
    }

    addAbility(ability) {
        this._abilities.push(ability)
    }

    changeLocation(location = { latitude: 0, longitude: 0 }) {
        this._location = location
    }

    changeOccupation(occupation) {
        this._occupation = occupation
    }

    addBadge(badge) {
        this._badges.push(badge)
    }

    changeSummary(summary) {
        this._summary = summary
    }

    changeFullName(name) {
        this._fullName = name
    }

    toJSON() {
        return {
            [this.ID ? 'id' : null]: this.ID,
            abilities: this.abilities,
            badges: this.badges,
            summary: this.summary,
            fullName: this.fullName,
            occupation: this.occupation,
            location: this.location,
            picture: this.picture,
            email: this.email,
            points: this.points,
            hash: this.hash,
        }
    }
}

module.exports.Volunteer = Volunteer


class Volunteers {
    constructor(options) {
        let { table } = options||{}
        this._table = table||r.table('comments')
    }

    static async createIndexes({ table = r.table('events') }, conn) {
        return await table.indexCreate('email').run(conn)
    }

    async getByID({ id }, conn) {
        let volunteer = await this._table
            .get(id).run(conn)
            .then(cursor => cursor.toArray())
            .then(volunteers => volunteers.length > 0 ? volunteers[0] : null)

        return new Volunteer(volunteer)
    }

    async getByEmail({ email = '' }, conn) {
        let volunteer = await this._table
            .getAll(email, { index: 'email' }).run(conn)
            .then(cursor => cursor.toArray())
            .then(volunteers => volunteers.length > 0 ? volunteers[0] : null)

        return new Volunteer(volunteer)
    }

    async list(conn) {
        let volunteers = await this._table
            .get(id).run(conn)
            .then(cursor => cursor.toArray())

        return volunteers.map(volunteer => new Volunteer(volunteer))
    }

    async save({ volunteer = new Volunteer() }, conn) {
        let result = await this._table.insert(volunteer.toJSON(), { conflict: 'replace' }).run(conn)

        if (result.generated_keys.length > 0) {
            return result.generated_keys[0]
        }

        return volunteer.ID
    }
}

module.exports.Volunteers = Volunteers