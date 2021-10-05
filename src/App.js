import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import { Moralis } from 'moralis';

//To-Do's
// - dynamic add of address
// - better UI render
// - more metadata
// - incorporate solana NFTs 

async function getNFTs(accountAddress, setNftArray, nftArray) {
  const options = { chain: 'eth', address: "0xbeeef66749b64afe43bbc9475635eb510cfe4922"};
  const nfts = await Moralis.Web3.getNFTs(options);

  console.log("TEST ABC, ", nftArray, setNftArray);

  nfts.forEach(function(nft) {
    // console.log("each nft ", nft.token_uri);
    let url = nft.token_uri;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      setNftArray(nftArray => [...nftArray, data.image]);
      // console.log('data image ', data.image); 
    });      

  })

  console.log("nfts", nfts);
}

async function loadBlockchainData(setAccountAddress, setNftArray, nftArray) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const network = await web3.eth.net.getNetworkType();
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    setAccountAddress(accounts[0]);
    getNFTs(accounts[0], setNftArray, nftArray);
  }
  
function App() {
  const [accountAddress, setAccountAddress] = useState("loading");
  const [isConnectionStale, setIsConnectionStale] = useState(false);
  const [nftArray, setNftArray] = useState(["https://service.cryptotrunks.co/image.png?token=9322"]);

  //useCallBack
  //useEffect
  //too many re-renders 

  const connect = useCallback(async () => {
    if (isConnectionStale || accountAddress === "loading") {
      loadBlockchainData(setAccountAddress, setNftArray, nftArray);
      setIsConnectionStale(false);
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
        {nftArray.map((nfts)=> (
          <img src={nfts} height="100" width="100"></img>
        ))}
    </div>
  );
}

export default App;
