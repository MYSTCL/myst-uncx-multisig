const { ethers } = require(`hardhat`)
const { print, getChainId } = require("../../shared/utilities")

const contracts = require('../../../constants/contracts')
const fs = require('fs')
const path = require('path')
const contractsPath = path.join(__dirname, '../../../constants/contracts.js')

const deployMultisig = async () => {
    const chainId = await getChainId()

    print(`Deploy Multisig`)

    const provider = ethers.provider;
    const feeData = await provider.getFeeData();

    const ContractFactory = await ethers.getContractFactory('Add Contract Name')
    const contract = await ContractFactory.deploy(
        {
            maxFeePerGas: feeData.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
        }
    )     
    await contract.deployTransaction.wait()
    print(`Multisig deployed to ${contract.address}`)

    // Storage

    contracts.multisig[chainId] = contract.address
    
    const formattedContracts = `module.exports = ${JSON.stringify(contracts, null, 2)
        .replace(/"([^"]+)":/g, '$1:')
        .replace(/"/g, "'")}`
    fs.writeFileSync(contractsPath, formattedContracts)

}

module.exports = { deployMultisig } 
