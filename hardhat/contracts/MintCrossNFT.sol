// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.0;
 
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@routerprotocol/router-crosstalk/contracts/RouterCrossTalk.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

abstract contract OnMintingChain is ERC721URIStorage, IERC721Receiver, RouterCrossTalk {
  using SafeERC20 for IERC20;
  address private feeTokenForNFT;
  uint256 private feeInTokenForNFT;
  uint256 public immutable MaxTokenId;
  uint256 public CurrentTokenId;
 event NewNFTMinted(address sender, uint256 tokenId);
  constructor(
    string memory name_,
    string memory symbol_,
    uint256 MaxTokenId_,
    address genericHandler_
  ) ERC721(name_, symbol_) RouterCrossTalk(genericHandler_) {
    MaxTokenId = MaxTokenId_;
  }
  /**
   * @notice _setFeeTokenForNFT Used to set feeToken, this can only be set by CrossChain Admin or Admins
   * @param _feeToken Address of the token to be set as fee
   */
  function _setFeeTokenForNFT(address _feeToken) internal {
    feeTokenForNFT = _feeToken;
  }
 
  /**
   * @notice fetchFeeTokenForNFT Used to fetch feeToken
   * @return feeToken address that is set
   */
  function fetchFeeTokenForNFT() external view returns (address) {
    return feeTokenForNFT;
  }
 
  /**
   * @notice _setFeeInTokenForNFT Used to set fees in Token, this can only be set by Admin
   * @param _price Amount of feeToken to be taken as price
   */
  function _setFeeInTokenForNFT(uint256 _price) internal {
    feeInTokenForNFT = _price;
  }
 
  /**
   * @notice fetchFeeInTokenForNFT Used to fetch fee in Token for NFT
   * @return Returns fee in Token
   */
  function fetchFeeInTokenForNFT() external view returns (uint256) {
    return feeInTokenForNFT;
  }
  
  function _routerSyncHandler(bytes4 _selector, bytes memory _data)
    internal
    virtual
    override
    returns (bool, bytes memory)
  {
    (address recipient, address refundAddress) = abi.decode(
      _data,
      (address, address)
    );
    (bool success, bytes memory returnData) = address(this).call(
      abi.encodeWithSelector(_selector, recipient, refundAddress)
    );
    return (success, returnData);
  }
  
      function _baseURI() internal virtual view override returns (string memory) {
  return "ipfs://";
}

function receiveCrossChain(address recipient, address refundAddress)
    external
    isSelf
    returns (bool)
  {
    CurrentTokenId = CurrentTokenId + 1;
    if (CurrentTokenId > MaxTokenId || _exists(CurrentTokenId)) {
      IERC20(feeTokenForNFT).safeTransferFrom(
        address(this),
        refundAddress,
        feeInTokenForNFT
      );
      return true;
    }
    _mint(recipient, CurrentTokenId);
    return true;
  }

function mint(address recipient, string memory metadataURI) internal {
    require(recipient != address(0), "MintingChain: Recipient cannot be 0");
    CurrentTokenId = CurrentTokenId + 1;
    require(CurrentTokenId <= MaxTokenId, "ERC721: MaxTokenId reached");
    IERC20(feeTokenForNFT).safeTransferFrom(
      msg.sender,
      address(this),
      feeInTokenForNFT
    );
    _mint(recipient, CurrentTokenId);
    _setTokenURI(CurrentTokenId, metadataURI);
    emit NewNFTMinted(recipient, CurrentTokenId);
  }
  
  function withdrawFeeTokenForNFT() external virtual {}
  
  function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4){
    return IERC721Receiver.onERC721Received.selector;
    }

  }
