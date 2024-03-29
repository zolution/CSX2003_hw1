/*
    CSX2003 Web Database Programming
    Homework 1
    Written By: B04902077 Wei-Hsuan Chiang
*/

const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const url = "mongodb://localhost:27017"

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

        var filter = { "state": { $eq: false} };
        var update = { $set: { "state": true} };
        collection.updateMany(filter, update, (err, result) => {
            if(err){
                console.log("Fail Update");
                return;
            }
            console.log("Updated " + result.modifiedCount + " Entries.");
        });

    });


});




