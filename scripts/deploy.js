const hre = require('hardhat');

const { verify } = require('./utils');

async function main() {
  const BabyDolz = await hre.ethers.getContractFactory('BabyDolz');
  const babyDolz = await BabyDolz.deploy('BabyDolz', 'BBZ');
  await babyDolz.deployed();
  console.log('BabyDolz deployed to:', babyDolz.address);
  await verify('BabyDolz', babyDolz.address, ['BabyDolz', 'BBZ']);

  const DolzChef = await hre.ethers.getContractFactory('DolzChef');
  const dolzChef = await DolzChef.deploy(babyDolz.address);
  await dolzChef.deployed();
  console.log('DolzChef deployed to:', dolzChef.address);
  await verify('DolzChef', dolzChef.address, [babyDolz.address]);

  await babyDolz.setMinter(dolzChef.address, true);
  console.log('DolzChef set to BabyDolz minter');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
