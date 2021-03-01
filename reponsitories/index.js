const mongodb = require("mongodb");

const db = {};

const client = new mongodb.MongoClient("mongodb+srv://admin:1@cluster0.xmufk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
client.connect().then((connectedClient) => {
    console.log("mongodb connected!");
    const database = connectedClient.db("Xfuri");
    db.users = database.collection("users");
});

module.exports = db;