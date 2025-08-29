import express from "express"
import axios from "axios"
import bodyParser from "body-parser";




const port=3000;
const app=express();
const api_key="d07971acf3ecdd158e274dc1a12a57eb"


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
//Get Request
app.get('/',(req,res)=>
{
    //Homepage
    res.render('index.ejs',{data:null})
})
// Post Request

app.post("/submit",(req,res)=>{

 axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${req.body.q}&limit=5&appid=${api_key}`)
    .then(response=>{
        //axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=&lon=&appid=${api_key}`)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${api_key  }`)
        .then(response2=>{
            //res.send(response2.data[0].temp)
            res.render('index.ejs',{data:response2.data})
            console.log(response2.data.main.temp)
        
      //  console.log(`name:${response.data[0].name},latiitude:${response.data[0].lat},logitude:${response.data[0].lon}`)})
        })})
    .catch(err2=>{
            console.log("Error2 is ",err2)
        })
      .catch(err=>{
        console.err("Error handling",err)
    })
})  
        
       // res.send(data)
    //console.log(data)

app.listen(port,()=>{
    console.log(`Server started listening on the ${port}...`)
})