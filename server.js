const { query } = require('express');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/weather',(req,res)=>{
    if(req.query.location){
        geocode(req.query.location,(error,data)=>{
            if(error){
                return res.send(error);
            }else{
                forecast(data.latitude,data.longitude,(error,data)=>{
                    if(error){
                        return res.send(error);
                    }else{
                        return res.render('weather',{
                            temprature: data,
                        })
                    }
                })
            }
        });
    }else{
        res.send("Enter location in query");
    }
});

app.listen(port,()=>{
    console.log("Server running at "+port+"....");
});