const r = require('rethinkdb'),
    { Announcements, Announcement } = require('./announcements')

module.exports.Event = class Event {
    constructor({ id, community, title, description, image, location = { latitude: 0, longitude: 0, }, startDate = new Date(), endDate = new Date() }) {
        this._id = id
        this._community = community
        this._title = title
        this._description = description
        this._image = image
        this._location = location
        this._start = startDate
        this._end = endDate
    }

    get ID() {
        return this._id
    }

    get community() {
        return this._community
    }

    get title() {
        return this._title
    }

    get description() {
        return this._description
    }

    get image() {
        return this._image
    }

    changeImage(image) {
        this._image = image
    }

    get start() {
        return this._start
    }

    get end() {
        return this._end
    }

    get duration() {
        return this.end.getTime() - this.start.getTime()
    }

    get location() {
        return this._location
    }

    toJSON() {
        return {
            [this.ID ? 'id' : null]: this.ID,
            location: this.location,
            title: this.title,
            description: this.description,
            community: this.community,
            start: this.start,
            end: this.end,
            duration: this.duration,
        }
    }
}


module.exports.Events = class Events {
    constructor({ table = r.table('events'), announcements = new Announcements() }) {
        this._table = table
        this._announcements = announcements
    }

    static async createIndexes({ table = r.table('events') }, conn) {
        return await table.indexCreate('community').run(conn)
    }

    async getByID({ id }, conn) {
        let event = await this._table
            .get(id).run(conn)
            .then(cursor => cursor.toArray())
            .then(events => events.length > 0 ? events[0] : null)

        return new Event(event)
    }

    async getAnnouncements({ id }) {
        return await this
            ._announcements
            .getAll({ type: Announcement.types.get('EVENT'), joinID: id, }, conn)
    }

    async delete({ id }) {
        await this._table.get(id).delete().run(conn)
        let a = await this.getAnnouncements({ id })

        await Promise.all(a.map(async announcement => {
            return await this._announcements.delete({ id: announcement.ID })
        }))
    }
}