import {LavaSDK} from "@lavanet/lava-sdk"
import inquirer from 'inquirer';
import dotenv from 'dotenv';

dotenv.config()

async function askForChoice() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Please choose a chain to query',
      choices: ['LAV1', 'COS5', 'JUN1','COS3', 'ETH1', 'POLYGON1'],
    },
  ]);
  return answers.choice;
}

async function getUserInput() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'userText',
      message: 'Please choose an API to query',
    },
  ]);
  return answers.userText;
};

const runAll = async () => {
  if (!process.env.subscribed_consumer) {
    throw new Error ("Add a .env file with a subscribed consumer private key")
  }
  console.log(process.env.subscribed_consumer)

  while (true) {
    let choice = await askForChoice();
    console.log(`You chose ${choice}`);
    const sdkClient  = await new LavaSDK({
      privateKey: process.env.subscribed_consumer,
      chainID: `${choice}`, // chainID for abci_info query
      geolocation: "2",
    });
    // for example abci_info or eth_blockNumber 
    let api = await getUserInput()
    console.log(`API to run ${api}\n`);

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