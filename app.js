// Smart contract details
const contractAddress = "YOUR_SMART_CONTRACT_ADDRESS";
const contractABI = [
  // Add the ABI of your contract here
  {
    "inputs": [
      { "internalType": "uint256", "name": "_startingPoint", "type": "uint256" },
      { "internalType": "string", "name": "_startingMessage", "type": "string" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "getNumber",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "increaseNumber",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decreaseNumber",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "newMessage", "type": "string" }],
    "name": "setMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "message",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
];

// Connect to Ethereum provider (e.g., MetaMask)
let provider, signer, contract;

async function connect() {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    loadContractData();
  } else {
    alert("Please install MetaMask!");
  }
}

// Load contract data
async function loadContractData() {
  const number = await contract.getNumber();
  const message = await contract.message();
  document.getElementById("number").innerText = number;
  document.getElementById("message").innerText = message;
}

// Increase number
async function increaseNumber() {
  const tx = await contract.increaseNumber();
  await tx.wait(); // Wait for transaction to be mined
  loadContractData();
}

// Decrease number
async function decreaseNumber() {
  const tx = await contract.decreaseNumber();
  await tx.wait();
  loadContractData();
}

// Set message
async function setMessage() {
  const newMessage = document.getElementById("newMessage").value;
  const tx = await contract.setMessage(newMessage);
  await tx.wait();
  loadContractData();
}

// Initialize
connect();
