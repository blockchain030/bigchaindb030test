import React, { Component } from 'react';
import Button from 'material-ui/Button';

const config = require('./config.json')
// console.log(config)

const driver = require('bigchaindb-driver') // https://github.com/bigchaindb/js-bigchaindb-driver

const blockchain030Protocol1 = 'blockchain030Protocol1'


// https://www.bigchaindb.com/developers/getstarted/
const alice = new driver.Ed25519Keypair()
const conn = new driver.Connection(config.apiRootEndpoint, { 
  app_id: config.app_id,
  app_key: config.app_key
})

// https://testnet.bigchaindb.com/docs
const tx = driver.Transaction.makeCreateTransaction(
  { 'def:type': blockchain030Protocol1,
    message: 'This is a blockchain030 message' }, // asset
  null, // meta data
  [ driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(alice.publicKey))], // output, spend it to ourself. // https://www.youtube.com/watch?v=zYa-GGNwxXo
  alice.publicKey) // input publicKey


class BigchainDB030Test extends Component {
  handlePostTransaction = () => {
    const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)
    conn.postTransactionSync(txSigned).then(tx => {
      console.log(tx.id)
      // alert(tx.id)
    })
  } // end of handlePostTransaction

  handleSearchTransactions = () => {
    conn.searchAssets(blockchain030Protocol1).then(assets => {
      const s = JSON.stringify(assets, null, 2)
      console.log(s)
      // alert(s)
    })
  } // end of handleSearchTransactions

  render() {
    return (
      <span>
        <Button variant="raised" onClick={this.handlePostTransaction}>Post transaction</Button>
        <br /><br />
        <Button variant="raised" onClick={this.handleSearchTransactions}>Search transactions</Button>
      </span>
    )
  } // end of render
} // end of class BigchainDB030Test

export default BigchainDB030Test;
