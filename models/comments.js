const r = require('rethinkdb'),
    { Map } = require('immutable')

module.exports.Comment = class Comment {
    static types = Map({
        'EVENT': 'event',
        'COMMUNITY': 'community',
    })

    constructor({ id, joinID, author, vote = 0, type = Comment.types.COMMUNITY, text = '', visible = false }) {
        this._id = id
        this._joinId = joinID
        this._vote = vote
        this._type = type
        this._text = text
        this._author = author
        this._visible = visible
    }

    get author() {
        return this._author
    }

    get ID() {
        return this._id
    }

    get joinID() {
        return this._joinId
    }

    get vote() {
        return this._vote
    }

    get type() {
        return this._vote
    }

    get visible() {
        return this._visible
    }

    makeVisible() {
        this._visible = true
    }

    makeInvisible() {
        this._visible = false
    }

    changeTitle(text) {
        this._text = text
    }

    changeVote(vote = 0) {
        this._vote = vote
    }

    toJSON() {
        return {
            [this.ID ? 'id' : null]: this.ID,
            joinId: this.joinID,
            vote: this.vote,
            type: this.type,
            author: this.author,
            visible: this.visible,
        }
    }
}

module.exports.Comments = class Comments {

    constructor({ table = r.table('comments') }) {
        this._table = table
    }

    static async createIndexes({ table = r.table('comments') }, conn) {
        return await table.indexCreate('type_id', [r.row('type'), r.row('joinId')]).run(conn)
    }

    async getByID({ id }, conn) {
        let results = await this._table.get(id).run(conn).then(cursor => cursor.toArray())

        let comments = results.map(result => new Comment(result))

        if (comments.length < 1) {
            throw new Error('Not found')
        }

        return comments[0]
    }

    async getAll({ type, joinID, onlyVisible = true }, conn) {
        let query = this._table
            .getAll([type, joinID], { index: 'type_id' })

        if (onlyVisible) {
            query = query.filter(r.row('visible').eq(true))
        }

        query.run(conn)
            .then(cursor => cursor.toArray())

        return results.map(result => new Comment(result))
    }

    async save({ comment = new Comment() }, conn) {

        if (!Comment.types.contains(comment.type)) {
            throw new Error(`Type ${comment.type} is not valid type`)
        }

            let result = await this._table.insert(comment.toJSON(), { conflict: 'replace' }).run(conn)

        if (result.generated_keys.length > 0) {
            return result.generated_keys[0]
        }

        return comment.ID
    }

    async delete({ id }, conn) {
        return await this._table.get(id).delete().run(conn)
    }
}
