const path = require('path')
const express = require('express')

const app = express()

app.use(express.static(__dirname + '/dist'))

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist', 'index.html')
})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`App listening on 3000....`)
})
