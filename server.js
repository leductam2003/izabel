const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://leductam2003:011103Tam@cluster0.xerfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Chat schema
const chatSchema = new mongoose.Schema({
    user: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', chatSchema);

// API endpoints
app.get('/api/messages', async (req, res) => {
    const messages = await Chat.find().sort({ timestamp: 1 });
    res.json(messages);
});
app.get('/api/test', async (req, res) => {
    res.json({result: "Working"});
});

app.post('/api/messages', async (req, res) => {
    const newMessage = new Chat(req.body);
    await newMessage.save();
    res.json(newMessage);
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve static files from the assets directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Catch-all route to serve the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
