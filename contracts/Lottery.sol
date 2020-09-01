pragma solidity ^0.5.3;

contract Lottery {
    address public owner;

    address payable[] public players;

    address payable public winner;

    string greeting;
    event check(address, uint256, uint256);

    constructor() public {
        owner = msg.sender;
        greeting = "hello";
    }

    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    modifier OwnerOnly {
        if (msg.sender == owner) {
            _;
        }
    }

    function pankaj() public pure returns (string memory) {
        return "pankaj";
    }

    function deposit() public payable {
        require(msg.value >= 10 ether);
        emit check(msg.sender, msg.value, address(this).balance);
        players.push(msg.sender);
    }

    function GenerateRandomNum() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(now, block.difficulty, players.length)
                )
            );
    }

    function pickWinner() public OwnerOnly {
        uint256 randomNumber = GenerateRandomNum();
        uint256 index = randomNumber % players.length;
        // address payable winner;

        winner = players[index];

        winner.transfer(address(this).balance);

        players = new address payable[](0);
    }
}
