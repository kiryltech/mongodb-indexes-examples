function Repository() {
    var constraints = [
        {
            match: function (obj) { return obj.t == "t1"},
            value: function (obj) { return "t1$" + obj.v1.toLowerCase() }
        },
        {
            match: function (obj) { return obj.t == "t2"},
            value: function (obj) { return "t2$" + obj.v1 }
        }
    ];

    function getUniqueTokens(obj) {
        var tokens = [];
        constraints.forEach(function (constraint) {
            if (constraint.match(obj)) {
                tokens[tokens.length] = constraint.value(obj);
            }
        });
        return tokens;
    }

    db.coll.ensureIndex({_u:1}, {sparse:true, unique:true});

    this.save = function (obj) {
        var tokens = getUniqueTokens(obj);
        if (tokens.length != 0) {
            obj._u = tokens;
        }
        db.coll.save(obj);
        var err = db.getLastError();
        if (err == null) {
            print("Record: " + tojsononeline(obj) + " saved successfully.");
        } else {
            print("Record: " + tojsononeline(obj) + " was rejected.")
        }
    };
}

var repo = new Repository();

repo.save({t: "t1", v1: "tag"});
repo.save({t: "t1", v1: "tag2"});
repo.save({t: "t1", v1: "tAg"});

repo.save({t: "t2", v1: "tAg"});
repo.save({t: "t2", v1: "tag"});
repo.save({t: "t2", v1: "Tag"});
repo.save({t: "t2", v1: "tag"});

repo.save({t: "t3", v1: "tag"});
repo.save({t: "t3", v1: "tag"});

db.dropDatabase();