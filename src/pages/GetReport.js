import React, { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";


const CONTRACT_ADDRESS = "0xAD90207213b8C73e0776F9DD10432d14B898a87f";
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
    } ];

function CreateReport() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [reportData, setReportData] = useState(null);

  const reportIdInput = useRef();
  const nameInput = useRef();
  const socialInput = useRef();
  const mathInput = useRef();
  const naturalScienceInput = useRef();

  useEffect(() => {
    const init = async () => {
      try {
        const provider = await detectEthereumProvider();
        if (provider) {
          const web3Instance = new Web3(provider);
          setWeb3(web3Instance);

          const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
          setContract(contractInstance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccounts(accounts);
        } else {
          console.error("Please install MetaMask!");
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const createReport = async (id, name, social, math, naturalScience) => {
    try {
      await contract.methods
        .createReport(id, name, social, math, naturalScience)
        .send({ from: accounts[0] });
      alert("Report created successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the report");
    }
  };

  const getReport = async () => {
    try {
      const reportId = reportIdInput.current.value;
      if (!reportId) {
        alert("Please enter a report ID");
        return;
      }
      const report = await contract.methods.getReport(reportId).call({ from: accounts[0] });
      setReportData({
        id: report[0],
        name: report[1],
        social: report[2],
        math: report[3],
        naturalScience: report[4],
      });
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching the report");
    }
  };

  return (
    <div className="mt-4">
      <h2>Get Report (Prototype for Student)</h2>
      <form>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input type="number" className="form-control" id="id" ref={reportIdInput} />
        </div>
        {/* ... other input fields */}
      
      </form>

      <button
        type="button"
        className="btn btn-secondary mt-4"
        onClick={() => getReport()}
      >
        Get Report
      </button>

      {reportData && (
        <div className="mt-4">
          <h2>Report Details</h2>
          <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Social</th>
            <th>Math</th>
            <th>Natural Science</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{reportData.id}</td>
            <td>{reportData.name}</td>
            <td>{reportData.social}</td>
            <td>{reportData.math}</td>
            <td>{reportData.naturalScience}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )}
</div>
);
}

export default CreateReport;
