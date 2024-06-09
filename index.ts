#! /usr/bin/env node
import inquirer from "inquirer";
let currentBalance = 20000;
let accountPin = 1234;
let accountPinNumber = await inquirer.prompt([
    {
        name: "AccountPin",
        type: "number",
        message: "Enter your pin"
    }
])
if (accountPinNumber.AccountPin === accountPin) {
    console.log("Login Successfully");
    let accountAnswer = await inquirer.prompt([
        {
            name: "Account",
            type: "list",
            choices: ["Withdraw", "Deposit", "Check Balance", "Exit"],
            message: "What would you like to do?"
        }
    ])
    if (accountAnswer.Account === "Withdraw") {
        let withdrawAnswer = await inquirer.prompt([
            {
                name: "Withdraw",
                type: "number",
                message: "How much would you like to withdraw?",
                validate: function (value) {
                    if (value > currentBalance) {
                        return "Insufficient Funds";
                    }
                    return true;
                }
            }
        ])
        currentBalance = currentBalance - withdrawAnswer.Withdraw
        console.log("Your new balance is: ", currentBalance);
    } else if (accountAnswer.Account === "Deposit") {
        let depositAnswer = await inquirer.prompt([
            {
                name: "Deposit",
                type: "number",
                message: "How much would you like to deposit?",
            }
        ])
        currentBalance = currentBalance + depositAnswer.Deposit
        console.log("Your new balance is: ", currentBalance);
    } else {
        if (accountAnswer.Account === "Check Balance") {
            console.log("Your current balance is: ", currentBalance);
        } else {
            if (accountAnswer.Account === "Exit") {
                console.log("Thank you for using our ATM");
            }
        }
    }
} 
