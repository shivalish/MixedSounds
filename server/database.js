var PouchDB = require('pouchdb')
const database = new PouchDB('musicdb')

database.info().then((e) => {
    console.log(e)
})

database.put({ 
    _id: 'example',