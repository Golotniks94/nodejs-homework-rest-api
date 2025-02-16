const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
const contactsRouter = require('./routes/api/contacts')

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
const port = process.env.PORT || 3000

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/contacts', contactsRouter)

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error. Please try later' } = err
  res.status(status).json({ message })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

module.exports = app
