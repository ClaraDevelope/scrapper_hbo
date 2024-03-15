const mongoose = require('mongoose')
const characterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    details: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'character'
  }
)

const Character = mongoose.model('character', characterSchema, 'character')
module.exports = Character
