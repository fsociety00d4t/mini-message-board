const { Router } = require("express");
const { format } = require("date-fns");
const db = require("../db/queries");

const indexRouter = Router();

let messages;
async function getMessages(req,res) {
    const messages = await db.getAllMessages();
    return messages;
}

const links = [
    { href: "/", text: "View Messages"},
    { href: "/new", text: "Add A new Message"}
]


indexRouter.get("/", async (req, res) => {
    try {
        messages = await getMessages(req, res);
        const messagesPerPage = 5;
        const page = parseInt(req.query.page) || 1;
        const startIndex = (page - 1) * messagesPerPage;
        const endIndex = startIndex + messagesPerPage;

        const paginatedMessages = messages.slice(startIndex, endIndex);
        const totalPages = Math.ceil(messages.length / messagesPerPage);

        res.render("index", { messages: paginatedMessages, links: links, totalPages: totalPages, currentPage: page });
    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = {
    indexRouter,
    messages,
    links,
};
