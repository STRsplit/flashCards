const http = require('http')
const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/cards/:cardType', (req, res) => {
  const { cardType } = req.params
  let dirJSON = path.join(__dirname + `/../cards/${cardType}Answers.json`)
  let ourData = fs.readFileSync(dirJSON)
  ourData = JSON.stringify(JSON.parse(ourData), null, 2)
  res.send(ourData)
})

app.get('*', (req, res) => {
  res.status(500).send('error: no such endpoint')
})

app.listen(port, (err) => {
  if (err) return console.log(err)
  console.log('listening on port', port)
})
