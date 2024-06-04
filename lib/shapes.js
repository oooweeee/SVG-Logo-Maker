const Circle = require('./Circle');
const Square = require('./Square');
const Triangle = require('./Triangle');
const { writeFile } = require ('fs/promises');
const { join } = require('path');
//make class shapes
 
class Shapes {
    
constructor(shape, color, message, textColor){
        this.shape = shape,
        this.color = color,       
        this.message = message
        this.textColor = textColor
    }
    createSVG() {
        let svgContent = '';

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
            // For circles, place text at the center
            textX = 150;
            textY = 125;
        } else if (this.shape === 'triangle') {
            textX = 145;
            textY = 125;
        } else {
            // For squares and triangles, place text slightly offset from the top-left corner
            textX = 150;
            textY = 125;
        }
    const textStyle = `font-family: Arial; font-size: 40px; fill: ${this.textColor}; text-anchor: middle`;
    const text = `<text x="${textX}" y="${textY}" style="${textStyle}">${this.message}</text>`;


    svgContent += `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width = "300" height = "200" >`;
    svgContent += `<${shapeEl} ${shapeAttributes} style="${style}" />`;
    svgContent += text;
    svgContent += `</svg>`;
    
    const fileName = `${this.shape}.svg`;
    const filePath = join(__dirname, '..', 'examples', fileName);
    return writeFile(filePath, svgContent)
    .then(() => console.log(`Generated ${this.shape}.svg`))    
    .catch(err => console.error(err));
    };
  }

module.exports = Shapes;