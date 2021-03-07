// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

interface Regulatro {
    function checkValidity() external returns (bool) {
        return true;
    }

contract Voting {
    string private header;
    uint private votes;

    function setHeader(string memory newHeader) public {
        header = newHeader;
    }
    function gerHeader() public view returns (string memory) {
        return header;
    }
}