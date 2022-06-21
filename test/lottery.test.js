const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider()); //provider is allows to us to connect to any given network

const { interface, bytecode } = require("../compile"); //we are requring and object with interface and bytecode property

let lottery;
let accounts;

beforeEach(async () => {
  // beforeEach works before running each test
  accounts = await web3.eth.getAccounts(); //get all accounts from local ganache

  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});
describe("lottery contract", () => {
  it("deploye a contract", () => {
    assert.ok(lottery.options.address);
    console.log("address", lottery.options.address);
  });
  it("allow one account to enter", async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utilsweb3.toWei(0.2, "ether"),
    });
    const players = lottery.methods.getPlayers().call({
      from: accounts[0],
    });
    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  });

  it("required minium amount of ether", async () => {
    try {
      await lottery.methods.enter().call({
        from: accounts[0],
        value: 2,
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });
});
