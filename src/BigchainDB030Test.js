import React, { Component } from 'react';
import Button from 'material-ui/Button';




class BigchainDB030Test extends Component {
    handleLetsGo = () => {
        // const message = "Yes sir!";
        // console.log(message);
        // alert(message);

        // https://github.com/bigchaindb/js-bigchaindb-driver
        const driver = require('bigchaindb-driver')
        console.log(driver)

        // https://www.bigchaindb.com/developers/getstarted/
        const alice = new driver.Ed25519Keypair()
        const conn = new driver.Connection('https://test.bigchaindb.com/api/v1/', { 
            app_id: 'Get credentials from testnet.bigchaindb.com',
            app_key: 'by signing up and going to your Applications screen'
        })
        const tx = driver.Transaction.makeCreateTransaction(
            { message: '' },
            null,
            [ driver.Transaction.makeOutput(
                driver.Transaction.makeEd25519Condition(alice.publicKey))],
            alice.publicKey)
        const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)
        conn.postTransactionSync(txSigned)

    } // end of handleLetsGo

    render() {
        return (
            <Button variant="raised" onClick={this.handleLetsGo}>Let's go!</Button>
        )
    }
}

export default BigchainDB030Test;
