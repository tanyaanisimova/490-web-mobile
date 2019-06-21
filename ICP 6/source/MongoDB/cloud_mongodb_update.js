/**
 * Created by Vijaya Yeruva on 5/27/2017.
 */

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://lesson6:lesson6@ds239128.mlab.com:39128/aplwebdemo';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbase = db.db("aplwebdemo");
    var myquery = { address: /^S/ };
    var newvalues = {$set: {name: "Minnie"} };
    var myoptions = { multi: true };
    dbase.collection("newCollection").updateMany(myquery, newvalues, myoptions, function(err, res) {
        if (err) throw err;
        console.log(res.result.nModified + " record(s) updated");
        db.close();
    });
});
