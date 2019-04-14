const FiapSchoolToken = artifacts.require("FiapSchoolToken");
const FiapSchool = artifacts.require("FiapSchool");

module.exports = function(deployer) {
  //deployer.deploy(FiapSchoolToken).then(function() {
    //return
      deployer.deploy(FiapSchool, FiapSchoolToken.address).then(async () => {
      var fstInstance = await FiapSchoolToken.deployed();
      await fstInstance.addWhitelistAdmin(FiapSchool.address);
      console.log(FiapSchoolToken.address+" adicionou whitelist "+FiapSchool.address);
      await fstInstance.addController(FiapSchool.address);
      console.log(FiapSchoolToken.address+" adicionou addcontroller "+FiapSchool.address);
    });
  //});
};
