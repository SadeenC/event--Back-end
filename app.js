const express =require("express");
var app = express();
const cors = require('cors');
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const fileUpload = require('express-fileupload');
// const path = require('path');
const mongoose = require("mongoose");




mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
app.use(cookieParser());
app.use(cors({credentials:true}));
app.use(express.json({limit:'50mb'}))

// app.use(fileUpload());

var port = process.env.PORT || 6000;






// Increase the maximum request size limit to 100MB
// app.use(bodyParser.json({limit: '100mb'}));
// app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

// Your routes go here




// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

var v1 = require('./api/routes');
const { signedCookie } = require("cookie-parser");


app.use('/api/v1', v1.router);


app.use(function(req,res){
    res.status(404).send({url:req.originalUrl+" not found"});
});


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    //useCreateIndex:true
   
})
    .then(()=>{
        app.listen(port, () => {
            console.log(`API server is started on: ${port}`);
        });
    })
    .catch(error=>{
        console.error(error.message);
    })
