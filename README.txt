https://docs.openzeppelin.com/learn/setting-up-a-node-project

$ node --version
v12.21.0
$ npm init -y
$ truffle init
$ npm install --save-dev hardhat
$ npm install --save-dev @openzeppelin/contracts
$ npx hardhat
$ cat hardhat.config.js
module.exports = {
  solidity: "0.8.4",
};
$ npx hardhat compile
$ npx hardhat node
http://127.0.0.1:8545/


$ npm install --save-dev @nomiclabs/hardhat-ethers ethers
$ cat hardhat.config.js
// hardhat.config.js
require('@nomiclabs/hardhat-ethers');

$ npx hardhat run --network localhost scripts/deploy.js
Compiling 4 files with 0.8.4
Compilation finished successfully
Deploying Box...
Box deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3


$ npx hardhat console --network localhost
> const Box = await ethers.getContractFactory('Box');
> const box = await Box.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3')
> await box.store(777)
> await box.retrieve()
BigNumber { _hex: '0x0309', _isBigNumber: true }
> (await box.retrieve()).toString()
'777'


$ cat scripts/index.js
// scripts/index.js
async function main () {    
    // Retrieve accounts from the local node
    const accounts = await ethers.provider.listAccounts();
    console.log(accounts);
  }
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
$ npx hardhat run --network localhost ./scripts/index.js


*** Setup unit tests ***
$ npm install --save-dev chai
$ cat test/Box.test1.js
$ npx hardhat test

OpenZeppelin Test Helpers
$ npm install --save-dev @openzeppelin/test-helpers
$ cat test/Box.test2.js
$ npx truffle test
$ npm upgrade solc@0.8.0

https://docs.openzeppelin.com/learn/writing-automated-tests