const inquirer = require('inquirer')
const Shapes = require('./lib/shapes.js');
const shapeChoices = ["circle","triangle","square"];

class CLI{
    run() {
        return inquirer
        // THIS IS WHERE IM GOING TO LIST THE QUESTIONS THAT I WANT TO ASK THE USER
        .prompt([
            {
            //THIS IS WHERE IM GOING TO PROMPT THE USER AND ASK FOR THREE CHARACTERS TO ADD TO THE SVG THAT IS BEING CREATED 😊
            type:"input",
            message:"enter up to 3 characters of text for your image:",
            name:"message",
            validate: function (input) {
                if (input.length <= 3) {
                    return true;
                } else {
                    return 'please enter up to three characters';
                }
            }
            },
         {
            // this is where we are going to ask for  a color to be used for text
            type:"input",
            message: "Enter a color keyword for your text color:",
            name:"textColor"
         },   
         
        {
            //  asking for shape color 
            type:"input",
            message: "Enter a color keyword for your shape:",
            name: "color"
        },
    {
        // this is where we are going to ask what shape to use 
        type: "list",
        message:"please select the shape you would like to use",
        name:"shape",
        choices:shapeChoices
    }
        ])
        .then (answers => {
            const message = answers.message ? answers.message.slice(0, 3) : '';
            const shapes = new Shapes(answers.shape, answers.color, message, answers.textColor);
            return shapes.createSVG();
        })
        .then(() => {
            console.log("SGV file created successfully.");
        })
        .catch(err => {
            console.log("Error", err);
        });
        }
    }
    
    module.exports = CLI