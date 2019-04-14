const FiapSchoolToken = artifacts.require("FiapSchoolToken");

contract('FiapSchoolToken', (accounts) => {
  let catchRevert = require("./exceptions.test.js").catchRevert;
  let fstInstance;
  let totalSupply;

  before(async () => {
    fstInstance = await FiapSchoolToken.deployed();
    totalSupply = await fstInstance.totalSupply();
  });

  it('forjar 50 FiapSchoolTokens (FSTs) com a primeira conta', async () => {
    let balanco = await fstInstance.balanceOf(accounts[0]);
    let balanco1 = balanco.toNumber() + 50;
    let forja = await fstInstance.mint(accounts[0], 50, { from: accounts[0] });
    balanco = await fstInstance.balanceOf(accounts[0]);
    let balanco2 = balanco.toNumber();

    assert.equal(balanco1, balanco2, "Não havia 50 FSTs a mais na primeira conta.");
  });

  it('destruir 50 FiapSchoolTokens (FSTs) da primeira conta', async () => {
    let balanco = await fstInstance.balanceOf(accounts[0]);
    let balanco1 = balanco.toNumber() - 50;
    let destruicao = await fstInstance.burn(50, { from: accounts[0] });
    balanco = await fstInstance.balanceOf(accounts[0]);
    let balanco2 = balanco.toNumber();

    assert.equal(balanco1, balanco2, "Não havia 50 FSTs a menos na primeira conta.");
  });

  it('não forjar 50 FiapSchoolTokens (FSTs) com a segunda conta', async () => {
    let balanco = await fstInstance.balanceOf(accounts[1]);
    let balanco1 = balanco.toNumber();
    let forja = await catchRevert(fstInstance.mint(accounts[1], 50, { from: accounts[1] }));
    balanco = await fstInstance.balanceOf(accounts[1]);
    let balanco2 = balanco.toNumber();

    assert.equal(balanco1, balanco2, "Não diferença entre o antes e depois da segunda conta não era igual a 0 FSTs.");
  });

  it('transferência de 50 FSTs entre a primeira e segunda contas', async () => {
    let balanco = await fstInstance.balanceOf(accounts[0]);
    let balancoConta1Antes = balanco.toNumber();
    balanco = await fstInstance.balanceOf(accounts[1]);
    let balancoConta2Antes = balanco.toNumber() + 50;
    let transf = await fstInstance.transferFrom(accounts[0], accounts[1], 50, { from: accounts[0] });
    balanco = await fstInstance.balanceOf(accounts[0]);
    let balancoConta1Depois = balanco.toNumber() + 50;
    balanco = await fstInstance.balanceOf(accounts[1]);
    let balancoConta2Depois = balanco.toNumber();

    assert.equal(balancoConta1Antes, balancoConta1Depois, "A primeira conta não tinha 50 FSTs a menos.");
    assert.equal(balancoConta2Antes, balancoConta2Depois, "A segunda conta não tinha 50 FSTs a mais.");

  });

});
