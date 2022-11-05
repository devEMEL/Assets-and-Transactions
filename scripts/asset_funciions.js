
const algosdk = require("algosdk");
const algodClient = new algosdk.Algodv2(process.env.ALGOD_TOKEN, process.env.ALGOD_SERVER, process.env.ALGOD_PORT);

const creator = algosdk.mnemonicToSecretKey(process.env.MNEMONIC_CREATOR);

const { addr: freezeAddr } = creator;
const { addr: managerAddr } = creator;
const { addr: clawbackAddr } = creator;
const { addr: reserveAddr } = creator;

const { addr: newClawbackAddr } = algosdk.mnemonicToSecretKey(process.env.ACC1_MNEMONIC);


const submitToNetwork = async (signedTxn) => {

    // Send transaction
    const tx = await algodClient.sendRawTransaction(signedTxn).do();
    console.log(`Transaction: ${tx.txId}`);
    
    // Wait for transaction to be confirmed
    confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4)

    // Get the completed transaction
    console.log(`Transaction: ${tx.txId} confirmed in round ${confirmedTxn["confirmed-round"]}`);
    

    return confirmedTxn;
}

const fundAccount = async (receiver, amount) => {

    const  suggestedParams = await algodClient.getTransactionParams().do();
    const txn = algosdk.makePaymentTxnWithSuggestedParams(
        creator.addr,
        receiver.addr,
        amount,
        undefined,
        undefined,
        suggestedParams
    );

}