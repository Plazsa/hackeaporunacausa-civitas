const r = require('rethinkdb'),
    { Event, Events } = require('./events'),
    { Announcement, Announcements } = require('./announcements')

class Community {
    constructor({ id, title, website, cause, location = { latitude: 0, longitude: 0 }, picture, contact }) {
        this._id = id
        this._title = title
        this._website = website
        this._cause = cause
        this._location = location
        this._picture = picture
        this._contact = contact
    }

    get ID() {
        return this._id
    }

    get title() {
        return this._title
    }

    get cause() {
        return this._cause
    }

    get website() {
        return this._website
    }

    get location() {
        return this._location
    }

    get picture() {
        return this._picture
    }

    get contact() {
        return this._contact
    }

    toJSON() {
        return {
            [this.ID ? 'id' : null]: this.ID,
            title: this.title,
            website: this.website,
            cause: this.cause,
            location: this.location,
            picture: this.picture,
            contact: this.contact
        }
    }
}

module.exports.Community = Community

class Communities {
    constructor({ table = r.table('communities'), announcements = new Announcements(), events = new Events() }) {
        this._table = table
        this._announcements = announcements
        this._events = events
    }

    async getByID({ id }, conn) {
        let community = await this._table
            .get(id).run(conn)
            .then(cursor => cursor.toArray())
            .then(communities => communities.length > 0 ? communities[0] : null)

        return new Community(community)
    }

    async save({ community = new Community() }, conn) {

        let result = await this._table.insert(community.toJSON(), { conflict: 'replace' }).run(conn)

        if (result.generated_keys.length > 0) {
            return result.generated_keys[0]
        }

        return community.ID
    }

    async list(conn) {
        let communities = await this._table.run(conn).then(cursor => cursor.toArray())
        return communities.map(community => new Community(community))
    }

    async getAnnouncements({ id }) {
        return await this
            ._announcements
            .getAll({ type: Announcement.types.get('COMMUNITY'), joinID: id, }, conn)
    }

    async getEvents({ id }) {
        return await this
            ._events
            .getAll({ type: Event.types.get('COMMUNITY'), joinID: id, }, conn)
    }


    async delete({ id }) {

        let a = await this.getAnnouncements({ id })

        return await Promise.all(a.map(async announcement => {
            return await this._announcements.delete({ id: announcement.ID })
        }).push(async () => {
            return await this._table.get(id).delete().run(conn)
        }))
    }
}

module.exports.Communities = Communities