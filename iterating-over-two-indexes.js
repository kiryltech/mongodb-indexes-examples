// create initial data
for (var i = 0; i < 100; i++) {
    db.coll.save({
        v1:i,
        v2:"str" + i,
        v3:i
    });
}

// Preparing indexes
db.coll.ensureIndex({v1:1});
db.coll.ensureIndex({v3:1});

print("Example of iterating over two indexes");
printjson(db.coll.find({
    $or:[
        {
            v1:{
                $gte:10,
                $lte:39
            }
        },
        {
            v3:{
                $gte:35,
                $lte:49
            }
        }
    ]
}).explain());

print("Trying to iterate over two indexes and sort");
printjson(db.coll.find({
    $or:[
        {
            v1:{
                $gte:10,
                $lte:39
            }
        },
        {
            v3:{
                $gte:35,
                $lte:49
            }
        }
    ]
}).sort({v2:1}).explain());

db.dropDatabase();