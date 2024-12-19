const { Router, text } = require("express");
const messageRouter = Router();
const { messages } = require("./indexRouter");
const { links } = require("./indexRouter");

messageRouter.get("/:index", (req, res, next) => {
  let index = parseInt(req.params.index, 10);

  if (isNaN(index) || index < 0 || index >= messages.length) {
   const error = new Error("Message not found");
   error.status = 404;
   return next(error); // Pass the error to the error handling middleware
}

  let  text = messages[index].text;
  let  user = messages[index].user;
  let  added = messages[index].added;

   res.render("message", {text: text, user: user, added: added, links: links});
});

module.exports = messageRouter;