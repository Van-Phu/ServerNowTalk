const express = require("express");
const Message = require('../Model/modelMessage');
const app = express();
const http = require('http');
const socketIo = require('socket.io');

app.get("/getMessages", async (req, res) => {
    try {
      const messages = await Message.find();
      res.json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Error fetching messages' });
    }
  }); 
app.post("/postMessages", async (req, res) => {
    try {
      const { user, content } = req.body;
      const newMessage = new Message({ user, content });
      await newMessage.save();
      io.emit('chat message', newMessage);
  
      res.status(201).json({ success: true });
    } catch (error) {
      console.error('Error posting message:', error);
      res.status(500).json({ error: 'Error posting message' });
    }
  });  
  module.exports = app;

