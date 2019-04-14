pragma solidity 0.5.7;

import "./FiapSchoolToken.sol";
import "openzeppelin-solidity/contracts/access/roles/WhitelistAdminRole.sol";


contract Reward is WhitelistAdminRole {
    address private fstAddress;
    uint8 private reward;

    function setReward(uint8 _reward) public onlyWhitelistAdmin {
        reward = _reward;
    }

    function getReward() public view returns (uint24) {
        return reward;
    }

    function _rewardTo(address _to) internal {
        FiapSchoolToken(fstAddress).mint(_to, reward);
    }

    constructor(address _fstAddress, uint8 _initialReward) public {
        fstAddress = _fstAddress;
        reward = _initialReward;
    }
}
