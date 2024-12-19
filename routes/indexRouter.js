const { Router } = require("express");
const { format } = require("date-fns");

const indexRouter = Router();

const messages = [
    { text: " Bonsoir, Elliot", user: "Tyrell Wellick", added: format(new Date(), "EEEE, MMMM do, yyyy h:mm a")},
    { text: "I am the one who KNOCKS", user: "Walter White", added: format(new Date(), "EEEE, MMMM do, yyyy h:mm a") }
];

const links = [
    { href: "/", text: "View Messages"},
    { href: "/new", text: "Add A new Message"}
]

indexRouter.get("/", (req, res) => {
    const messagesPerPage =5;
    const page = parseInt(req.query.page)||1;
    const startIndex = (page-1) * messagesPerPage;
    const endIndex = startIndex + messagesPerPage;

    const paginatedMessages = messages.slice(startIndex, endIndex);
    const totalPages = Math.ceil(messages.length/messagesPerPage);

    res.render("index", { messages: paginatedMessages, links: links, totalPages: totalPages, currentPage: page});
    
});

module.exports = {
    indexRouter,
    messages,
    links,
};
