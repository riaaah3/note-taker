const express = require('express')
const app = express();
const PORT = process.env.PORT || 3003

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))

const apiroutes = require('./routes/apiroutes')
const htmlroutes = require('./routes/htmlroutes')

app.use(apiroutes)
app.use(htmlroutes)
app.listen(PORT, function(){
    console.log('routes are working')
})
