let mongoose = require('mongoose');
const config = require('../config/config');

class Database {
    constructor() {
        this.opts = {useNewUrlParser: true};
        this._connect()
    }

    _connect() {
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.connect(`mongodb://${config.server}/${config.DB_NAME}`, this.opts)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error' + err)
            })
    }
}

module.exports = new Database();