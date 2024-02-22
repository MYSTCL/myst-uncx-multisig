// Export functions used by scripts

const { ethers, network } = require("hardhat")

const verbose = true;

const overrides = {
    gasLimit: 9999999
}

// Print the given string if verbose is true and do nothing otherwise
const print = (str) => {
    if (verbose) console.log(str)
}

// Return the contract from address with wallet connected
const loadContract = async (address, wallet) => {
    const name = await getContractName(address)
    print(`load contract ${name} from ${address}`)
    const contractFactory = await ethers.getContractFactory(name)
    const contract = contractFactory.attach(address).connect(wallet)
    return contract
}


const loadContractNoVerbose = async (address) => {
    const [wallet] = await ethers.getSigners()
    const name = await getContractName(address)
    const contractFactory = await ethers.getContractFactory(name)
    const contract = contractFactory.attach(address).connect(wallet)
    return contract
}

// Return the encoded function data for calling the function with arguments
const getEncodedFunctionData = (contract, functionName, arguments) => {
    let contractName = isAddress(contract) ? getContractName(contract) : contract
    let contractFolder = getContractEnclosingFolder(contractName)
    const stringArgs = getCommaSeparatedString(arguments)
    print(`get the encoded function data to call ${contractName}.${functionName}(${stringArgs})`)

    const contractJson = require(
        `../../artifacts/contracts/${contractFolder}/${contractName}.sol/${contractName}.json`
    )
    const contractAbi = contractJson.abi
    const contractInterface = new ethers.utils.Interface(contractAbi)

    return contractInterface.encodeFunctionData(functionName, arguments)
}

// Return the current chainId
const getChainId = async () => {
    let chainId = network.config.chainId

    // Get the chainId from the provider if it can't be accessed directly
    if (chainId === undefined) {
        const url = network.config.url
        const provider = new ethers.providers.JsonRpcProvider(url)
        chainId = (await provider.getNetwork()).chainId
    }

    return chainId
}

// Return the current rpcUrl
const getRpcUrl = async () => {
    return network.config.url
}

// Return true if the string is an address and false otherwise
const isAddress = (str) => {
    if (str.length != 42) {
        return false
    }
    if (str.slice(0, 2) != "0x") {
        return false
    }
    return true
}

// Return the array as a comma separated string
const getCommaSeparatedString = (array) => {
    str = ""
    for (let i = 0; i < array.length; i++) {
        if (i > 0) {
            str += ", "
        }
        str += array[i]
    }
    return str
}

module.exports = {
    verbose,
    overrides,
    print,
    loadContract,
    loadContractNoVerbose,
    getEncodedFunctionData,
    getChainId,
    getRpcUrl,
    getCommaSeparatedString
}
