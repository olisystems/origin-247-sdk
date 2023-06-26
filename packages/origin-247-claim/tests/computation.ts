const { BigNumber } = require('@ethersproject/bignumber');
const { SpreadMatcher } = require('../src/');

// Function to perform some computations
function performComputations() {
  // Example computation
  const number1 = BigNumber.from(10);
  const number2 = BigNumber.from(5);
  const sum = number1.add(number2);
  const product = number1.mul(number2);

  // Output the results
  console.log(`Sum: ${sum.toString()}`);
  console.log(`Product: ${product.toString()}`);
}

// Call the function to perform the computations
performComputations();

const result = SpreadMatcher.spreadMatcher({
  groupPriority: [
    [
      {
        id: 'consumerA',
        groupPriority: [[{ id: 'generatorA' }, { id: 'generatorB' }]],
      },
      {
        id: 'consumerB',
        groupPriority: [[{ id: 'generatorA' }, { id: 'generatorB' }]],
      },
    ],
  ],
  entityGroups: [
    [
      { id: 'consumerA', volume: BigNumber.from(100) },
      { id: 'consumerB', volume: BigNumber.from(100) },
    ],
    [
      { id: 'generatorA', volume: BigNumber.from(25) },
      { id: 'generatorB', volume: BigNumber.from(150) },
    ],
  ],
});

// Perform claiming related operations
const claimCommands = result.matches.map((match) => {
  const certificateId = match.generation?.certificateId || '';
  return {
    certificateId,
    claimData: {
      beneficiary: 'Your beneficiary',
      countryCode: 'Your country code',
      location: 'Your location',
      periodEndDate: 'Your period end date',
      periodStartDate: 'Your period start date',
      purpose: 'Your purpose'
    },
    energyValue: match.volume.toString(),
    forAddress: 'Your wallet address'
  };
});

// Print claim commands
console.log('Claim Commands:');
console.log(claimCommands);
