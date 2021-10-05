import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';

window.addEventListener('load', function() {
  if (typeof Web3 !== 'undefined') {
    const web3 = new Web3(Web3.currentProvider);
    console.log("EVENT LISTENER");
  } 
  
  else { 
    console.log("no metamask");
  }
})

// var accountInterval = setInterval(function() {
  // console.log("UPDATEINTERCVAL")
  // if (Web3.eth.accounts[0] !== userAccount) {
    // console.log("UPDATE WALLET")
//     userAccount = web3.eth.accounts[0];
//   updateInterface();
  // }
// }, 10000);

async function loadBlockchainData(setAccountAddress) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    // console.log("accounts ", accounts);
    setAccountAddress(accounts[0])
  }

function App() {
  const [accountAddress, setAccountAddress] = useState("loading");
  const [isConnectionStale, setIsConnectionStale] = useState(false);

  //useCallBack
  //useEffect
  //too many re-renders 

  const connect = useCallback(async () => {
    if (isConnectionStale || accountAddress === "loading") {
      loadBlockchainData(setAccountAddress);
      setIsConnectionStale(false);
      console.log("LOADDEDDD");
    };    
  }, [accountAddress, setAccountAddress, isConnectionStale, setIsConnectionStale]);

  useEffect(() => {
    connect()
  }, [connect]);

  useEffect(() => {
    setInterval(function() { 
      setIsConnectionStale(true); 
      console.log("intervals");
    }, 100000);
  }, [setIsConnectionStale]);

  return (
    <div className="container">
      <h1>Hello!</h1>
      <p>Your account: {accountAddress}</p>
    </div>
  );
}

export default App;
