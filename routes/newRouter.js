const { Router } = require("express");
const { messages } = require("./indexRouter");
const newRouter = Router();
const { links } = require("./indexRouter");
const { format } = require("date-fns");
const db = require("../db/queries");

newRouter.get("/", (req,res) => {
    res.render("form", {links: links});
});

newRouter.post("/", (req, res, next) => {
    let messageText = req.body.message;
    let messageUser = req.body.name;

    if (!messageText || !messageUser) {
        const error = new Error("Both message and name are required");
        error.status = 400; // Bad request
        return next(error);
    }

    // messages.push({ text: messageText, user: messageUser, added: format(new Date(),"EEEE, MMMM do, yyyy h:mm a")});
    db.addMessage(messageUser, messageText);
    res.redirect("/");
});

module.exports = newRouter;