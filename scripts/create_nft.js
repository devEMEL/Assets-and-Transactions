
const algosdk = require("algosdk");
const algodClient = new algosdk.Algodv2(process.env.ALGOD_TOKEN, process.env.ALGOD_SERVER, process.env.ALGOD_PORT);
const creator = algosdk.mnemonicToSecretKey(process.env.MNEMONIC_CREATOR);

const submitToNetwork = async (signedTxn) => {

    // Send transaction
    const tx = await algodClient.sendRawTransaction(signedTxn).do();
    console.log(`Transaction: ${tx.txId}`);
    
    // Wait for transaction to be confirmed
    confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4)

    // Get the completed transaction
    console.log(`Transaction: ${tx.txId} confirmed in round ${confirmedTxn["confirmed-round"]}`); 

    return confirmedTxn;
};

const createNFT = async () => {

    const from = creator.addr;
    const defaultFrozen = false;
    const unitName = "AFNFT";
    const assetName = "Algo Foundry NFT";
    const assetURL = "https://path/to/my/nft/asset/metadata.json";
    const manager = creator.addr;
    const reserve = undefined;
    const freeze = undefined;
    const clawback = undefined;
    const total = 1;
    const decimals = 0;

    const suggestedParams = await algodClient.getTransactionParams().do();

    // Create the asset creation transaction

    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from,
        defaultFrozen,
        unitName,
        assetName,
        assetURL,
        manager,
        reserve,
        freeze,
        clawback,
        total,
        decimals,
        suggestedParams
    });

    const signedTxn = txn.signTxn(creator.sk);
    const confirmedTxn = await submitToNetwork(signedTxn);

    return confirmedTxn["asset-index"];
}

const getCreatedAsset = async (account, assetId) => {
    let accountInfo = await algodClient.accountInformation(account.addr).do();
    const asset = accountInfo["created-assets"].find((asset) => {
        return asset["index"] === assetId;
    });
    return asset;
};

(async () => {
    console.log("Creating NFT...");
    const assetId = await createNFT().catch(console.error);
    const asset = await getCreatedAsset(creator, assetId);
    console.log("NFT CREATED");
    console.log(asset);
})();
