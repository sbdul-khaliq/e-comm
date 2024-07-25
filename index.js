const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/user');
const app = express();

app.use(cors());  // Add this line to enable CORS
app.use(express.json());

app.post('/register', async (req, res) => {
    console.log('Request received:', req.body);  // Log the request body for debugging
    let user = new User(req.body);
    try {
        let result = await user.save();
        console.log('User saved:', result);  // Log the result to verify user is saved
        res.send(result);
    } catch (error) {
        console.error('Error saving user:', error);  // Log any errors encountered
        res.status(500).send('Error saving user');
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
