const express=require('express');//express framework
const app=new express()
const bodyParser = require("body-parser")
const fs = require('fs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const morgan=require('morgan');  
app.use(morgan('dev'));        // app level middleware
require('dotenv').config(); 
const base_route=require('./routes/basicRoutes');  //requir using path   //local module import
app.use('/api',base_route)    //redirect to basic_routes if an api is incoming


app.listen(process.env.PORT,()=>{     //server in listening mode
    console.log(`Server is listening on PORT ${process.env.PORT}`);
})
