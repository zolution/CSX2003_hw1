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
        var illegal = [];
        collection.find().toArray( (err, docs) => {
            
            if(err){
                console.log("Error in find_toArray");
                return;
            }
            var len = docs.length;
            for(var i = 0; i<len;i++){
                try{
                    var time_string = docs[i]['time'];
                    var atime = parseInt(time_string.slice(0,2))*60 + parseInt(time_string.slice(3,5));
                    var btime = parseInt(time_string.slice(6,8))*60 + parseInt(time_string.slice(9,11));
                    if(btime-atime > 240 || btime - atime < 0) illegal.push(docs[i]._id);
                }
                catch(e){
                    illegal.push(docs[i]._id);
                }
            }
            
            var filter = { "_id": { $in: illegal} };
            collection.remove(filter, (err, result) => {
                if(err){
                    console.log("Fail Update");
                    return;
                }
                console.log("Done Successfully");
                client.close(); 
            });
        });
        /*
        var filter = { "_id": { $in: illegal} };
        collection.remove(filter, (err, result) => {
            if(err){
                console.log("Fail Update");
                return;
            }
            console.log("Removed " + result.nRemoved + " Entries.");
            console.log(result);
        });*/
    });


});




