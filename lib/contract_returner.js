var fs = require('fs')

// Read the contract source file and pass it to the `compilationFinished` callback
function returnContractAsSource (filePath, compilationFinished, contractName) {
  compilationFinished(null, `
    var truffleContract = require('truffle-contract')
      , contracts = require('truffle-solidity-loader/lib/contracts_cache')
      , contractName = '${contractName}'

    if(!contracts[contractName]){
      var artifact = require('${filePath}')
      contracts[contractName] = truffleContract(artifact)
    }
    
    module.exports = contracts[contractName]
  `)
}

module.exports = returnContractAsSource