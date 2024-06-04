const { nanoid } = require ('nanoid')
const notes = require('./notes')

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload

    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    }
    notes.push(newNote)

    const isSucces = notes.filter((note) => note.id === id).length > 0 //menentukan apakah newNote sudah masuk ke dalam array notes
    if(isSucces) {
        const response = h.response ({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id
            }
        })
        response.code(201)
        return response
    }

    const response = h.response({
        status: 'failed',
        message: 'Catatan gagal ditambahkan'
    })
    response.code(500)
    return response
}

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes
    }
})

const getIdNotesHandler = (request, h) => {
    const { id } = request.params

    const note = notes.filter((n) => n.id === id)[0]
    if(note !== undefined) {
        return{
            status: 'success',
            data: {
                note
            }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'catatan tidak ditemukan'
    })
    response.code(400)
    return response
}

const updateNotesHandler = (request, h) => {
    const { id } = request.params
    const { title, tags, body } = request.payload
    const updateAt = new Date().toISOString()
    const index = notes.findIndex((note) => note.id === id)

    if(notes[index] !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt
        }

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diubah'
        })  
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal diubah'
    })
    response.code(400)
    return response

}

const deleteNotesHandler = (request, h) => {
    const { id } = request.params
    const note = notes.findIndex((note) => note.id === id)

    if(note !== -1) {
        notes.splice(note, 1)
        const response = h.response ({
            status: 'succes',
            message: 'Data berhasil dihapus'
        })
        response.code(200)
        return response
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus'
    })
    response.code(404)
    return response
}

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getIdNotesHandler,
    updateNotesHandler,
    deleteNotesHandler
}