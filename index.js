const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  let { script, language, stdin } = req.body;
  let program = {
    script,
    language,
    stdin,
    versionIndex: '2',
    clientId: 'cf4c0271c233d2c0054bc2cbfda4c862',
    clientSecret:
      '2f833880fe11fbf11552243c97065ca567e9a64018544505aaead61d45b0697f'
  };
  request(
    {
      url: 'https://api.jdoodle.com/v1/execute',
      method: 'POST',
      json: program
    },
    function(error, response, body) {
      if (!error) {
        res.send(response).status(200);
      } else {
        res.send(error).status(404);
      }
    }
  );
});

app.listen(8000);
