require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p></ br><p>${Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  const id = Math.floor(Math.random() * 1000) 
  person.id = id 

  if (person.name.length === 0) {
    response.status(404).end('error: name is missing')
  }

  if (person.number.length === 0) {
    response.status(404).end('error: number is missing')
  }

  if (persons.find(p => p.name === person.name)) {
    response.status(409).end('error: name must be unique')
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})