const path = require("path");
const fs = require("fs");
const solc = require("solc");

const lotteryPath = path.resolve(__dirname, "contracts", "lottery.sol"); //contract path
const source = fs.readFileSync(lotteryPath, "utf8"); //read contract

module.exports = solc.compile(source, 1).contracts[":Lottery"]; //bytecode --> this is compiled contract
