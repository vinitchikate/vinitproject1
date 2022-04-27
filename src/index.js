const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const route = require("./routes/route");

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://amitvish:4nai6CZgrFtr5B7R@cluster0.3bgsk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true
}).then(() => console.log("MongoDB Is Connected")).catch(err => console.log(err));

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express App Running On Port ' + (process.env.PORT || 3000))
});