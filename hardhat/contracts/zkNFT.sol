//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ZKYCNft is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address owner;

    //Adding this variable in the tokenContract to make the token "SOULBOUND" i.e non-transferrable
    bool canTransfer;

    event TransferActivity(address from, address to, uint256 token);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can mint");
        _;
    }

    constructor() ERC721("ZKYCVerified", "ZKYC") {
        owner = msg.sender;
        canTransfer = false;
    }

    function mintNft(string memory _tokenURI, address user) public onlyOwner {
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _safeMint(user, tokenId);
        _setTokenURI(tokenId, _tokenURI);

    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // The following functions are overrides required by Solidity.
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data)
        public virtual
        override(ERC721)
    {
        require(canTransfer, "Cannot transfer this token!");
        emit TransferActivity(from, to, tokenId);
    }


    // The following functions are overrides required by Solidity.
    function transferFrom(address from, address to, uint256 tokenId)
        public virtual
        override(ERC721)
    {
        require(canTransfer, "Cannot transfer this token!");
        emit TransferActivity(from, to, tokenId);
    }

}
