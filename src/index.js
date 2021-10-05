import React from 'react';
import ReactDOM from 'react-dom';
import { MoralisProvider } from 'react-moralis';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const appId = "wqC91JhWf6l1xM6txbFrxlvdLFCalr4nUBN3O1Rf";
const serverUrl = "https://bxg2rxy8aeol.moralishost.com:2053/server"

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
     <App />
    </MoralisProvider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
