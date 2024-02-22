/*
 * @dev Deployment script for Multisig contract.
 *
 * Run from project root using:
 *     npx hardhat run scripts/deploy/multisig.js --network frame
 */

const { ethers } = require(`hardhat`)
const { deployMultisig } = require("./deployers/deployers")

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:1248");
    const [deployer] = await ethers.getSigners()
    await provider.send('wallet_switchEthereumChain', [{ chainId: '0x14a34' }]) // base: 0x2105, base sepolia: 0x14a33
    console.log(`Deployer address: ${deployer.address}`)
    await deployMultisig(deployer)
    console.log('Deployment completed.')
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
