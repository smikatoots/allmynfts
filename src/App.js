import Web3 from 'web3';
import './App.css';



async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    console.log("network:", network);
  }

function App() {

  loadBlockchainData();

  return (
    <div className="container">
      <h1>Hello!</h1>
    </div>
  );
}

export default App;
