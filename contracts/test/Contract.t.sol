// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../lib/forge-std/src/Test.sol";
import "../src/regenscore.sol";

contract ContractTest is Test {
    RegenScore regenscore;
    function setUp() public {
        regenscore = new RegenScore();
    }

    function testSoulbound() public {
        regenscore.safeMint(address(0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc), "");
        vm.prank(0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc);
        vm.expectRevert("Ownable: caller is not the owner");
        regenscore.transferFrom(0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc, 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc, 0);
    }
}
