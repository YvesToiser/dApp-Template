pragma solidity 0.5.12;

contract Main {

  string message = 'World';

  function getMessage() public view returns (string memory) {
    return append3String('Hello ', message, ' !');
  }

  function setMessage(string memory newMessage) public payable{
    message = newMessage;
  }

  function append3String(string memory a, string memory b, string memory c)
  internal pure returns (string memory) {
    return string(abi.encodePacked(a, b, c));
  }

}
