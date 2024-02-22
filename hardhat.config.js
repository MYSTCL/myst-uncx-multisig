require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter")
require('@openzeppelin/hardhat-upgrades');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545"
        },
        hardhat: {
            blockGasLimit: 99999999
        },
        frame: {
            url: 'http://localhost:1248',
            timeout: 100000,
            gasPrice: 'auto', 
            gas: 'auto'
        }
    },
    solidity: {
        compilers:[
            {
                version: "0.8.19",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    }
                }
            }
        ]
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
    },
    etherscan: {
        customChains: []
      },
    paths: {
        sources: "./contracts",
        cache: "./cache",
        artifacts: "./artifacts"
    },
    mocha: {
        timeout: 200000
    }
}
