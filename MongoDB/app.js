var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    insertDocuments(db, function() {
        updateDocument(db, function() {
            deleteDocument(db, function() {
                findDocuments(db, function() {
                    db.close();
                });
            });
        });
    });
});


var insertDocuments = function (db, callback) {
// Get the documents collection
    var collection = db.collection('documents');
// Insert some documents
    collection.insertMany([
        {a: 1}, {a: 2}, {a: 3}
    ], function (err, result) {
        //- result Contains the result document from MongoDB
        //- ops Contains the documents inserted with added _id fields
        //- connection Contains the connection used to perform the insert
        console.log(result.result.n)
        console.log(result.ops.length);
        console.log("Inserted 3 documents into the document collection");
        callback(result);
    });
}

var updateDocument = function(db, callback) {
// Get the documents collection
 var collection = db.collection('documents');
 // Update document where a is 2, set b equal to 1
  collection.updateMany({ a : 2 }
      , { $set: { b : 5 } }, function(err, result) {
          console.log("Updated the document with the field a equal to 2");
          console.warn(result.result.n)
          callback(result.result.n);
      });
}

var deleteDocument = function(db, callback) {
// Get the documents collection
 var collection = db.collection('documents');
 // Insert some documents
  collection.deleteOne({ a : 3 }, function(err, result) {
      console.log("Removed the document with the field a equal to 3"); callback(result);
      console.warn(result.result.n)
  });
}

var findDocuments = function(db, callback) {
// Get the documents collection
 var collection = db.collection('documents');
 // Find some documents
  collection.find({}).toArray(function(err, docs) {
      console.log("Found the following records");
      console.log(docs);
      callback(docs);
  });
}