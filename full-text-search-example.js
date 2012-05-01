function Repository() {
    function addWords(list, str) {
        str.toLowerCase().split(" ").forEach(function (w) {
            if (w.length > 2 && list.indexOf(w) == -1) {
                list[list.length] = w;
            }
        });
        return list;
    }

    function collectWords(list, obj) {
        Object.keySet(obj).forEach(function (key) {
            var val = obj[key];
            if (typeof val == "string") {
                addWords(list, val);
            } else if (val instanceof Array) {
                val.forEach(function (v) {
                    collectWords(list, v)
                })
            } else {
                collectWords(list, val)
            }
        });
        return list;
    }

    db.coll.ensureIndex({_w:1});

    this.save = function (obj) {
        obj._w = collectWords([], obj);
        db.coll.save(obj);
    };

    this.fts = function (str) {
        return db.coll.find({
            _w:{
                $all:addWords([], str)
            }
        });
    };
}

var repo = new Repository();

repo.save({
    v1:"Simple object1"
});
repo.save({
    v1:"Simple object2"
});
repo.save({
    v1:"Simple object3"
});
repo.save({
    v1:"Simple object4"
});
repo.save({
    v1:"First string",
    v2:"Second string",
    v3:{
        v4:"String in nested object"
    }
});
repo.save({
    v1:"First string",
    v2:"Second string",
    v3:[
        {
            v4:"String in nested list item"
        }
    ]
});

print("Saved documents:");
db.coll.find().forEach(printjson);

print("Try to find 'Nested item'");
printjson(repo.fts("Nested item").explain());
print("Try to find 'Nested Object'");
printjson(repo.fts("Nested Object").explain());
print("Try to find 'String'");
printjson(repo.fts("String").explain());
print("Try to find 'Object3'");
printjson(repo.fts("Object3").explain());

db.dropDatabase();