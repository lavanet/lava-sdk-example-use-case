import {LavaSDK} from "@lavanet/lava-sdk"
import {askForChoice, getUserInput} from "./user_inputs"
import dotenv from 'dotenv';

// Query Lava supported chains: using rest API: /lavanet/lava/spec/show_all_chains  

const runAll = async () => {
  // load the .env file.
  dotenv.config()
  if (!process.env.subscribed_consumer1) {
    throw new Error ("Add a .env file with a subscribed consumer private key")
  }

  while (true) {
    // ask for a network choice
    let choice = await askForChoice();
    console.log(`You chose ${choice}`);

    // Create a lava SDK instance
    const sdkClient  = await new LavaSDK({
      privateKey: process.env.subscribed_consumer1,
      chainID: `${choice}`, // chainID for abci_info query
      geolocation: "1",
    });

    // ask for an API to run
    // examples EVM: eth_chainId, eth_blockNumber
    // examples Tendermint: abci_info, status

    let api = await getUserInput() 
    console.log(`API to run ${api}\n`);

    // send the relay
    const info = await sdkClient.sendRelay({
    method: api,
    params: [],
  });
    
  // Parse and extract response
  const parsedInfo = JSON.parse(info).result;
  console.log("Result:", parsedInfo, "\n\n");
  }
};

runAll();