import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import { Moralis } from 'moralis';
import { isCompositeComponent } from 'react-dom/test-utils';

//To-Do's
// - dynamic add of address
// - better UI render
// - more metadata
// - incorporate solana NFTs 

async function getNFTs(accountAddress, setNftArray) {
  console.log("getNFTs renders", accountAddress)
  const options = { chain: 'eth', address: accountAddress};
  const nfts = await Moralis.Web3.getNFTs(options);
  setNftArray([]);
  nfts.forEach(function(nft) {
    console.log("every nft", nft);
    if(nft.token_uri!==undefined){
      console.log("testnftokenuri not undefined");
      let url = fixURL(nft.token_uri);
      fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        setNftArray(nftArray => [...nftArray, {title: data.name, link: data.external_url, desc: data.description, image: fixURL(data.image)} ]);
      });  
    }
  })
}

function fixURL(url) {
  if(url.startsWith("ipfs://ipfs/")) {
    return "https://ipfs.moralis.io:2053/ipfs/"+url.split("ipfs://ipfs/").slice(-1)
  }
  else if(url.startsWith("ipfs://")) {
    return "https://ipfs.moralis.io:2053/ipfs/"+url.split("ipfs://").slice(-1)
  }
  else {
    return url+"?format=json"
  }
}

async function loadBlockchainData(setAccountAddress, setNftArray, accountAddress) {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    // const network = await web3.eth.net.getNetworkType();
    await window.ethereum.enable();
    // const accounts = await web3.eth.getAccounts();
    setAccountAddress(accountAddress);
    getNFTs(accountAddress, setNftArray);
  }
  
function App() {
  const [accountAddress, setAccountAddress] = useState("input an address");
  const [isConnectionStale, setIsConnectionStale] = useState(false);
  const [nftArray, setNftArray] = useState([]);
  console.log("nftarray", nftArray);

  const viewEthereumNfts = useCallback(() => {
    const address = document.getElementById("address").value;
    console.log(address);
    loadBlockchainData(setAccountAddress, setNftArray, address);
  }, [setAccountAddress, setNftArray]);

  const connect = useCallback(async () => {
    if (isConnectionStale || accountAddress === "loading") {
      loadBlockchainData(setAccountAddress, setNftArray, accountAddress);
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

  const isNftEmpty = nftArray.length === 0

  return (
    <div className="container">
      <h1>Hello!</h1>
      <form> 
        <input type="text" id="address"/>
      </form> 
      <button onClick={viewEthereumNfts}> View NFTs</button> 
      <p>Your account: {accountAddress}</p>
        {isNftEmpty && accountAddress !== "loading"
          ? 
          <div>No NFTs</div>
          :
          nftArray.map((nfts)=> (
            <div>
              <h3><a href={nfts.link}>{nfts.title}</a></h3>
              <p>{nfts.desc}</p>
              <img src={nfts.image} height="200" width="200"></img>
            </div> 
          ))}
    </div>
  );
}

export default App;
