// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.19;
import "./PST.sol";

contract Donate{
   
   
    
    address payable public user;
    address public owner;

    PST token;  
   


    uint256 public total=0;
   constructor(PST _token) public {
         owner=msg.sender;
         token=_token;

   }


      
        
      function register() public{
            
         user=msg.sender;
      }

      function distribute() public{
         require(msg.sender==owner);
         uint256 a=token.balanceOf(address(this));
         token.transfer(user,a);
         total=0;
      }

    
}