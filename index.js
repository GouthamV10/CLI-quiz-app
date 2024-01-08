#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

async function main() {
  await welcome();
  await askName();
  await askQuestions([
    {
      message: "Javascript is an _______ language?",
      choices: [
        "Object-Oriented",
        "Object-Based",
        "Procedural",
        "None of the above",
      ],
      correctAnswer: "Object-Oriented",
    },
    {
      message:
        "Which of the following keywords is used to define a variable in Javascript?",
      choices: ["var", "let", "const", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      message: "In JavaScript, what is a block of statement?",
      choices: [
        "Conditional block",
        "block that combines a number of statements into a single compound statement",
        "both conditional block and a single statement",
        "block that contains a single statement",
      ],
      correctAnswer:
        "block that combines a number of statements into a single compound statement",
    },
    {
      message: "In JavaScript the x===y statement implies that",
      choices: [
        "Both x and y are equal in value, type and reference address as well",
        "Both are x and y are equal in value only",
        "Both are equal in the value and data type",
        "Both are not same at all.",
      ],
      correctAnswer: "Both are equal in the value and data type",
    },
    // Add more questions here...
  ]);
  await wait();
  await winner();
}

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
main(); // Call the async function

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Welcome to the Quiz? Answer and Win 1M dollars\n"
  );
  await sleep();
  rainbowTitle.stop();
  console.log(`
  I am a process on your Computer.
  If you get any questions wrong I will be ${chalk.bgRed("killed")}
  So get all the questions right...
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your Name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

async function askQuestions(questions) {
  for (const question of questions) {
    const answers = await inquirer.prompt({
      name: "userAnswer",
      type: "list",
      message: question.message,
      choices: question.choices,
    });

    const isCorrect = answers.userAnswer === question.correctAnswer;
    await handleAnswer(isCorrect);
  }
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();
  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}` });
  } else {
    spinner.error({ text: ` 💀 💀 💀 Game over, you lose ${playerName}!!!` });
    process.exit(1);
  }
}

async function wait() {
  const rainbowTitle = chalkAnimation.rainbow("Calculating.....\n");
  await sleep();
  rainbowTitle.stop();
}

function winner() {
  console.clear();
  const msg = `Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}
