const { Router, text } = require("express");
const messageRouter = Router();
// const { messages } = require("./indexRouter");
const { links } = require("./indexRouter");
const db = require("../db/queries");

async function getMessage(index) {
  const message = await db.getMessage(index);
  return message;
}

messageRouter.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10)+1;

    if (isNaN(id)) {
      const error = new Error("Invalid message ID");
      error.status = 400;
      return next(error); 
    }

    const message = await getMessage(id);

    if (!message) {
      const error = new Error("Message not found");
      error.status = 404;
      return next(error); 
    }
    res.render("message", { text: message.message, user: message.username, added: message.created_at, links: links });
  } catch (err) {
    console.error("Error fetching message:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = messageRouter;