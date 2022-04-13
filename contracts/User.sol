// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.19;

contract User{
    string public username;
    string public email;
    string public phone;
    string public addr;
    string public carnum;
    string public carmod;

    function register(string memory _username, string memory _email, string memory _phone, string memory _addr, string memory _cn, string memory _cm ) public{
        username=_username;
        email=_email;
        phone=_phone;
        addr=_addr;
        carnum=_cn;
        carmod=_cm;

    }
}