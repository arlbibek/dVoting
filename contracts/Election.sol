// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;

contract Election {
    address public admin;
    uint256 candidateCount;
    uint256 voterCount;
    bool start;
    bool end;

    // Constructor
    constructor() public {
        // Initilizing default values
        admin = msg.sender;
        candidateCount = 0;
        voterCount = 0;
        start = false;
        end = false;
    }

    function getAdmin() public view returns (address) {
        // Returns address of the admin (i.e. account which was used to deploy contract)
        return admin;
    }

    modifier onlyAdmin() {
        // Allowing only admin can access
        require(msg.sender == admin);
        _;
    }
    struct Candidate {
        // Modeling a candidate
        uint256 candidateId;
        string header;
        string slogan;
        uint256 voteCount;
    }
    mapping(uint256 => Candidate) public candidateDetails;

    // function to add candidates
    function addCandidate(string memory _header, string memory _slogan)
        public
        // Only admin can add
        onlyAdmin
    {
        Candidate memory newCandidate =
            Candidate({
                candidateId: candidateCount,
                header: _header,
                slogan: _slogan,
                voteCount: 0
            });
        candidateDetails[candidateCount] = newCandidate;
        candidateCount += 1;
    }

    function getCandidateNumber() public view returns (uint256) {
        // get total number of candidates
        return candidateCount;
    }

    struct Voter {
        // Modeling a voter
        address voterAddress;
        string name;
        string phone;
        bool hasVoted;
        bool isVerified;
    }

    address[] public voters; // Array of address to store address of voters
    mapping(address => Voter) public voterDetails;

    // request to be added as voter
    function requestVoter(string memory _name, string memory _phone) public {
        Voter memory newVoter =
            Voter({
                voterAddress: msg.sender,
                name: _name,
                phone: _phone,
                hasVoted: false,
                isVerified: false
            });
        voterDetails[msg.sender] = newVoter;
        voters.push(msg.sender);
        voterCount += 1;
    }

    function vote(uint256 candidateId) public {
        require(voterDetails[msg.sender].hasVoted == false);
        require(voterDetails[msg.sender].isVerified == true);
        require(start == true);
        require(end == false);
        candidateDetails[candidateId].voteCount += 1;
        voterDetails[msg.sender].hasVoted = true;
    }

    // election start/end
    function startElection() public onlyAdmin {
        start = true;
        end = false;
    }

    function endElection() public onlyAdmin {
        end = true;
        start = false;
    }

    function getStart() public view returns (bool) {
        return start;
    }

    function getEnd() public view returns (bool) {
        return end;
    }
}
