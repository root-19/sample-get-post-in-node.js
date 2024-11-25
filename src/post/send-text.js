const database = require('../../database/database');


const sendText = (req, res) => {
    const { textContent } = req.body;

    if (!textContent || textContent.trim() === '') {
        return res.status(400).send({ error: 'Text content is required' });
    }

    const query = 'INSERT INTO text_table (content, created_at) VALUES (?, NOW())';
    db.query(query, [textContent], (err, results) => {
        if (err) {
            console.error('Error inserting text into the database:', err);
            return res.status(500).send({ error: 'Failed to save text to the database' });
        }

        res.send({ message: 'Text saved successfully!', id: results.insertId });
    });
};

const fetchText = (req, res) => {
    const query = 'SELECT id, content, created_at FROM text_table ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching texts:', err);
            return res.status(500).send({ error: 'Failed to fetch texts from the database' });
        }

        res.send({ texts: results });
    });
};

module.exports = { sendText, fetchText };