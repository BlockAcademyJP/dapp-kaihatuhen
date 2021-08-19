const Dai = artifacts.require("Dai");
const Link = artifacts.require("Link");
const Comp = artifacts.require("Comp");

const BN = require("bn.js");
const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-bn")(BN));

const truffleAssert = require("truffle-assertions");

const toWei = (number) => web3.utils.toWei(web3.utils.toBN(number), "ether");

contract("ERC20 token test", (accounts) => {
  let dai, link, comp;

  const owner = accounts[0];
  const alice = accounts[1];
  const bob = accounts[2];

  before(async () => {
    dai = await Dai.deployed();
    link = await Link.deployed();
    comp = await Comp.deployed();
  });

  describe("Supply", () => {
    it("Should return token names and symbols correctly", async () => {
      expect(await dai.name()).to.equal("Dai");
      expect(await link.symbol()).to.equal("LINK");
    });
  });

  it("Should have correct total supply", async () => {
    expect(await comp.totalSupply()).to.bignumber.equal(toWei(10 ** 4));
  });

  it("Should revert when transfer amount > balance", async () => {
    const ownerBalance = await comp.balanceOf(owner);
    const transferAmount = ownerBalance.add(new BN(1));
    await truffleAssert.reverts(comp.transfer(alice, transferAmount));
  });
});
