const {
  insertManyCharacters,
  getAllCharacters,
  deleteAllCharacters
} = require('../controllers/characters')

const charactersRouter = require('express').Router()

charactersRouter.post('/post', insertManyCharacters)
charactersRouter.get('/', getAllCharacters)
charactersRouter.delete('/deleteAll', deleteAllCharacters)

module.exports = { charactersRouter }
