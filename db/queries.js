const pool = require("./pool");

async function getAllMessages() {
    const { rows} = await pool.query("SELECT * FROM messages");
    return rows;
}

async function getMessage(index) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [index]);
    return rows[0];
}

async function addMessage(username, message) {
    const { rows } = await pool.query("INSERT INTO messages (username, message) VALUES ($1, $2) RETURNING *", [username, message]);
    // return rows[0];
}

module.exports = {
    getAllMessages, 
    getMessage,
    addMessage,
};
