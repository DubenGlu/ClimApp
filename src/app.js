require("dotenv").config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const hbs = require("hbs");

const getWeather = require('./utils/weather');

const app = express();
app.use(morgan("dev"));

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {

    res.render("index", {
        title: "ClimApp",
        year: new Date().getFullYear()
    });

});

app.get("/weather", async (req, res) => {

    if (!req.query.city) {

        return res.status(400).json({
            error: "Please enter a city."
        });


    }

    const data = await getWeather(req.query.city);

    res.json(data);

});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});