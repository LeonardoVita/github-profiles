const express = require('express')
const cors = require('cors')
const superagent = require('superagent')
const app = express()

app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
  app.use(cors())
  next();
})

const client_id = process.env.REACT_APP_CLIENT_ID
const client_secret = process.env.REACT_APP_CLIENT_SECRET
const host = "http://localhost:3333"

app.get('/', (request, response) => {
  response.send('Simple OAuth app')
})

// app.get('/login/github', (request, response) => {

//   const url = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${host}/Authorize`
//   response.redirect(url)
// })


app.get('/Authorize', async (request, response) => {

  const { code } = request.query

  const data = await superagent
    .post('https://github.com/login/oauth/access_token')
    .send({ client_id, client_secret, code })
    .set('Accept', 'application/json')
    .catch((err) => { console.log(err) })

  const acess_data = await JSON.parse(data.text)

  const user = await superagent
    .get('https://api.github.com/user')
    .set('Authorization', `${acess_data.token_type} ${acess_data.access_token}`)
    .set('User-Agent', 'ghprofiles')
    .catch((err) => { console.log(err) })

  console.log("Autorizado!!")
  const user_data = JSON.parse(user.text)
  response.send({ user_data, acess_data })

})

app.get('/users/:name', async (request, response) => {

  const user = await superagent
    .get('https://api.github.com/user')
    .set('Authorization', `${acess_data.token_type} ${acess_data.access_token}`)
    .set('User-Agent', 'ghprofiles')
    .catch((err) => { console.log(err) })

  response.send("em dev")
})

app.listen(3333);