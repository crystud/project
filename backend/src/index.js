import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, resp) => {
  resp.send('<h1>fuck</h1>')
})

app.listen(port)
