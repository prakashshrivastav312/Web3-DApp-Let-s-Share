// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.19;

contract User{

    uint public id=0;
    mapping(address=>string) public roles;
    mapping(address=>uint) public num;
    struct us{
    string  username;
    string email;
    string  phone;
    string  addr;
    string role;
    string  carnum;
    string  carmod;
    }
    
    mapping(uint=>us) public user; 
    function register(string memory _username, string memory _email, string memory _phone, string memory _addr, string memory _role, string memory _cn, string memory _cm ) public{
        id+=1;
        user[id]=us(_username,_email,_phone,_addr,_role,_cn,_cm);
        roles[msg.sender]=_role;
        num[msg.sender]=id;
    }
}