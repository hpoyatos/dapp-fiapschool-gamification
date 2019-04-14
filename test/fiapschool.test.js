const FiapSchool = artifacts.require("FiapSchool");
const FiapSchoolToken = artifacts.require("FiapSchoolToken");

contract('FiapSchool', (accounts) => {
  let catchRevert = require("./exceptions.test.js").catchRevert;
  let catchInvalidOpcode = require("./exceptions.test.js").catchInvalidOpcode;
  let fiapSchool;
  //let totalSupply;

  before(async () => {
    fiapSchool = await FiapSchool.deployed();
    fst = await FiapSchoolToken.deployed();
    //totalSupply = await fstInstance.totalSupply();
  });

  it('add student', async () => {
    let _name = "Theo Ferreira Poyatos";
    let _rm = "53960";
    let balance1 = await fst.balanceOf(accounts[3]);

    await fiapSchool.addStudent(_name, _rm, { from: accounts[3] });
    let student1 = await fiapSchool.getStudent(accounts[3], { from: accounts[3] });
    assert.equal(student1[0], _name, "Names didn't match");
    let balance2 = await fst.balanceOf(accounts[3]);

    assert.equal(balance1.toNumber()+50, balance2.toNumber(), "Student didn't reward it");
  });

  it('can\'t add student already identified', async () => {
    let _name = "Theo Ferreira Poyatos";
    let _rm = "53960";
    let balance1 = await fst.balanceOf(accounts[3]);
    let student1 = await catchInvalidOpcode(fiapSchool.addStudent(_name, _rm, { from: accounts[3] }));
    let balance2 = await fst.balanceOf(accounts[3]);
    assert.equal(balance1.toNumber(), balance2.toNumber(), "Student rewarded when he/she didn't deserve it");
  });

  it('recent identified student in getNonEnrollStudents', async () => {
    let found = false;
    let nonEnrollStudentsArray = await fiapSchool.getNonEnrollStudents({ from: accounts[0] });
    for (let i=0;i<nonEnrollStudentsArray.length; i++){
      if (nonEnrollStudentsArray[i] == accounts[3]){
        found = true;
      }
    }

    assert.equal(found, true, 'Student didn\'t found at nonEnrollStudents');
  });

  it('add class', async () => {
    let _name = "1MIA";
    let _grade = 1;
    await fiapSchool.addClass(_name, _grade);
    let classArray = await fiapSchool.getClassByName(_name);

    assert.equal(_name, classArray[0], "Names didn't match");
    assert.equal(_grade, classArray[1], "Names didn't match");
  });

  it ('enroll student to class', async () => {
    let numberOfNonEnrollStudents1 = await fiapSchool.getNumberOfNonEnrollStudents({ from: accounts[0] });
    let _className = "1MIA";
    await fiapSchool.enrollStudentToClass(accounts[3], _className, { from: accounts[0] });
    let numberOfNonEnrollStudents2 = await fiapSchool.getNumberOfNonEnrollStudents({ from: accounts[0] });
    assert.equal(numberOfNonEnrollStudents1.toNumber()-1, numberOfNonEnrollStudents2, "Student didn't remove from NonEnrollStudents (1)");

    let found = false;
    let nonEnrollStudentsArray = await fiapSchool.getNonEnrollStudents({ from: accounts[0] });
    for (let i=0;i<nonEnrollStudentsArray.length; i++){
      if (nonEnrollStudentsArray[i] == accounts[3]){
        found = true;
      }
    }

    assert.equal(found, false, 'Student didn\'t remove from nonEnrollStudents (2)');
  });

  it ('can\'t enroll student to class if sender isn\'t in WhitelistAdmin', async () => {
    let _name = "Giuliano Poyatos";
    let _rm = "12345";
    let numberOfNonEnrollStudents1 = await fiapSchool.getNumberOfNonEnrollStudents({ from: accounts[0] });
    await fiapSchool.addStudent(_name, _rm, { from: accounts[5] });
    let numberOfNonEnrollStudents2 = await fiapSchool.getNumberOfNonEnrollStudents({ from: accounts[0] });

    let _className = "1MIA";
    await catchRevert(fiapSchool.enrollStudentToClass(accounts[5], _className, { from: accounts[1] }));

    assert.equal(numberOfNonEnrollStudents1.toNumber()+1, numberOfNonEnrollStudents2, 'Student enrolled it when he/she can\'t do it');
  });
});
