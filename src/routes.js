const { 
    addNoteHandler,
    getAllNotesHandler,
    getIdNotesHandler,
    updateNotesHandler,
    deleteNotesHandler
 } = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getIdNotesHandler
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: updateNotesHandler
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNotesHandler
    }
]

module.exports = routes