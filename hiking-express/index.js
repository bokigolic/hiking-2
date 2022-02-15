const express = require('express')
const app = express()
// const port = 3000
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/zdravo', (req, res) => {
  res.send('Zdravo i tebi!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})