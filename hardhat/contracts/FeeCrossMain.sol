// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./FeeCrossNFT.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SampleFeeChain is OnFeeChain {
    address public owner;

    constructor(uint8 mintingChainID_, address genericHandler_)
        OnFeeChain(mintingChainID_, genericHandler_)
    {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function setLinker(address _linker) public onlyOwner {
        setLink(_linker);
    }

    function setFeesToken(address _feeToken) public onlyOwner {
        setFeeToken(_feeToken);
    }

    function setCrossChainGasLimit(uint256 _gasLimit) public onlyOwner {
        _setCrossChainGasLimit(_gasLimit);
    }

    function setCrossChainGasPrice(uint256 _gasPrice) public onlyOwner {
        _setCrossChainGasPrice(_gasPrice);
    }

    function setFeeTokenForNFT(address _feeToken) public onlyOwner {
        _setFeeTokenForNFT(_feeToken);
    }

    function setFeeInTokenForNFT(uint256 _price) public onlyOwner {
        _setFeeInTokenForNFT(_price);
    }

    function sendCrossChain(address _recipient) public returns (bytes32) {
        (bool sent, bytes32 hash) = _sendCrossChain(_recipient);
        require(sent == true, "Unsuccessful");
        return hash;
    }

    function withdrawFeeTokenForNFT() external override onlyOwner {
        address feeToken = fetchFeeTokenForNFT();
        uint256 amount = IERC20(feeToken).balanceOf(address(this));
        IERC20(feeToken).transfer(owner, amount);
    }
}
