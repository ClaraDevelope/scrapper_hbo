require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const { charactersRouter } = require('./src/api/routes/characters')

const app = express()
connectDB()
PORT = 5050

app.use('/api/v1/characters', charactersRouter)

app.use('*', (req, res, next) => {
  return res.status(404).json('RUTA NO ENCONTRADA')
})
app.listen(PORT, () => {
  console.log('http://localhost:' + PORT)
})
