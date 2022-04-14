// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.19;


contract Donate{
    address payable  public user;

    uint256 public total=0;

     function donates() payable public {
        total=total+msg.value;
     }  

    
}