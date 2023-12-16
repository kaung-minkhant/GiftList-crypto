const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

// const serverUrl = 'http://localhost:1225';
const serverUrl = 'https://silver-guacamole-ggprpgq4pgrcw9g5-1225.app.github.dev'

async function main() {
  const merkleTree = new MerkleTree(niceList);
  const personName = "Sidney Kertzmann";
  const index = niceList.findIndex(n => n === personName);
  const proof = merkleTree.getProof(index)

  const {data: gift} = await axios.post(`${serverUrl}/gift`, {
    proof,
    leaf: personName,
  });
  

  console.log({ gift });
}

main();