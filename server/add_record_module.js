/*function addRecord() {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("lunchDB");
        let placeRecord = { name: "Imperia Pizza"};
        dbo.collection("places").insertOne(placeRecord, function(err, res) {
            if (err) throw err;
            console.log("1 record was inserted!");
            db.close();
        });
    });
}*/