import React, { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

const CONTRACT_ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "social",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "math",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "naturalScience",
          "type": "uint256"
        }
      ],
      "name": "ReportCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_social",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_math",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_naturalScience",
          "type": "uint256"
        }
      ],
      "name": "createReport",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getReport",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]; // Your ABI
const CONTRACT_ADDRESS = "0xAD90207213b8C73e0776F9DD10432d14B898a87f"; // Your contract address

function CreateReport() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const reportIdInput = useRef();
  const nameInput = useRef();
  const socialInput = useRef();
  const mathInput = useRef();
  const naturalScienceInput = useRef();

  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3Instance = new Web3(provider);
        const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        const accounts = await web3Instance.eth.getAccounts();

        setWeb3(web3Instance);
        setContract(contractInstance);
        setAccounts(accounts);
      } else {
        console.log("Please install MetaMask!");
      }
    };

    init();
  }, []);

  const createReport = async () => {
    const id = reportIdInput.current?.value;
    const name = nameInput.current?.value;
    const social = socialInput.current?.value;
    const math = mathInput.current?.value;
    const naturalScience = naturalScienceInput.current?.value;

    if (id && name && social && math && naturalScience) {
      try {
        await contract.methods.createReport(id, name, social, math, naturalScience).send({ from: accounts[0] });
        console.log("Report created successfully");
      } catch (error) {
        console.log("Error creating report:", error);
      }
    } else {
      console.log("Please make sure all input fields have values.");
    }
  };

  const getReport = async () => {
    const id = reportIdInput.current?.value;

    if (id) {
      try {
        const report = await contract.methods.getReport(id).call();
        console.log("Report:", report);
      } catch (error) {
        console.log("Error fetching report:", error);
      }
    } else {
      console.log("Please make sure the ID input field has a value.");
    }
  };

  return (
    <div className="mt-4">
      <h2>Create Report (Prtototype for  Teacher)</h2>
      <form>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input type="number" className="form-control" id="id" ref={reportIdInput} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" ref={nameInput} />
        </div>
        <div className="form-group">
          <label htmlFor="social">Social</label>
          <input type="number" className="form-control" id="social" ref={socialInput} />
        </div>
        <div className="form-group">
          <label htmlFor="math">Math</label>
          <input type="number" className="form-control" id="math" ref={mathInput} />
        </div>
        <div className="form-group">
          <label htmlFor="naturalScience">Natural Science</label>
          <input type="number" className="form-control" id="naturalScience" ref={naturalScienceInput} />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={createReport}
        >
          Create Report
        </button>
       
      </form>
    </div>
  );  
}

export default CreateReport;
