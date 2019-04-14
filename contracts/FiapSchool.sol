pragma solidity 0.5.7;

import "./Reward.sol";


contract FiapSchool is Reward {
    enum Grade { FundII, Medio }

    struct Student {
        string name;
        uint24 rm;
        bool active;
    }

    struct Class {
        string name;
        Grade grade;
        address[] students;
    }

    struct Subject {
        string name;
    }

    struct Assignment {
        Class class;
        string subject;
    }

    address[] private nonEnrollStudents;
    mapping(address => Student) private students;
    mapping(string => Class) private classes;
    mapping(address => Assignment[]) private assignments;

    function getStudent(address _address) public view returns (string memory, uint24) {
        return (students[_address].name, students[_address].rm);
    }

    function addClass(string memory _name, Grade _grade) public onlyWhitelistAdmin {
        classes[_name] = Class({name: _name, grade: _grade, students: new address[](50) });
    }

    function addAssignment(
        address _teacher, string memory _class, string memory _subject) public onlyWhitelistAdmin {
        assignments[_teacher].push(Assignment({class: getClass(_class), subject: _subject}));
    }
/*
    function getAssignmentByTeacher(address _teacher) public view returns (string memory, Grade) {
        return (classes[_name].name, classes[_name].grade);
    }
*/

    function enrollStudentToClass(address _student, string memory _class) public onlyWhitelistAdmin {
        classes[_class].students.push(_student);
        for (uint i=0; i < nonEnrollStudents.length; i++) {
            if (nonEnrollStudents[i] == _student) {
                if (nonEnrollStudents.length > 1) {
                    nonEnrollStudents[i] == nonEnrollStudents[nonEnrollStudents.length - 1];
                    delete nonEnrollStudents[nonEnrollStudents.length - 1];
                } else {
                    delete nonEnrollStudents[0];
                }
                nonEnrollStudents.length--;
            }
        }
    }

    function getNumberOfNonEnrollStudents() public view returns (uint256) {
        return nonEnrollStudents.length;
    }

    function addStudent(string memory _name, uint24 _rm) public onlyNewStudents {
        students[msg.sender] = Student({ name: _name, rm: _rm, active: true });
        nonEnrollStudents.push(msg.sender);
        _rewardTo(msg.sender);
    }

    function getNonEnrollStudents() public view returns (address[] memory)
    {
        return nonEnrollStudents;
    }

    function getClassByName(string memory _name) public view returns (string memory, Grade) {
        return (classes[_name].name, classes[_name].grade);
    }

    function getClass(string memory _name) internal view returns (Class memory) {
        return classes[_name];
    }



    modifier onlyNewStudents {
        assert(students[msg.sender].active == false);
        _;
    }

    constructor(address _fstAddress)
    Reward(_fstAddress, 50)
    public {
}
}
