// create initial data
for (var i = 0; i < 1000; i++) {
    db.coll.save({
        v1: i,
        v2: "str" + i,
        a1: [Math.floor(i / 100), i % 20, 13]
    });
}

print("1. Full table scan examples...");
print("1.1. Find by single value field");
printjson(db.coll.find({v1: 123}).explain());
print("1.2. Find rare value by array field");
printjson(db.coll.find({a1: 7}).explain());
print("1.3. Find frequent value by array field");
printjson(db.coll.find({a1: 13}).explain());

print("2. Indexed search");
db.coll.ensureIndex({v1: 1});
db.coll.ensureIndex({a1: 1});
print("2.1. Find by single value field");
printjson(db.coll.find({v1: 123}).explain());
print("2.2. Find rare value by array field");
printjson(db.coll.find({a1: 7}).explain());
print("2.3. Find using $in operator");
printjson(db.coll.find({a1: {$in:[13, 7]}}).explain());
print("2.4. Find using $all operator (frequent value first)");
printjson(db.coll.find({a1: {$all:[13, 7]}}).explain());
print("4. Find using $all operator (rare value first)");
printjson(db.coll.find({a1: {$all:[7, 13]}}).explain());

db.dropDatabase();