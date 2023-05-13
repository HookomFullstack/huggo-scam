const express = require('express')
const path = require('path')
const app = express()
const port = 3000;

app.use(express.static(path.join(__dirname, 'build')))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Sitio web corriendo en el puerto ${port}
Ingresa ha http://localhost:3000
  `)
})