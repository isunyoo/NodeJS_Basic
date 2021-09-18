// scripts/index.js
async function main () {    
    // Retrieve accounts from the local node
    const accounts = await ethers.provider.listAccounts();    
    console.log(accounts);

    // Set up an ethers contract, representing our deployed Box instance
    const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const Box = await ethers.getContractFactory('Box');
    const box = await Box.attach(address);

    // Call the retrieve() function of the deployed Box contract
    const value1 = await box.retrieve();    
    console.log('Box value is', value1.toString());

    // Send a transaction to store() a new value in the Box
    await box.store(888);

    // Call the retrieve() function of the deployed Box contract
    const value2 = await box.retrieve();
    console.log('Box value is', value2.toString());    
  }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});