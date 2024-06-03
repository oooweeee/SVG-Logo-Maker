const Circle = require('./Circle');
const Square = require('./Square'); 
const Triangle = require('./Triangle');
const { writeFile} = require('fs/promises');
const { join } = require ('path');
// MAKE THE CLASS SHAPES

class Shapes {

    constructor(color, shape, message, textcolor){
        this.color = color,
        this.shape = shape,
        this.message = message
        this.textColor = textColor
    }
    createSVG() {
        let sgvContent = '';

        let shapeEl;
        let shapeObj;
        switch (this.shape) {
            case 'circle':
                shapeObj = new Circle(this.color);
                shapeEl = 'circle';
                break;
                case 'square':
                    shapeObj = new Square(this.color);
                    shapeEl = 'rect';
                    break;
                    case 'triangle':
                        shapeObj = new Triangle(this.color);
                        shapeEl = 'polygon';
                        break;
                        default:
                            console.log('Invalid shape.');
                            return;
        }

        const shapeAttributes = shapeObj.getShapeAttributes();
        const style = `fill:${this.color}`;

        let textX, textY;
        if (this.shape === 'circle') {
            // for circles place the text at the center
            textX = 150;
            textY = 125;
        } else if (this.shape === 'triangle') {
            textX = 145;
            textY = 125;
        } else {
            // For squares and traingles place text slightly offset from the top left corner 
            textX = 150;
            textY = 125;
        }
        const textStyle = `font-family: Arial; font-size: 40px; fill: ${this.textColor}; text-anchor: middle`;
        const text = `<text x="${textX}" y="${textY}" style="${textStyle}">${this.message}</text>`;


        sgvContent += `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width = "300" height = "200" >`;
        sgvContent += `<${shapeEl} ${shapeAttributes} style="${style}" />`;
        sgvContent += text;
        sgvContent += `</svg>`;
        
        const fileName = `${this.shape}.svg`;
        const filePath = join(__dirname, '..', 'examples', fileName);
        return writeFile(filePath,sgvContent)
        .then(() => console.log(`Generated ${this.shape}.svg`))
        .catch(err => console.error(err));
    };
}
module.exports = Shapes;