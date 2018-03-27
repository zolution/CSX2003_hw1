/*
    CSX2003 Web Database Programming
    Homework 1
    Written By: B04902077 Wei-Hsuan Chiang
*/

const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const url = "mongodb://140.112.28.194:27017/Movie"

const dbName = "Movie";
const collectionName = "b04902077";
var movieobj = require("./data.json");
//console.log(obj[0]);

MongoClient.connect(url, (err, client) => {
    if(err){
        console.log("Connection Fail");
        return;
    }

    const db = client.db(dbName);
    
    db.collection(collectionName, (err, collection) => {
        if(err){
            console.log("Collection " + collectionName + " NOT FOUND!");
            return;
        }
        collection.insertMany(movieobj);
        client.close();
    });

});

