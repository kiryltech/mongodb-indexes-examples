for (var i = 0; i < 10000; i++) {
    db.coll.save({
        v1:Math.floor(Math.random() * 10),
        v2:Math.floor(Math.random() * 10),
        v3:Math.floor(Math.random() * 10)
    });
}

function runQuery(q, order) {
    var cursor = db.coll.find(q);
    if (order) {
        cursor = cursor.sort(order);
    }
    var explain = cursor.explain();
    print("Query: " + tojsononeline(q) + (order ? ", sorted: " + tojsononeline(order) : ""));
    print("Explain:");
    printjson(explain);
}

// Full table scan
runQuery({v1:8, v2:8});
runQuery({v1:8, v2:8}, {v3:1});
runQuery({v1:8, v2:{$in:[8, 4]}}, {v3:1});
runQuery({v1:{$in:[8, 4]}, v2:8}, {v3:1});

db.coll.ensureIndex({v1:1, v2:1, v3:1});
print("Index: " + tojsononeline({v1:1, v2:1, v3:1}));

runQuery({v1:8, v2:8});         // Index-defined sorting
runQuery({v1:8, v2:8}, {v3:1}); // Index-defined sorting
runQuery({v1:8, v2:{$in:[8, 4]}}, {v3:1}); // In-memory sorting
runQuery({v1:{$in:[8, 4]}, v2:8}, {v3:1}); // In-memory sorting

db.coll.dropIndex({v1:1, v2:1, v3:1});
db.coll.ensureIndex({v1:1, v3:1});
db.coll.ensureIndex({v2:1, v3:1});
print("Index: " + tojsononeline({v1:1, v3:1}));
print("Index: " + tojsononeline({v2:1, v3:1}));

runQuery({v1:8, v2:8});         // Index-defined sorting
runQuery({v1:8, v2:8}, {v3:1}); // Index-defined sorting
runQuery({v1:8, v2:{$in:[8, 4]}}, {v3:1}); // Index-defined sorting
runQuery({v1:{$in:[8, 4]}, v2:8}, {v3:1}); // Index-defined sorting

db.dropDatabase();