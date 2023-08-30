export const predictionMarket = {
  abi: [
    {
      inputs: [
        { internalType: 'uint256', name: 'cutoffDate_', type: 'uint256' },
        { internalType: 'uint256', name: 'decisionDate_', type: 'uint256' },
        { internalType: 'address', name: 'decisionProvider_', type: 'address' },
        { internalType: 'string', name: 'description_', type: 'string' },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
        { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'player', type: 'address' },
        { indexed: true, internalType: 'bool', name: 'isYes', type: 'bool' },
        { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      name: 'betEvent',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'player', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      name: 'claimEvent',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'provider', type: 'address' },
        { indexed: true, internalType: 'bool', name: 'winToken', type: 'bool' },
      ],
      name: 'marketResultEvent',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: 'address', name: 'withdrawTo', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      name: 'withdrawRestEvent',
      type: 'event',
    },
    { inputs: [], name: 'MAX_BID', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
    {
      inputs: [{ internalType: 'bool', name: 'tokenType', type: 'bool' }],
      name: 'bet',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'payable',
      type: 'function',
    },
    { inputs: [{ internalType: 'address', name: 'withdrawTo', type: 'address' }], name: 'claim', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    { inputs: [{ internalType: 'address payable', name: '_to', type: 'address' }], name: 'destroy', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
      inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
      name: 'getApproxWinAmount',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    { inputs: [], name: 'getCutoffDate', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'getDecisionDate', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'getDecisionProvider', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'getDescription', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'getState', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'getTotalValueLocked', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
    {
      inputs: [{ internalType: 'bool', name: 'tokenType', type: 'bool' }],
      name: 'getTotalVotesValue',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
      name: 'getVotes',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    { inputs: [], name: 'getWinToken', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
    { inputs: [], name: 'owner', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
    { inputs: [{ internalType: 'bool', name: 'winToken_', type: 'bool' }], name: 'provideResult', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'withdrawTo', type: 'address' }],
      name: 'withdrawRest',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    { stateMutability: 'payable', type: 'receive' },
  ],
} as const;
