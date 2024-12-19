const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname,"public");
const newRouter = require("./routes/newRouter");
const messageRouter = require("./routes/messageRouter");
const {indexRouter} = require("./routes/indexRouter");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use("/new", newRouter);
app.use("/message", messageRouter);
app.use("/", indexRouter);

app.use((req, res, next) => {
    const error = new Error("Page not found");
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).render("error", {
        message: err.message || "Internal Server Error"
    });
});


const PORT = 3000;
app.listen(PORT, () =>{
    console.log("Mini message board");
});


// module.exports = { links };

