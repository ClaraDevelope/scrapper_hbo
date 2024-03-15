const Character = require('../models/characters')
const arrayData = require('../../../characters.json')
const insertManyCharacters = async (req, res, next) => {
  try {
    await Character.insertMany(arrayData.results)
    return res.status(201).json('personajes subidos a la BBDD correctamente')
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getAllCharacters = async (req, res, next) => {
  try {
    const allCharacters = await Character.find()
    return res.status(200).json(allCharacters)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteAllCharacters = async (req, res, next) => {
  try {
    await Character.deleteMany({})
    return res.status(200).json('Todos los personajes eliminados correctamente')
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = { insertManyCharacters, getAllCharacters, deleteAllCharacters }
