'use strict';
const express = require('express');
const path = require('path');
const db = require('./../database/db');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const createToken = require('./util/createToken');
const verifyToken = require('./util/verifyToken');
const redis = require('redis');
const moment = require('moment');

const expireIn = moment().unix() + 5*60
const client = redis.createClient();

/*
  Access the db file in the database directory to alter Sequelize code
  Quick Reference:
  -------------------------------------------
  (route) ----> (intended return)
  GET
  /rooms/:name/reservations/today ----> A named room's reservations for the current day
  /rooms/:name/reservations/tomorrow ----> A named room's reservations for tomorrow's date
  /rooms/:name/:date ----> A named room's reservations for a given date
  /rooms/:name/:date/:startTime ----> A reservation that matches the given room name, date, and startTime
  /rooms/:name/reservations ----> All reservations from a single named room
  /rooms ----> All rooms currently saved
  /rooms/:name ----> A named room

  POST
  /room ----> Creates a room under valid conditions and returns the instance
  /reservation ----> Creates a reservation under valid conditions and returns the instance
  /user/create ----> Creates a user under valid conditions and returns the instance
  /user/validate ----> Responds true or false conditioned on a user's credentials
*/


app.use(cors());
app.use(express.static(path.join(__dirname, './../public')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/rooms/:name/reservations/today', (req, res) =>{
    db.getReservationsToday(req.params.name)
      .then((rsvps) =>{
        res.json(rsvps);
      });
});

app.get('/rooms/:name/reservations/tomorrow', (req, res) =>{
  db.getReservationsTomorrow(req.params.name)
    .then((rsvps) =>{
      res.json(rsvps);
    });
});

//The date is parsed here to a correct format, minutes and seconds are set to 0
app.get('/rooms/:name/:date/:startTime', (req, res) =>{
  let date = req.params.date.split('-');
  let startTime = new Date('');

  //MM-DD-YYYY to YYYY-MM-DD
  startTime.setMonth(date[0] - 1);
  startTime.setDate(date[1]);
  startTime.setYear(date[2]);
  startTime.setUTCHours(req.params.startTime);

  db.getReservationByNameDateTime({name: req.params.name, startTime: startTime})
    .then((room) =>{
      if(room === null){
         res.json('false');
      }else{
        res.json({'room': room});
      }
      return;
    });
});

app.get('/rooms/:name/:date', (req, res) =>{
  db.getReservationsByDate({name: req.params.name, date: req.params.date})
    .then((rooms) =>{
      res.json(rooms);
    });
});

app.get('/rooms/:name/reservations', (req, res) =>{

  db.getRoomReservations(req.params.name)
    .then((rsvps) =>{
      res.json(rsvps);
    });
});

app.get('/rooms', (req, res) =>{
  db.getRooms().then((rooms) =>{
    res.json(rooms);
  });
});

app.get('/rooms/:name', (req, res) =>{
  db.getRoomByName().then((room) =>{
    res.json(room);
  });
});

app.post('/user/create', (req, res) =>{
  db.createUser(req.body)
    .then((user) =>{
      res.json(user);
    });
});

app.post('/user/validate', (req, res) =>{
  db.validateUser(req.body)
    .then((user) =>{
      //res.json(user);
      if (user) {
        const token = createToken(req.body.password);

        client.set(req.body.username, token, (err, reply) => {
          if (err) {
            res.status(500).send();
          }
          if (reply) {
            client.expireat(req.body.username,expireIn);
            res.status(200).json({ token: token });
          } else {
            res.status(500).send();
          }
        });
      }
    });
});

app.post('/refresh_session', (req, res) => {
  const token = req.body.token; // check if getting correct data

  if (token) {
    verifyToken(token).then((result) => { 
      console.log('Verified Token:', result); 
      client.get(result, (err, reply) => {
        // Below if statement is checking if the token sent in the request
        // is equal to the token retrieved from redis after using the 
        // result of verifyToken to get the 'reply' (token) in redis.
        // if they are equal cool, if not, then server error because...
        if (token === reply) {
          client.expireat(result, expireIn);
          res.status(200).end('Session refreshed!');
        } else {
          res.status(500).end();
        }
      });
    })
    .catch((err) => {
      res.status(401).send(err);
    });
  }
});

app.post('/room', (req,res)=>{
  db.createRoom(req.body).then((room) =>{
    res.json(room);
  });
});

app.post('/reservation', (req,res)=>{
  db.addReservation(req.body).then((rsvp) =>{
    res.json(rsvp);
  });
});

app.post('/logout', (req, res) => {
  console.log("KEY username to be deleted from redis when logging out and deleting session");
  client.del(req.body.username);
  res.status(200).send("Logged out successfully!");
});

app.listen(8080, function () {
   console.log("...listening on port 8080");
});
