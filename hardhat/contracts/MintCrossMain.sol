// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.0;
 
import "./MintCrossNFT.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
 
contract SampleMintingChain is OnMintingChain {
    address public owner;
 
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 MaxTokenId_,
        address genericHandler_
    ) OnMintingChain(name_, symbol_, MaxTokenId_, genericHandler_) {
        owner = msg.sender;
    }
 
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
        function _baseURI() internal view override returns (string memory) {
  return "ipfs://";
}
 
    function setLinker(address _linker) public onlyOwner {
        setLink(_linker);
    }
 
    function setFeeTokenForNFT(address _feeToken) public onlyOwner {
        _setFeeTokenForNFT(_feeToken);
    }
 
    function setFeeInTokenForNFT(uint256 _price) public onlyOwner {
        _setFeeInTokenForNFT(_price);
    }
 
    // If fees is to be paid on minting chain
    function mintSameChain(address recipient, string memory metadataURI) public {
        mint(recipient, metadataURI);
    }
 
    function withdrawFeeTokenForNFT() external override onlyOwner {

    }
}

