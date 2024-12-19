const web3 = require('web3');
const RLP = require('rlp');

// Configure
const validators = [
  {
    consensusAddr: '0xf868B9A7677b2C1a273F92Aa6E637C0686002101',
    feeAddr: '0xf868B9A7677b2C1a273F92Aa6E637C0686002101',
    bscFeeAddr: '0xf868B9A7677b2C1a273F92Aa6E637C0686002101',
    votingPower: 0x0000000000000064,
  },
];
const bLSPublicKeys = [
  '0x8aa662bdcada08668354a96ba3bdc432f388525a1bb32f61db70128b7065bf70de3c4081b44c2064a45c98d60a4c73ee',
];

// ======== Do not edit below ========
function generateExtraData(validators) {
  let extraVanity = Buffer.alloc(32);
  let validatorsBytes = extraDataSerialize(validators);
  let extraSeal = Buffer.alloc(65);
  return Buffer.concat([extraVanity, validatorsBytes, extraSeal]);
}

function extraDataSerialize(validators) {
  let n = validators.length;
  let arr = [];
  for (let i = 0; i < n; i++) {
    let validator = validators[i];
    arr.push(Buffer.from(web3.utils.hexToBytes(validator.consensusAddr)));
  }
  return Buffer.concat(arr);
}

function validatorUpdateRlpEncode(validators, bLSPublicKeys) {
  let n = validators.length;
  let vals = [];
  for (let i = 0; i < n; i++) {
    vals.push([
      validators[i].consensusAddr,
      validators[i].bscFeeAddr,
      validators[i].feeAddr,
      validators[i].votingPower,
      bLSPublicKeys[i],
    ]);
  }
  let pkg = [0x00, vals];
  return web3.utils.bytesToHex(RLP.encode(pkg));
}

extraValidatorBytes = generateExtraData(validators);
validatorSetBytes = validatorUpdateRlpEncode(validators, bLSPublicKeys);

exports = module.exports = {
  extraValidatorBytes: extraValidatorBytes,
  validatorSetBytes: validatorSetBytes,
};

// 0x91dd0624d8cac21b3d1c1a1d5451704d5214b125dadc8f64b97644b09225e93d19cdd03a48dde5f568c957ff05d51bcc0547bfffe0d4f84e2ed891c13cb3064a28ad987c9ff805bde94875a69197037d29ce3f93c802ab034b3c3fb496e4c820