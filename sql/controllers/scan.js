const express = require ('express');
const mysql = require ('mysql');
const http = require('http');
const socketIo = require('socket.io');



const app = express ();

app.use(express.json());


const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})

exports.sendMessage = (req , res) => {

  // io.on('connection', (socket) => {
  //   console.log('Nouvelle connexion WebSocket établie:', socket.id);
  // })
  const message = req.body.message;
  console.log('Reçu message',message)

   if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

  // Émettre un événement à tous les clients
  io.emit('chat message', message);
  // res.status(200).send(
    //   message='Message envoyé à tous les clients');
    res.json({
      status: 200,
      message: 'Message envoyé à tous les clients',
    });

}

