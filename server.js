const express = require('express');
const { body, validationResult } = require('express-validator');
const cors = require('cors');

const app = express();
const PORT = 5000;

// This array will temporarily store submitted data
let contactSubmissions = [];

app.use(express.json()); // Middleware to parse JSON request body
app.use(cors()); // Allow cross-origin requests

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Contact Form API');
});

// Handle GET request for /api/contact to show all submitted data
app.get('/api/contact', (req, res) => {
    res.json(contactSubmissions); // Return all contact submissions
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

    // Store the submitted data in the contactSubmissions array
    contactSubmissions.push({ name, email, subject, message });

    console.log('Form Submission:', { name, email, subject, message });

    res.status(200).json({ success: true, message: 'Form submitted successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
