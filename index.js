var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

const app = express();
app.use(bodyparser.json());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended: true
}));

// MongoDB connection
mongoose.connect('mongodb+srv://dsarituraj:FullStack@cluster0.lhzoi.mongodb.net/MoneyTracker?retryWrites=true&w=majority');

var db = mongoose.connection;
db.on('error', () => console.log("Error connecting to database"));
db.once('open', () => console.log("Connected to Database"));

// Route for adding data
app.post("/add", (req, res) => {
    var category_select = req.body.category_select;
    var amount_input = req.body.amount_input;
    var info = req.body.info;
    var date_input = req.body.date_input;

    var data = {
        "Category": category_select,
        "Amount": amount_input,
        "Info": info,
        "Date": date_input
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).send("Error inserting record");
        }
        console.log("Record Inserted Successfully");
        return res.status(200).send("Record Inserted Successfully");
    });
});

// Route for the home page
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('/index.html');
});

// Listen on a different port (5001)
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
