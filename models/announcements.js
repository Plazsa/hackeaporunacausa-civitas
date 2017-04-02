const r = require('rethinkdb'),
    { Map } = require('immutable')

class Announcement {
    static types = Map({
        'EVENT': 'event',
        'COMMUNITY': 'community',
    })

    constructor({ id, date = new Date(), text = '', type = Announcement.types.get('EVENT'), joinID }) {
        this._id = id
        this._date = date
        this._text = text
        this._type = type
        this._joinID = joinID
    }

    get ID() {
        return this._id
    }
    get joinID() {
        return this._joinID
    }

    get date() {
        return this._date
    }

    get text() {
        return this._text
    }

    get type() {
        return this._type
    }

    toJSON() {
        return {
            [this.ID ? 'id' : null]: this.ID,
            text: this.text,
            type: this.type,
            date: this.date,
            joinId: this.joinId,
        }
    }
}

module.exports.Announcement = Announcement

class Announcements {
    constructor({ table = r.table('announcements') }) {
        this._table = table
    }

    static async createIndexes({ table = r.table('announcements') }, conn) {
        return await table.indexCreate('type_id', [r.row('type'), r.row('joinId')]).run(conn)
    }

    async getByID({ id }, conn) {
        let results = await this._table.get(id).run(conn).then(cursor => cursor.toArray())

        let announcements = results.map(result => new Announcement(result))

        if (comments.length < 1) {
            throw new Error('Not found')
        }

        return announcements[0]
    }

    async getAll({ type = Announcement.types.get('COMMUNITY'), joinID = '' }, conn) {
        let results = await this._table
            .getAll([type, joinID], { index: 'type_id' })
            .run(conn)
            .then(cursor => cursor.toArray())

        return results.map(result => new Announcement(result))
    }

    async save({ announcement = new Announcement() }, conn) {

        if (!Comment.types.contains(announcement.type)) {
            throw new Error(`Type ${announcement.type} is not valid type`)
        }

        let result = await this._table.insert(announcement.toJSON(), { conflict: 'replace' }).run(conn)

        if (result.generated_keys.length > 0) {
            return result.generated_keys[0]
        }

        return announcement.ID
    }

    async delete({ id }, conn) {
        return await this._table.get(id).delete().run(conn)
    }
}

module.exports.Announcements = Announcements