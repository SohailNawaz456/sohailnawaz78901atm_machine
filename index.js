#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 50000;
let myPin = 1234;
// Print welcome message
console.log(chalk.blue("\n \tWelcome to Code With Sohail - ATM_Machine\n"));
async function main() {
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            type: "number",
            message: chalk.yellow("Enter your pin code:")
        }
    ]);
    // If-else statement
    if (pinAnswer.pin === myPin) {
        console.log(chalk.green("\nPin is Correct, login Successfully!\n"));
        let operationAnswer = await inquirer.prompt([
            {
                name: "operation",
                type: "list",
                message: "Select an operation",
                choices: [
                    "Withdraw Amount",
                    "Check Balance"
                ]
            }
        ]);
        if (operationAnswer.operation === "Withdraw Amount") {
            let withdrawMethodAnswer = await inquirer.prompt([
                {
                    name: "withdrawMethod",
                    type: "list",
                    message: "Select a withdrawal method:",
                    choices: [
                        "Fast Cash",
                        "Enter Amount"
                    ]
                }
            ]);
            if (withdrawMethodAnswer.withdrawMethod === "Fast Cash") {
                let fastCashAnswer = await inquirer.prompt([
                    {
                        name: "fastCashAmount",
                        type: "list",
                        message: "Select Amount:",
                        choices: [
                            "1000",
                            "2000",
                            "5000",
                            "10000",
                            "20000",
                            "50000"
                        ]
                    }
                ]);
                let amount = parseInt(fastCashAnswer.fastCashAmount);
                if (amount > myBalance) {
                    console.log("Insufficient Balance");
                }
                else {
                    myBalance -= amount;
                    console.log(`${amount} Amount Withdrawn Successfully.`);
                    console.log(`Your Remaining Balance is: ${myBalance}`);
                }
            }
            else if (withdrawMethodAnswer.withdrawMethod === "Enter Amount") {
                let amountAnswer = await inquirer.prompt([
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    }
                ]);
                if (amountAnswer.amount > myBalance) {
                    console.log(chalk.red("Insufficient Balance"));
                }
                else {
                    myBalance -= amountAnswer.amount;
                    console.log(`${amountAnswer.amount} Amount Withdrawn Successfully.`);
                    console.log(`Your Remaining Balance is: ${myBalance}`);
                }
            }
        }
        else if (operationAnswer.operation === "Check Balance") {
            console.log(`Current Account Balance is: ${myBalance}`);
        }
    }
    else {
        console.log(chalk.red("Pin is Incorrect, Try again!"));
    }
}
// Call the main function
main();
