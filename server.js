const express = require('express');
const { body, validationResult } = require('express-validator');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Contact Form API');
});

// Handle GET request for /api/contact (for testing)
app.get('/api/contact', (req, res) => {
    res.send('Use a POST request to submit the contact form.');
});

// Handle POST request for /api/contact
app.post('/api/contact', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('message').notEmpty().withMessage('Message is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;
    console.log('Form Submission:', { name, email, subject, message });

    res.status(200).json({ success: true, message: 'Form submitted successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
