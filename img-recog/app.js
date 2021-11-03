var express = require("express");
var cors = require("cors");
var axios = require("axios");

var app = express();
app.use(cors());

const UPLOAD_URL = "https://my-api.plantnet.org/v2/identify/all?api-key=2b10189SmpQJ3XHmESgf2Hz9k";
/*
Axios response object, properties
data, status, statusText, headers, request
http://zetcode.com/javascript/axios/
*/
app.post("/create", function(req, res) {
    axios.post(UPLOAD_URL, req.body).then(response => {
        if(response.status === 200) {
            res.send(response.data);
        } 
    }).catch(err => {
        console.log("Error making the request");
        res.send(err);
    })
});

const port = 3001;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

// const express = require('express');
// const app = express();
// const port = 3001;
// 
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
//   });
// 
// app.get("/", (req, res) => {
//     // read query parameters
//     const api_key = req.query["api-key"];
//   
//     // craft IEX API URL
//     const url = `https://my-api.plantnet.org/v2/identify/all?api-key=${api_key}`;
//   
//     // make request to IEX API and forward response
//     request(url).pipe(res);
//   });
//   
// app.listen(port, () => console.log(`http://localhost:${port}`));