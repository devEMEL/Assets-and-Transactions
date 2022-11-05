
// ## ACCOUNTS USING mnemonic ##
const { mkAccounts } = require("@algo-builder/algob");
let accounts = mkAccounts([
  {
    // This account is created using `make setup-master-account` command from our
    // `/infrastructure` directory. It already has many ALGOs
    name: "master",
    addr: "N4Z7NBMODQGA6M62MBBHSJT2ZX4MBFR45ZZ45LAEBYXGJ2UTOOSPREXU4E",
    mnemonic:
    "erode typical couple maid must luxury tragic grape flee issue limit damage emotion dice soup quiz clay gate paddle return rifle chimney account ability invest"
  },
]);



let defaultCfg = {
  host: "http://localhost",
  port: 4001,
  token: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  accounts: accounts,
  
};


module.exports = {
  networks: {
    default: defaultCfg,
  },
};
