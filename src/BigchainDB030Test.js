import React, { Component } from 'react';
import Button from 'material-ui/Button';

const config = require('./config.json')
// console.log(config)

class BigchainDB030Test extends Component {
    handleLetsGo = () => {
        // const message = "Yes sir!";
        // console.log(message);
        // alert(message);

        // https://github.com/bigchaindb/js-bigchaindb-driver
        const driver = require('bigchaindb-driver')
        // console.log(driver)

        // https://www.bigchaindb.com/developers/getstarted/
        const alice = new driver.Ed25519Keypair()
        const conn = new driver.Connection(config.apiRootEndpoint, { 
            app_id: config.app_id,
            app_key: config.app_key
        })

        // https://testnet.bigchaindb.com/docs
        const tx = driver.Transaction.makeCreateTransaction(
            { message: 'This is a blockchain030 message' },
            null,
            [ driver.Transaction.makeOutput(
                driver.Transaction.makeEd25519Condition(alice.publicKey))],
            alice.publicKey)
        const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)
        // console.log(txSigned)
        const x = conn.postTransactionSync(txSigned)
        console.log(x)
    } // end of handleLetsGo

    render() {
        return (
            <Button variant="raised" onClick={this.handleLetsGo}>Let's go!</Button>
        )
    }
}

export default BigchainDB030Test;
