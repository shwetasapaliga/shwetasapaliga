const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const port= 8080
app.listen(port), ()=> console.log(`Server started on ${port}`)

const rawData = fs.readFileSync(path.resolve('./resources/data/data.json'))
const countriesData = JSON.parse(rawData)
const countryResponse = countriesData.countries.map((item,index)=>({name: item.name, id:index}))
app.get('/countries', (req, res)=>
    res.json(countryResponse)
    
)

app.get('/countries/:id', (req, res)=>{
    console.log("in server: ",req.params.id)
    const searchId = req.params.id
    for(let i = 0; i< countryResponse.length;i++){
        if(searchId==countryResponse[i].id){
            console.log(countriesData.countries[i]);
            res.send(countriesData.countries[i])
        }
    }
})
