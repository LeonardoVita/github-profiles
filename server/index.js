const { json } = require('express')
const express = require('express')
const superagent = require('superagent')
const app = express()

const client_id = process.env.REACT_APP_CLIENT_ID
const client_secret = process.env.REACT_APP_CLIENT_SECRET

app.get('/', (request, response) => {
  response.send('Simple OAuth app')
})

app.get('/login/github', (request, response) => {

  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http://localhost:3333/login/github/callback`
  response.redirect(url)
})


app.get('/login/github/callback', async (request, response) => {

  const { code } = request.query

  const data = await superagent
    .post('https://github.com/login/oauth/access_token')
    .send({ client_id, client_secret, code })
    .set('Accept', 'application/json')
    .catch((err) => { console.log(err) })

  // console.log(data)

  const acess_data = await JSON.parse(data.text)

  const user = await superagent
    .get('https://api.github.com/user')
    .set('Authorization', `${acess_data.token_type} ${acess_data.access_token}`)
    .set('User-Agent', 'ghprofiles')
    .catch((err) => { console.log(err) })

  const user_data = JSON.parse(user.text)
  response.send({ user_data, acess_data })

})


app.listen(3333);