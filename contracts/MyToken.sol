// SPDX-License-Identifier: MIT
pragma solidity >=0.5.1 <0.8.0;

contract MyToken {
    string public constant name = "My Token";
    string public constant symbol = "MT";
    uint8 public constant decimals = 18;
    
    uint256 public totalSupply;
    address[] public owners;
    address[] public holders;
    
    address public firstOwner;
    address public secondOwner;
    
    struct BalanceInfo {
        uint256 index;
        uint256 tokens;
    }
    
    mapping(address => BalanceInfo) internal balances;
    mapping(address => mapping(address => uint256)) private allowed;
    mapping(address => bool) public ownerByAddress;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _from, address indexed _to, uint256 _value);
    
    constructor () public {
        firstOwner = msg.sender;
        owners.push(firstOwner);
        ownerByAddress[firstOwner] = true;
        secondOwner = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
        owners.push(secondOwner);
        ownerByAddress[secondOwner] = true;
    }
    
    modifier onlyOwners {
        require(
            ownerByAddress[msg.sender] == true,
            "Only owners can call this function."
        );
        _;
    }
    
    function getHolders() public view returns(address[] memory) {
        return holders;
    }
    
    function addKeyToArray(address  _key) private {
        if(balances[_key].index > 0){
            return;
        }else {
            holders.push(_key);
            uint keyListIndex = holders.length - 1;
            balances[_key].index = keyListIndex + 1;
        }
    }
    
    function mint (address _to, uint _value) public onlyOwners {
        require(totalSupply + _value >= totalSupply && balances[_to].tokens + _value >= balances[_to].tokens);
        balances[_to].tokens += _value;
        totalSupply += _value;
        
        addKeyToArray(_to);
    }
    
    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner].tokens;
    }
    
    function transfer(address _to, uint256 _value) public {
        require(_value > 0 && balances[msg.sender].tokens >= _value && balances[_to].tokens + _value > balances[_to].tokens);
        balances[msg.sender].tokens -= _value;
        balances[_to].tokens += _value;
        emit Transfer(msg.sender, _to, _value);
        
        addKeyToArray(_to);
    }
    
    function transferFrom (address _from, address _to, uint256 _value) public {
        require(_value > 0 && balances[_from].tokens >= _value && balances[_to].tokens + _value >= balances[_to].tokens && allowed[_from][msg.sender] >= _value);
        balances[_from].tokens -= _value;
        balances[_to].tokens += _value;
        allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        
        addKeyToArray(_to);
    }
    
    function approve(address _spender, uint256 _value) public returns (bool) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function allowance(address _owner, address _spender) public view returns (uint) {
        return allowed[_owner][_spender];
    }
    
}