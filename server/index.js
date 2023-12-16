const express = require('express');
const verifyProof = require('../utils/verifyProof');
const cors = require('cors')
const port = 1225;

const app = express();
app.use(cors())
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';
app.get('/', (req, res) => {
  res.status(200).send('you ping, i pong');
})
app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const {proof, leaf} = body
  const isInTheList = verifyProof(proof, leaf, MERKLE_ROOT);;
  
  if(isInTheList) {
    return res.status(200).send("You got a toy robot!");
  }
  else {
    return res.status(200).send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
