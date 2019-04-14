pragma solidity 0.5.7;

//import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
import "./ERC20Controlable.sol";


contract FiapSchoolToken is ERC20, ERC20Detailed, ERC20Mintable, ERC20Burnable, ERC20Controlable {

    uint private constant INITIAL_SUPPLY = 10000000;

    constructor()

    ERC20Burnable()
    ERC20Detailed("Fiap School Token", "FST", 0)

    ERC20()
    public {
        _mint(msg.sender, INITIAL_SUPPLY);
        _addController(msg.sender);
    }
}
