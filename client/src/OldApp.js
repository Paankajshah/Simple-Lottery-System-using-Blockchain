import React, { useState } from "react";
import Web3 from "web3";
import { HelloAbi } from "./HelloAbi.js";

import "./App.css";

const web3 = new Web3(Web3.givenProvider);

const contractAddress = '0x6bE9C9605F56C935673006b06423206CfDDaeb1f' //Contract Address
const HelloContract = new web3.eth.Contract(HelloAbi, contractAddress);

function App() {
  const [greeting, setGreeting] = useState(0);

  const setData = async e => {
    e.preventDefault();
    try {
      const accounts = await window.ethereum.enable();
      const account = accounts[0];
      // const testGas = await HelloContract.methods.setGreeting(123).estimateGas({from: account})
      // .then(function(gasAmount){
      //     console.log(gasAmount)
      //   })
      //   .catch(function(error){
        
      //     console.log(error.message)
      // });
      //const gas = await HelloContract.methods.setGreeting(greeting).estimateGas();
      //console.log(gas)
      const result = await HelloContract.methods
        .setGreeting(greeting)
        .send({ from: account, gas });
      console.log(result);

    } catch (error) {
      console.log(error.message)
    }
  };

  const getData = async e => {
    e.preventDefault();
    try {
      const result = await HelloContract.methods.getGreeting().call();
      console.log(result);
      
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={setData}>
          <label>
            Set Data:
            <input
              type="text"
              name="greeting"
              value={greeting}
              onChange={e => setGreeting(e.target.value)}
            />
          </label>
          <input type="submit" value="Set Data" />
        </form>
        <br />
        <button onClick={getData} type="button">
          Get Data
        </button>
      </header>
    </div>
  );
}

export default App;