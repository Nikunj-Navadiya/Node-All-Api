const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/ALL-API");

const db = mongoose.connection;

db.on("connected", (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`db is running`);

})

module.exports = db;