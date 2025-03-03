const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, 'db.json')
function getDatabase() {
  const rawData = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(rawData);
}

// Optional helper if you want to write data back to the file (for POST/PUT/DELETE)
function saveDatabase(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}


// enter CometChat Pro configurations here
const agentUID = 'booking-agent';

const chatUrl = 'https://271252330adce836.api-eu.cometchat.io/v3';

const headers = {
  'Content-Type': 'application/json',
  'apiKey': '0c4c9e3143feaa21b5e8704b344285de022e197d',
};

app.get('/api/create', (req, res) => {
    // data for new user
    const data = {
    // you can use your own logic to generate random UID and name
    // only uid has to be unique
      uid: new Date().getTime(),
      name: 'customer',
    };
    console.log('Headers:', headers)
    axios.post(`${chatUrl}/users`, JSON.stringify(data), {
        headers
      })
      .then(response => { 
        console.log(data.uid +" " +response.data.data)
      // user is created, fetch auth token
        requestAuthToken(response.data.data.uid)
          .then(token => {
            console.log('Success:' + JSON.stringify(token) + response.data);
            // token is returned to client
            res.json(token); 
          })
          .catch(error => console.error('Auth token Error:', error));
      })
      .catch(error => console.error('user create Error:', error.response.status, error.response.data));
});
app.get('/api/users', (req, res) => {
  axios.get(`${chatUrl}/users`, {headers})
      .then(response => {
      const { data } = response.data;
      const filterAgentData = data.filter(data => {
      // filter agent out from the list of users
          return data.uid !== agentUID;
      });
      res.json(filterAgentData);
      })
      .catch(error => console.error('Error:', error));
  });
  app.get('/api/auth', (req, res) => {
    console.log('Headers:', headers)
    const uid = req.query.uid;
    requestAuthToken(uid)
      .then(token => {
        console.log('Success:' + JSON.stringify(token));
        res.json(token);
      })
      .catch(error => console.error('auth Error:', error));
  });
// this function will fetch token
const requestAuthToken = uid => {
return new Promise((resolve, reject) => {
    axios.post(`${chatUrl}/users/${uid}/auth_tokens`, {}, {headers})
    .then(response => {
        console.log('New Auth Token:', response.data);
        resolve(response.data.data);
    })
    .catch(error => {
      reject(error);
      console.error('error', error.response.status, error.response.data )
    });
});
};

// General API stuff
app.get('/events', (req, res) => {
  const db = getDatabase();
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', db.events.length);
  res.json(db.events);
});

app.get('/users', (req, res) => {
  const db = getDatabase();
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', db.users.length);
  res.json(db.users);
});
app.get('/users/:id', (req, res) => {
  const db = getDatabase();
  const user = db.users.find(user => user.id === req.params.id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
});

app.get('/bookings', (req, res) => {
  const db = getDatabase();
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', db.bookings.length);
  res.json(db.bookings);
});
app.get('/bookings/:id', (req, res) => {
  const db = getDatabase();
  const booking = db.bookings.find(booking => booking.id === req.params.id);

    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
});
app.post('/events', (req, res) => {
  const db = getDatabase();
  const newEvent = req.body;

  db.events.push(newEvent);

  saveDatabase(db);
  res.status(201).json(newEvent);
});
app.get('/events/:id', (req, res) => {
  const db = getDatabase();
  const event = db.events.find(event => event.id === req.params.id);

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});