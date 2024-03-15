const {
  insertManyCharacters,
  getAllCharacters,
  deleteAllCharacters,
  getCharacterByTitle
} = require('../controllers/characters')

const charactersRouter = require('express').Router()

charactersRouter.post('/post', insertManyCharacters)
charactersRouter.get('/', getAllCharacters)
charactersRouter.get('/:title', getCharacterByTitle)
charactersRouter.delete('/deleteAll', deleteAllCharacters)

module.exports = { charactersRouter }
