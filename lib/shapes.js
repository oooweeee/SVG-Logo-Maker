Const Circle = require('./Circle');
const Square = require('./Square'); 
const Triangle = require('./Triangle');
// MAKE THE CLASS SHAPES

class CLI {

    constructor(color, shape, message){
        this.color = color,
        this.shape = shape,
        this.message = message
    }
    createSVG() {
        let sgvContent = '';

        let shapeAttributes = '';
        switch (this.shape) {
            case'circle':
            shapeAttributes = 'cx="50" cy="50" r="40"';
            break;
            case 'triangle':
                shapeAttributes = 'points ="50,10 90,90 10,90"';
                break;
                case 'square':
                    shapeAttributes = 'x="10" y="10" width="80" height="80"'
                    break;
                    default:
                        console.log('Invalid shape.');
                        return;
        }
        const style = `fill:${this.color}`;
        const text = `<text x="50" y="60" font-family="Arial" font-size="20" fill="white" text-anchor="middle">${this.message}</text>`;

        sgvContent += `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">`;
        sgvContent += `<${this.shape} ${shapeAttributes} style="${style}" />`;
        sgvContent += text;
        sgvContent += `</svg>`;

        fs.whriteFile(`${answers.shape}.svg`, sgvContent), (err) =>
            err ? console.log(err) : console.log('Success!')
        }

    }
module.exports = CLI