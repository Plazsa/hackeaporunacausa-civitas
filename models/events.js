const r = require('rethinkdb'),
    { Announcements, Announcement } = require('./announcements')

 class Event {
    constructor(options) {
        let { id, community, title, description, image, location, startDate, endDate } = options

        this._id = id || ''
        this._community = community || ''
        this._title = title || ''
        this._description = description || ''
        this._image = image || ''
        this._location = location || { latitude: 0, longitude: 0, }
        this._start = startDate || new Date()
        this._end = endDate || new Date()
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
        let j = {
            id: this.ID,
            location: this.location,
            title: this.title,
            description: this.description,
            community: this.community,
            start: this.start,
            end: this.end,
            duration: this.duration,
        }

        if (!this.ID) {
            delete j.id
        }

        return j
    }
}

module.exports.Event = Event


module.exports.Events = class Events {
    constructor(options) {
        let { table, announcements } = options || {}
        this._table = table || r.table('events')
        this._announcements = announcements || new Announcements()
    }

    static async createIndexes({ table = r.table('events') }, conn) {
        return await table.indexCreate('community').run(conn)
    }

    async getByID({ id }, conn) {
        let event = await this._table
            .get(id).run(conn)

        return new Event(event)
    }

    async getAnnouncements({ id }) {
        return await this
            ._announcements
            .getAll({ type: Announcement.types.get('EVENT'), joinID: id, }, conn)
    }

    async list(conn) {
        let events = await this._table.run(conn).then(cursor => cursor.toArray())

        return events.map(event => new Event(event))
    }

    async save({ event = new Event() }, conn) {
        let result = await this._table.insert(event.toJSON(), { conflict: 'replace' }).run(conn)

        if (result.generated_keys.length > 0) {
            return result.generated_keys[0]
        }

        return event.ID
    }

    async delete({ id }) {
        await this._table.get(id).delete().run(conn)
        let a = await this.getAnnouncements({ id })

        await Promise.all(a.map(async announcement => {
            return await this._announcements.delete({ id: announcement.ID })
        }))
    }
}