const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile"); //application binary interface(ABI) and bytecode

const provider = new HDWalletProvider(
  "", //meta mask key
  "https://rinkeby.infura.io/v3/75998ad6032147e5929abdb5487683b3" //infura rinkeby address
);



const web3 = new Web3(provider); //web 3 provider

const deploy = async () => {
  const accounts = await web3.eth.getAccounts(); //get accounts from matamask

  console.log("deploy from this account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({ gas: "1000000", gasPrice: "5000000000", from: accounts[0] }); //deploye contract

  console.log("deployed address", result.options.address);
  console.log("interface", interface);
};

deploy();
