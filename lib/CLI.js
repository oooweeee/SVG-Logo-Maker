const inquirer = require("inquirer");
const fs = require("fs");
const shapes = require("./shapes.js");
const shapeChoices = ["circle", "triangle", "square"];

class CLI {
  run() {
    return (
      inquirer
        // THIS IS WHERE IM GOING TO LIST THE QUESTIONS THAT I WANT TO ASK THE USER
        .createPromptModule([
          {
            //THIS IS WHERE IM GOING TO PROMPT THE USER AND ASK FOR THREE CHARACTERS TO ADD TO THE SVG THAT IS BEING CREATED 😊
            type: "input",
            message: "enter up to 3 characters of text for your image:",
            name: "message",
            validate: function (input) {
              if (input.length <= 3) {
                return true;
              } else {
                return "please enter up to three characters";
              }
            },
          },
          {
            // this is where we are going to ask for  a color to be used
            type: "input",
            message: "Enter a color keyword:",
            name: "color",
          },
          {
            // this is where we are going to ask what shape to use
            type: list,
            message: "pleas select the shape you would like to use",
            name: "shape",
            choices: shapeChoices,
          },
        ])
        .then((answers) => {
          shapes.createSVG(
            answers.shape,
            answers.color,
            answers.message.slice(0, 3)
          );
        })
    );
    module.exports;
  }
}
