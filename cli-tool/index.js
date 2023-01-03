#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';
import figlet from 'figlet';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Who wants to be a millionaire? \n');

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY 🎮')}
        1. Answer the random question in 50 seconds
        If you were not able to give the correct answer in 50 seconds. You will be ${chalk.bgRed('Lost')}
        If you were able to give the answer in 50 seconds, you can earn 5000$ in 50 seconds 😈
    `);
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'Tell us your name?',
        default() {
            return 'Ex - Lahiru';
        },
    });

    playerName = answers.player_name;
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if(isCorrect) {
        spinner.success({text: `Nice work ${playerName}`});
    } else {
        spinner.error({text: `game over`})
        process.exit(1);
    }

}

function winner(){
    //console is cleaning here after final text view
    console.clear();
    const msg = `Congrates , ${playerName} ! \n $1, 000, 000`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    })
}


async function question1(){
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Javascript was created in 10 days then released on \n',
        choices: [
            'May 23rd, 1995',
            'Nov 24th, 1995',
            'Dec 4th, 1995',
            'Dec 17, 1996',
        ]
    });
    //return answers.question_1 == 'Dec 4th, 1995';
    return handleAnswer(answers.question_1 === 'Dec 4th, 1995');
}

//top level await
await welcome();
await askName();
await question1();
await winner();