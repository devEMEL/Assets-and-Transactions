
const algosdk = require("algosdk");
const algodClient = new algosdk.Algodv2(process.env.ALGOD_TOKEN, process.env.ALGOD_SERVER, process.env.ALGOD_PORT);

const creator = algosdk.mnemonicToSecretKey(process.env.MNEMONIC_CREATOR);

const { addr: freezeAddr } = creator;
const { addr: managerAddr } = creator;
const { addr: clawbackAddr } = creator;
const { addr: reserveAddr } = creator;

