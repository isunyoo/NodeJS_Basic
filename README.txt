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
$ npm install --save-dev @nomiclabs/hardhat-truffle4 @nomiclabs/hardhat-web3-legacy web3@^0.20.7
$ cat hardhat.config.js
require("@nomiclabs/hardhat-truffle4");
$ cat test/Box.test1.js
$ npx hardhat test

OpenZeppelin Test Helpers
$ npm install --save-dev @openzeppelin/test-helpers
$ cat test/Box.test2.js
$ cat truffle-config.js
compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
$ npx truffle test

OpenZeppelin Test Environment
$ npm install --save-dev @openzeppelin/test-environment
$ npm install --save-dev mocha chai
$ sudo npm install -g mocha
$ cat package.json 
"scripts": {
    "test": "mocha --exit --recursive"    
  }
$ cat test/Box.test3.js
$ npm test
$ truffle compile && mocha --exit --recursive


*** Connecting to public test networks ***
$ npx mnemonics
$ cat secrets.json 
{
  "mnemonic": "drama film snack motion ...",
  "projectId": "JPV2..."
}
$ cat secrets.json 
// hardhat.config.js
const { alchemyApiKey, mnemonic } = require('./secrets.json');
module.exports = {  
  networks: {
    rinkeby: {      
      url: `https://rinkeby.infura.io/v3/${projectId}`,     
      accounts: { mnemonic: mnemonic },
    },
  },
};

$ npx hardhat run --network rinkeby scripts/deploy.js
Deploying Box...
Box deployed to: 0xDb3c49Ab4500b2AD032Aa79C6e90De8B60b15Ccd
$ npx hardhat console --network rinkeby
> accounts = await ethers.provider.listAccounts()
> (await ethers.provider.getBalance(accounts[0])).toString()
> const Box = await ethers.getContractFactory('Box');
> const box = await Box.attach('0xDb3c49Ab4500b2AD032Aa79C6e90De8B60b15Ccd');
> await box.store(777);
> (await box.retrieve()).toString()


*** Upgrading smart contracts ***
Hardhat Upgrades plugin.
$ npm install --save-dev @openzeppelin/hardhat-upgrades
$ cat hardhat.config.js
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
$ cat scripts/deploy_upgradeable_box.js

$ npx hardhat node
$ npx hardhat run --network localhost scripts/deploy_upgradeable_box.js
Deploying Box...
Box deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
$ npx hardhat console --network localhost
> const Box = await ethers.getContractFactory('Box');
> const box = await Box.attach('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0');
> (await box.retrieve()).toString();

$ cat contracts/BoxV2.sol
$ cat scripts/upgrade_box.js
$ npx hardhat run --network localhost scripts/upgrade_box.js
$ npx hardhat console --network localhost
> const BoxV2 = await ethers.getContractFactory('BoxV2');
> const box = await BoxV2.attach('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0');
> (await box.retrieve()).toString();
> await box.increment();
> (await box.retrieve()).toString();

Limitations of contract upgrades with Initialization
$ npm install --save-dev @openzeppelin/hardhat-upgrades
$ cat contracts/AdminBox.sol
$ cat scripts/deploy_upgradeable_adminbox.js
const adminBox = await upgrades.deployProxy(AdminBox, ['0x~~~~~'], { initializer: 'initialize' });               
> accounts = await ethers.provider.listAccounts()
$ cat contracts/Box.sol
// We can safely add a new variable after the ones we had declared
address private _owner;


*** Mainnet ***
Hardhat Etherscan plugin
$ npm install --save-dev @nomiclabs/hardhat-etherscan
$ cat hardhat.config.js
const { projectId, mnemonic, etherscanApiKey } = require('./secrets.json');
require("@nomiclabs/hardhat-etherscan");
module.exports = {
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${projectId}`,      
      accounts: { mnemonic: mnemonic },
    },   
  },
  etherscan: {
    apiKey: etherscanApiKey
  }
};

$ npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "Constructor_argument_1"