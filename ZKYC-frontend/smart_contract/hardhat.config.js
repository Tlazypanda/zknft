require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/6Vczj1rz-B6Q9edvpj0JBCNjcCSIKPk7',
      accounts: ['ccba5dab744f303e9c0cc9b7cd452c4dd26972236d5f6753fb1b7539b712b10f'],
    },
  },
};

//0x89c81e05125958406a5103118C8D3AdF60bE12FD