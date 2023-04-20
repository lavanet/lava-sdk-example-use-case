import inquirer from 'inquirer';

export async function askForChoice() {
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
  
export async function getUserInput() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'userText',
        message: 'Please choose an API to query',
      },
    ]);
    return answers.userText;
  };
  