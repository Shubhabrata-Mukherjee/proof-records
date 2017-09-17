pragma solidity ^0.4.13;

contract Records{
  bytes32[] public fileHashes;
  uint count;
  
  function Records()
  {
      count = 0;
  }
  
  function addRecord(bytes32 fileHash) public returns (uint) {
    if (count > 15) {
      revert();
    }

    fileHashes.push(fileHash);
    count++;
    return count-1;
  }

  function getRecord() constant public returns (bytes32[]) {
    return fileHashes;
  }  
}
