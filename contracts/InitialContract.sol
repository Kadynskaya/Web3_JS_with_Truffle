// SPDX-License-Identifier: MIT
pragma solidity >=0.5.1 <0.8.0;

contract InitialContract {
    string public value;

    constructor (string memory _value) public {
        value = _value;
    }

    function setData(string memory _value) public {
        value = _value;
    }

    function getData() public view returns(string memory) {
        return value;
    }
}