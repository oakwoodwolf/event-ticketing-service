const express = require('express');
const axios = require('axios');
const app = express();

// enter CometChat Pro configurations here
const appID = '271252330adce836';
const theKey = '0c4c9e3143feaa21b5e8704b344285de022e197d';
const agentUID = 'booking-agent';

const url = 'https://271252330adce836.api-eu.cometchat.io/v3';

const headers = {
  'Content-Type': 'application/json',
  apiKey: theKey,
};

app.get('/api/create', (req, res) => {
    // data for new user
    const data = {
    // you can use your own logic to generate random UID and name
    // only uid has to be unique
      uid: new Date().getTime(),
      name: 'customer',
    };
    axios
      .post(`${url}/users`, JSON.stringify(data), {
        headers,
      })
      .then(response => { 
      // user is created, fetch auth token
        requestAuthToken(response.data.data.uid)
          .then(token => {
            console.log('Success:' + JSON.stringify(token));
            // token is returned to client
            res.json(token); 
          })
          .catch(error => console.error('Error:', error));
      })
      .catch(error => console.error('Error:', error));
});
app.get('/api/users', (req, res) => {
  axios
      .get(`${url}/users`, {
      headers,
      })
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
    const uid = req.query.uid;
    requestAuthToken(uid)
      .then(token => {
        console.log('Success:' + JSON.stringify(token));
        res.json(token);
      })
      .catch(error => console.error('Error:', error));
  });
// this function will fetch token
const requestAuthToken = uid => {
return new Promise((resolve, reject) => {
    axios
    .post(`${url}/users/${uid}/auth_tokens`, null, {
        headers,
    })
    .then(response => {
        console.log('New Auth Token:', response.data);
        resolve(response.data.data);
    })
    .catch(error => reject(error));
});
};



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});